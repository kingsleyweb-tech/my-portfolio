/**
 * js/firebase-db.js
 * Initialises Firebase and exposes Firestore + Auth helpers.
 * Loaded via <script> AFTER js/config.js.
 *
 * Uses the Firebase v9 compat CDN build so no bundler is needed.
 *
 * Firestore document path:  portfolio/main
 * All portfolio data lives in that single document for simplicity.
 */

// ── Initialise (guard against double-init) ──────────────────────────────────
if (!firebase.apps.length) {
  firebase.initializeApp(window.CONFIG.firebase);
}

const _db   = firebase.firestore();
const _auth = firebase.auth();

// ── Auth helpers ─────────────────────────────────────────────────────────────

/**
 * Sign in anonymously (used by the admin panel after password verification).
 * @returns {Promise<firebase.auth.UserCredential>}
 */
async function authSignInAnonymous() {
  return _auth.signInAnonymously();
}

/** Current Firebase user (null if not signed in). */
function authCurrentUser() {
  return _auth.currentUser;
}

/** Sign out of Firebase. */
function authSignOut() {
  return _auth.signOut();
}

// ── Firestore helpers ─────────────────────────────────────────────────────────

/**
 * Clear all documents in a collection.
 */
async function _clearCollection(colRef) {
  const snap = await colRef.get();
  const batch = _db.batch();
  snap.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

/**
 * Save an array of items to a collection.
 */
async function _saveCollection(colRef, items, prefix) {
  const batch = _db.batch();
  items.forEach((item, idx) => {
    const docId = item.id ? `${prefix}_${item.id}` : `${prefix}_${idx}`;
    batch.set(colRef.doc(docId), item);
  });
  await batch.commit();
}

/**
 * Fetch all documents in a collection and return as array.
 */
async function _loadCollection(colRef) {
  const snap = await colRef.get();
  const arr = [];
  snap.forEach(doc => arr.push(doc.data()));
  // Sort by id or year if present to maintain order
  return arr;
}

/**
 * Load all portfolio segments from separate collections.
 * Returns null if database is empty (e.g. no profile document).
 * @returns {Promise<object|null>}
 */
async function dbLoad() {
  try {
    const pSnap  = await _db.collection("profile").doc("main").get();
    if (!pSnap.exists) return null; // No database seeded yet

    const profile   = pSnap.data();
    const skills    = (await _db.collection("skills").doc("main").get()).data() || {};
    const aiWork    = (await _db.collection("aiWorkflow").doc("main").get()).data() || {};
    
    const projects    = await _loadCollection(_db.collection("projects"));
    const experience  = await _loadCollection(_db.collection("experience"));
    const engProjects = await _loadCollection(_db.collection("engineeringProjects"));

    // Sort projects/experience/engineering to preserve original order
    projects.sort((a, b) => (a.id || 0) - (b.id || 0));
    experience.sort((a, b) => (a.id || 0) - (b.id || 0));
    engProjects.sort((a, b) => (a.id || 0) - (b.id || 0));

    return {
      profile,
      skills,
      projects,
      experience,
      engineeringProjects: engProjects,
      aiWorkflow: aiWork
    };
  } catch (err) {
    console.warn("[Firebase] Could not load portfolio data segments:", err.message);
    return null;
  }
}

/**
 * Save all portfolio segments to separate collections.
 * @param {object} data - Portfolio data object.
 * @returns {Promise<void>}
 */
async function dbSave(data) {
  const batch = _db.batch();

  // Save profile doc
  if (data.profile) {
    batch.set(_db.collection("profile").doc("main"), data.profile);
  }

  // Save skills doc
  if (data.skills) {
    batch.set(_db.collection("skills").doc("main"), data.skills);
  }

  // Save aiWorkflow doc
  if (data.aiWorkflow) {
    batch.set(_db.collection("aiWorkflow").doc("main"), data.aiWorkflow);
  }

  await batch.commit();

  // Save collections (Projects & Experience)
  if (data.projects) {
    const colProj = _db.collection("projects");
    await _clearCollection(colProj);
    await _saveCollection(colProj, data.projects, "proj");
  }

  if (data.experience) {
    const colExp = _db.collection("experience");
    await _clearCollection(colExp);
    await _saveCollection(colExp, data.experience, "exp");
  }

  if (data.engineeringProjects) {
    const colEng = _db.collection("engineeringProjects");
    await _clearCollection(colEng);
    await _saveCollection(colEng, data.engineeringProjects, "eng");
  }
}

/**
 * Seeds all collections with DEFAULT_PORTFOLIO_DATA if profile is empty.
 * @returns {Promise<boolean>} true if seeded.
 */
async function dbSeedIfEmpty() {
  const pSnap = await _db.collection("profile").doc("main").get();
  if (!pSnap.exists) {
    await dbSave(window.DEFAULT_PORTFOLIO_DATA);
    return true;
  }
  return false;
}

// Expose on window
window.FirebaseDB = { dbLoad, dbSave, dbSeedIfEmpty, authSignInAnonymous, authCurrentUser, authSignOut };
