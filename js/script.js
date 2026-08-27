/**
 * Kingsley Anaab Portfolio — Main Script v4
 * Data loading order:
 *   1. Firestore (live, authoritative)
 *   2. localStorage (admin saved locally — fallback)
 *   3. DEFAULT_PORTFOLIO_DATA from portfolio-data.js (hard-coded defaults)
 * Images: supplemented from localStorage proj_img_cache if Firebase is missing them.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Load Local / Cached Data Instantly (0ms delay) ───────────────────
  let localData = null;
  try {
    const ls = localStorage.getItem('portfolio_data');
    if (ls) localData = JSON.parse(ls);
  } catch (_) {}
  
  if (!localData) {
    localData = window.DEFAULT_PORTFOLIO_DATA;
  }

  // Supplement image URLs from local image cache
  try {
    const imgCache = JSON.parse(localStorage.getItem('proj_img_cache') || '{}');
    if (localData.projects && Object.keys(imgCache).length > 0) {
      localData.projects = localData.projects.map(p => ({
        ...p,
        image: p.image || imgCache[p.id] || ''
      }));
    }
  } catch (_) {}

  window.PORTFOLIO = localData;

  // Render local data instantly
  renderProfile(localData.profile);
  renderSkills(localData.skills);
  renderExperience(localData.experience);

  const initialEngProjects = localData.engineeringProjects && localData.engineeringProjects.length > 0
    ? localData.engineeringProjects
    : (window.DEFAULT_PORTFOLIO_DATA ? window.DEFAULT_PORTFOLIO_DATA.engineeringProjects : []);

  renderProjects(localData.projects, initialEngProjects);
  renderAIWorkflow(localData.aiWorkflow);

  // Initialize interactive features
  initTheme();
  initNav();
  initScrollEffects();
  initLightbox();
  initFilters();
  initModal();
  initContactForm(localData.profile);

  // ── 2. Query Firestore Asynchronously in the Background ────────────────
  if (window.FirebaseDB) {
    window.FirebaseDB.dbLoad().then(fbData => {
      if (fbData) {
        // Cache the latest copy for subsequent instant loads
        localStorage.setItem('portfolio_data', JSON.stringify(fbData));

        // Supplement fresh projects with local image cache
        try {
          const imgCache = JSON.parse(localStorage.getItem('proj_img_cache') || '{}');
          if (fbData.projects && Object.keys(imgCache).length > 0) {
            fbData.projects = fbData.projects.map(p => ({
              ...p,
              image: p.image || imgCache[p.id] || ''
            }));
          }
        } catch (_) {}

        window.PORTFOLIO = fbData;

        // Update DOM elements dynamically with fresh Firestore data
        renderProfile(fbData.profile);
        renderSkills(fbData.skills);
        renderExperience(fbData.experience);

        const freshEngProjects = fbData.engineeringProjects && fbData.engineeringProjects.length > 0
          ? fbData.engineeringProjects
          : (window.DEFAULT_PORTFOLIO_DATA ? window.DEFAULT_PORTFOLIO_DATA.engineeringProjects : []);

        renderProjects(fbData.projects, freshEngProjects);
        renderAIWorkflow(fbData.aiWorkflow);

        // Re-observe newly rendered elements for scroll animations
        initScrollEffects();
      }
    }).catch(e => {
      console.warn('[Portfolio] Firestore update deferred:', e.message);
    });
  }
});

/* ══════════════════════════════════════════════
   RENDERING FUNCTIONS
══════════════════════════════════════════════ */

function renderProfile(profile) {
  // Hero text elements
  document.getElementById('h-availability').textContent = profile.availabilityText || 'Open to opportunities';
  document.getElementById('h-location').textContent = profile.location || 'Ghana 🇬🇭';
  document.getElementById('h-name').innerHTML = (profile.name || 'Kingsley<br>Anaab').replace(' ', '<br>');
  document.getElementById('h-role').textContent = profile.role || 'IT Student & Web Developer.';
  document.getElementById('h-bio').textContent = profile.bio || '';
  const hCurrently = document.getElementById('h-currently');
  if (hCurrently) hCurrently.textContent = profile.currentlyBuilding || '';

  // Desktop name/role duplicates
  const hNameDesk = document.getElementById('h-name-desk');
  if (hNameDesk) hNameDesk.innerHTML = (profile.name || 'Kingsley<br>Anaab').replace(' ', '<br>');
  const hRoleDesk = document.getElementById('h-role-desk');
  if (hRoleDesk) hRoleDesk.textContent = profile.role || 'IT Student & Web Developer.';
  
  if (profile.photo) {
    const hPhoto = document.getElementById('h-photo');
    if (hPhoto) hPhoto.src = profile.photo;
    const hPhotoDesk = document.getElementById('h-photo-desk');
    if (hPhotoDesk) hPhotoDesk.src = profile.photo;
    const aPhoto = document.getElementById('a-photo');
    if (aPhoto) aPhoto.src = profile.photo;
  }

  // Hero Stats
  const statsContainer = document.getElementById('h-stats');
  if (statsContainer && profile.stats) {
    statsContainer.innerHTML = profile.stats.map(s => `
      <div class="hero-stat">
        <div class="stat-val">${s.value}</div>
        <div class="stat-lbl">${s.label}</div>
      </div>
    `).join('');
  }

  // Hero Tags
  const tagsContainer = document.getElementById('h-tags');
  if (tagsContainer && profile.tags) {
    tagsContainer.innerHTML = profile.tags.map(t => `
      <span class="hero-tag">${t}</span>
    `).join('');
  }

  // About Section
  document.getElementById('a-bio1').textContent = profile.bio || '';
  document.getElementById('a-bio2').textContent = profile.bio2 || '';

  // About interests
  const interestsContainer = document.getElementById('a-interests');
  if (interestsContainer && profile.interests) {
    interestsContainer.innerHTML = profile.interests.map(i => `
      <span class="interest-pill">${i}</span>
    `).join('');
  }

  // Contact details elements
  document.getElementById('c-email').textContent = profile.email || '';
  document.getElementById('c-email').href = `mailto:${profile.email}`;
  document.getElementById('c-phone').textContent = `${profile.phone} ${profile.phone2 ? '/ ' + profile.phone2 : ''}`;
  document.getElementById('c-phone').href = profile.whatsapp || `https://wa.me/${profile.phone}`;
  document.getElementById('gh-handle').textContent = profile.githubHandle || '@kingsleyweb-tech';
  document.getElementById('gh-link').href = profile.github || 'https://github.com';
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !skills.categories) return;

  container.innerHTML = skills.categories.map(cat => {
    const itemsHtml = cat.items.map(item => {
      // Find matching devicon prefix or font awesome class
      let iconHtml = '';
      if (item.icon) {
        if (item.icon.startsWith('fa-') || item.icon.startsWith('fab ') || item.icon.startsWith('fas ')) {
          iconHtml = `<i class="${item.icon} skill-icon-fa"></i>`;
        } else {
          // Devicon fallback
          iconHtml = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.icon}/${item.icon}-original.svg" onerror="this.outerHTML='<i class=\\'fas fa-code skill-icon-fa\\'></i>'" alt="${item.name}">`;
        }
      } else {
        iconHtml = `<i class="fas fa-code skill-icon-fa"></i>`;
      }

      const lvlClass = (item.level || '').toLowerCase();

      return `
        <div class="skill-item">
          <div class="skill-icon">
            ${iconHtml}
          </div>
          <span class="skill-item-name">${item.name}</span>
          <span class="skill-level-badge ${lvlClass}">${item.level || 'Learning'}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="skill-cat-card">
        <div class="skill-cat-header">
          <div class="skill-cat-icon"><i class="${cat.icon || 'fas fa-code'}"></i></div>
          <h3 class="skill-cat-name">${cat.name}</h3>
        </div>
        <div class="skill-items-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderExperience(experience) {
  const container = document.getElementById('exp-container');
  if (!container) return;

  // Set count badge
  const numBadge = document.querySelector('.exp-number');
  if (numBadge) {
    numBadge.textContent = String(experience.length).padStart(2, '0');
  }

  container.innerHTML = experience.map(exp => {
    const highlightsHtml = exp.highlights
      ? `<ul class="exp-highlights">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
      : '';

    return `
      <div class="exp-item ${exp.current ? 'current' : ''} reveal">
        <div class="exp-dot-wrap">
          <div class="exp-dot"><i class="${exp.type === 'Education' ? 'fas fa-graduation-cap' : 'fas fa-briefcase'}"></i></div>
        </div>
        <div class="exp-card">
          <div class="exp-card-top">
            <h3 class="exp-card-title">${exp.title}</h3>
            <span class="exp-period">${exp.period}</span>
          </div>
          <div class="exp-org">${exp.organization} · ${exp.location}</div>
          <span class="exp-type-badge">${exp.type}</span>
          <p class="exp-desc">${exp.description}</p>
          ${highlightsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderProjects(projects, engineeringProjects) {
  const featuredContainer = document.getElementById('featured-container');
  const gridContainer = document.getElementById('proj-grid');
  const engContainer = document.getElementById('eng-grid');

  // Featured Projects (Limit to 2)
  if (featuredContainer) {
    const featured = projects.filter(p => p.featured);
    featuredContainer.innerHTML = featured.map((p, idx) => {
      const order1 = idx % 2 === 0 ? '' : 'style="order: 2;"';
      const order2 = idx % 2 === 0 ? '' : 'style="order: 1;"';

      const fitClass = p.imageFit ? `img-fit-${p.imageFit}` : 'img-fit-cover';
      const techHtml = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
      const imgHtml = p.image
        ? `<img src="${p.image}" alt="${p.title}" class="${fitClass}" loading="lazy">`
        : `<div class="feat-placeholder"><i class="${p.icon || 'fas fa-laptop-code'}"></i></div>`;

      const demoBtn = p.liveUrl
        ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
        : '';
      const githubBtn = p.githubUrl
        ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm"><i class="fab fa-github"></i> GitHub</a>`
        : '';

      return `
        <div class="featured-proj reveal" data-filter-cat="${p.category}" data-id="${p.id}" tabindex="0" role="button" aria-label="View details of ${p.title}">
          <div class="featured-proj-img" ${order1}>
            ${imgHtml}
            <span class="feat-badge">Featured</span>
          </div>
          <div class="featured-proj-body" ${order2}>
            <div class="featured-proj-cat">${p.categoryLabel || 'Web Application'}</div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="proj-tech-row">${techHtml}</div>
            <div class="proj-actions">
              ${demoBtn}
              ${githubBtn}
              <button class="btn btn-ghost btn-sm modal-trigger" data-id="${p.id}"><i class="fas fa-info-circle"></i> Details</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Non-featured projects
  if (gridContainer) {
    const nonFeatured = projects.filter(p => !p.featured);
    gridContainer.innerHTML = nonFeatured.map(p => {
      const fitClass = p.imageFit ? `img-fit-${p.imageFit}` : 'img-fit-cover';
      const techHtml = p.tech.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('');
      const imgHtml = p.image
        ? `<img src="${p.image}" alt="${p.title}" class="${fitClass}" loading="lazy">`
        : `<div class="proj-card-placeholder"><i class="${p.icon || 'fas fa-code'}"></i></div>`;

      return `
        <div class="proj-card reveal" data-filter-cat="${p.category}" data-id="${p.id}" tabindex="0" role="button" aria-label="View details of ${p.title}">
          <div class="proj-card-img">
            ${imgHtml}
          </div>
          <div class="proj-card-body">
            <div class="proj-card-cat">${p.categoryLabel || 'Web Project'}</div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="proj-card-foot">
              <div class="proj-tech-row" style="margin-bottom:0;">${techHtml}</div>
              <div class="proj-arrow"><i class="fas fa-arrow-right"></i></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Engineering Projects
  if (engContainer && engineeringProjects) {
    engContainer.innerHTML = engineeringProjects.map(p => {
      const conceptsHtml = p.concepts ? p.concepts.map(c => `<span class="eng-concept">${c}</span>`).join('') : '';
      return `
        <div class="eng-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="View details of ${p.title}">
          <div class="eng-icon"><i class="${p.icon || 'fas fa-cogs'}"></i></div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="eng-concepts">${conceptsHtml}</div>
          <div class="proj-actions">
            <button class="btn btn-ghost btn-xs modal-trigger" data-id="${p.id}"><i class="fas fa-info-circle"></i> Details</button>
          </div>
        </div>
      `;
    }).join('');
  }
}

function renderAIWorkflow(ai) {
  // Intro text
  const introEl = document.getElementById('ai-intro');
  if (introEl) introEl.textContent = ai.intro || '';

  // Disclaimer text
  const disclaimerEl = document.getElementById('ai-disclaimer');
  if (disclaimerEl) disclaimerEl.textContent = ai.disclaimer || '';

  // Use cases list
  const useCasesContainer = document.getElementById('ai-use-cases');
  if (useCasesContainer && ai.useCases) {
    useCasesContainer.innerHTML = ai.useCases.map(uc => `
      <div class="ai-use-case">${uc}</div>
    `).join('');
  }

  // Tools list
  const toolsContainer = document.getElementById('ai-tools-grid');
  if (toolsContainer && ai.tools) {
    toolsContainer.innerHTML = ai.tools.map(tool => {
      const isFave = tool.name === 'Antigravity IDE' ? '<span class="ai-tool-fave">Favourite</span>' : '';
      return `
        <div class="ai-tool-card">
          <div class="ai-tool-icon"><i class="${tool.icon || 'fas fa-robot'}"></i></div>
          <div>
            <h4 class="ai-tool-name">${tool.name} ${isFave}</h4>
            <p class="ai-tool-desc">${tool.description}</p>
          </div>
        </div>
      `;
    }).join('');
  }
}


/* ══════════════════════════════════════════════
   INTERACTIONS & LOGIC
══════════════════════════════════════════════ */

// Theme Toggle
function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');

  const getTheme = () => localStorage.getItem('theme') || 'dark';
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  };

  // Set default theme
  setTheme(getTheme());

  themeBtn.addEventListener('click', () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

// Nav active styling, sticky navbar & mobile nav drawer
function initNav() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navPills = document.getElementById('navPills');
  const navLinks = navPills.querySelectorAll('a');

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navPills.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navPills.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // IntersectionObserver for active link states
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

// Scroll Reveals & Scroll to Top button
function initScrollEffects() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Reveal elements on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // Scroll to Top visibility
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Image Lightbox
function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCaption');
  const closeBtn    = document.getElementById('lightboxClose');

  const openLightbox = (src, caption) => {
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCap.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  };

  // Click on project card images to open lightbox
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.proj-card-img img, .featured-proj-img img');
    if (!img) return;
    e.stopPropagation(); // don't open card modal
    const card = img.closest('[data-id]');
    const caption = card ? (card.querySelector('h3')?.textContent || '') : '';
    openLightbox(img.src, caption);
  });

  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

// Project Categories Filtering
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;
  const projGridCards = document.querySelectorAll('#proj-grid .proj-card');
  const featuredProjs = document.querySelectorAll('#featured-container .featured-proj');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter featured
      featuredProjs.forEach(el => {
        const cat = el.dataset.filterCat;
        const show = filter === 'all' || cat === filter;
        el.classList.toggle('hidden', !show);
      });

      // Filter grid
      projGridCards.forEach(el => {
        const cat = el.dataset.filterCat;
        const show = filter === 'all' || cat === filter;
        el.classList.toggle('hidden', !show);
      });
    });
  });
}

// Modals Setup
function initModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  let prevActiveElement = null;

  const triggerClose = () => {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (prevActiveElement) prevActiveElement.focus();
  };

  // Bind avatar modal trigger
  const avatarTrigger = document.getElementById('heroAvatar');
  if (avatarTrigger) {
    avatarTrigger.addEventListener('click', () => {
      const profile = window.PORTFOLIO.profile;
      prevActiveElement = document.activeElement;
      modalContent.innerHTML = `
        <img src="${profile.photo || 'kesh.jpg'}" alt="${profile.name}" style="width:100%; max-height:75vh; object-fit:contain; border-radius:var(--radius-xl) var(--radius-xl) 0 0; display:block; background:#000;">
        <div class="modal-body" style="text-align:center;">
          <h2>${profile.name}</h2>
          <p style="margin-bottom:20px;">${profile.role}</p>
          <button class="btn btn-ghost" id="modalCloseAction"><i class="fas fa-times"></i> Close</button>
        </div>
      `;
      modalOverlay.classList.add('open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => modalClose.focus(), 50);
      const innerCloseBtn = document.getElementById('modalCloseAction');
      if (innerCloseBtn) innerCloseBtn.addEventListener('click', triggerClose);
    });

    avatarTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        avatarTrigger.click();
      }
    });
  }

  // Bind desktop avatar (big photo on right) to the same modal
  const avatarDesk = document.getElementById('heroAvatarDesk');
  if (avatarDesk) {
    const openAvatarModal = () => {
      const profile = window.PORTFOLIO.profile;
      prevActiveElement = document.activeElement;
      modalContent.innerHTML = `
        <img src="${profile.photo || 'kesh.jpg'}" alt="${profile.name}" style="width:100%; max-height:75vh; object-fit:contain; border-radius:var(--radius-xl) var(--radius-xl) 0 0; display:block; background:#000;">
        <div class="modal-body" style="text-align:center;">
          <h2>${profile.name}</h2>
          <p style="margin-bottom:20px;">${profile.role}</p>
          <button class="btn btn-ghost" id="modalCloseAction"><i class="fas fa-times"></i> Close</button>
        </div>
      `;
      modalOverlay.classList.add('open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => modalClose.focus(), 50);
      const innerCloseBtn = document.getElementById('modalCloseAction');
      if (innerCloseBtn) innerCloseBtn.addEventListener('click', triggerClose);
    };
    avatarDesk.addEventListener('click', openAvatarModal);
    avatarDesk.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAvatarModal(); }
    });
  }

  // Open modal handler
  const triggerOpen = (projId) => {
    const allProjs = [...window.PORTFOLIO.projects, ...window.PORTFOLIO.engineeringProjects];
    const project = allProjs.find(p => String(p.id) === String(projId));
    if (!project) return;

    prevActiveElement = document.activeElement;

    // Build markup
    const techHtml = project.tech ? project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('') : '';
    const highlightsHtml = project.highlights ? `
      <div class="modal-features">
        <h4>Key Features & Highlights</h4>
        <ul>${project.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>
    ` : '';

    const fitClass = project.imageFit ? `img-fit-${project.imageFit}` : 'img-fit-cover';
    const imgHtml = project.image 
      ? `<img src="${project.image}" alt="${project.title}" class="modal-real-img ${fitClass}">`
      : `<div class="modal-placeholder-img"><i class="${project.icon || 'fas fa-code'}"></i></div>`;

    const demoBtn = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : '';
    const githubBtn = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fab fa-github"></i> GitHub</a>`
      : '';

    modalContent.innerHTML = `
      ${imgHtml}
      <div class="modal-body">
        <div class="modal-cat">${project.categoryLabel || 'Engineering Project'}</div>
        <h2 id="modalTitle">${project.title}</h2>
        <p>${project.description}</p>
        <div class="modal-tech-row">${techHtml}</div>
        ${highlightsHtml}
        <div class="modal-actions">
          ${demoBtn}
          ${githubBtn}
          <button class="btn btn-ghost" id="modalCloseAction"><i class="fas fa-times"></i> Close</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus on close button inside modal
    setTimeout(() => modalClose.focus(), 50);

    // Set listener on inner close button
    const innerCloseBtn = document.getElementById('modalCloseAction');
    if (innerCloseBtn) {
      innerCloseBtn.addEventListener('click', triggerClose);
    }
  };

  // Listen for details click
  document.addEventListener('click', (e) => {
    // Check if modal trigger or click on project/engineering card
    const trigger = e.target.closest('.modal-trigger');
    const card = e.target.closest('.proj-card, .featured-proj, .eng-card');
    
    if (trigger) {
      e.stopPropagation();
      triggerOpen(trigger.dataset.id);
    } else if (card && !e.target.closest('a, button')) {
      triggerOpen(card.dataset.id);
    }
  });

  // Also support Keyboard Enter/Space on cards
  document.addEventListener('keydown', (e) => {
    const card = e.target.closest('.proj-card, .featured-proj, .eng-card');
    if (card && (e.key === 'Enter' || e.key === ' ') && !e.target.closest('a, button')) {
      e.preventDefault();
      triggerOpen(card.dataset.id);
    }
  });

  modalClose.addEventListener('click', triggerClose);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) triggerClose();
  });

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      triggerClose();
    }
  });

  // Focus Trapping inside modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// Contact Form WhatsApp Submission
function initContactForm(profile) {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !subject || !message) {
      showMsg('Please fill in all required fields (*).', 'error');
      return;
    }

    // Compose text message
    let text = `Hello Kingsley,\n\n`;
    text += `Name: ${name}\n`;
    if (email) text += `Email: ${email}\n`;
    text += `Subject: ${subject}\n\n`;
    text += `Message:\n${message}`;

    // Target phone number from profile data
    const phoneNumber = profile.phone || '233501901401';
    // Clean phone number (remove leading zeroes, spaces)
    let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '233' + cleanPhone.substring(1);
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    showMsg('✓ Message created! Opening WhatsApp... click send to deliver.', 'success');
    form.reset();
  });

  function showMsg(txt, type) {
    if (!msg) return;
    msg.textContent = txt;
    msg.className = `form-msg ${type}`;
    setTimeout(() => {
      msg.style.display = 'none';
      msg.className = 'form-msg';
    }, 6000);
  }
}