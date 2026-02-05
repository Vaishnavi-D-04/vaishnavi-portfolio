const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll("[data-section]");
const sections = document.querySelectorAll(".section");

// Hamburger
menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Section switching
function showSection(id, smooth = true) {
    if (!id) return;
    sections.forEach(section => section.classList.remove("active"));
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    targetEl.classList.add("active");
    if (smooth) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

links.forEach(link => {
    link.addEventListener("click", e => {
        const target = link.getAttribute("data-section") || link.getAttribute('href').replace('#','');
        if (!target) return;
        e.preventDefault();
        history.pushState(null, '', `#${target}`);
        showSection(target, true);
        navLinks.classList.remove("show");
    });
});

// Handle back/forward and direct-hash navigation
window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#', '') || 'home';
    showSection(id, false);
});

// On load, show section based on hash (or default to home)
document.addEventListener('DOMContentLoaded', () => {
    const initial = location.hash ? location.hash.replace('#', '') : 'home';
    showSection(initial, false);
});

// Initialize stat fills for skills (progress bars)
function initSkillStats() {
    const fills = document.querySelectorAll('.stat-fill');
    fills.forEach(fill => {
        const width = fill.style.width || '60%';
        // store percentage as a CSS var for animation
        fill.style.setProperty('--w', width);
        // allow a tick so CSS transition can animate
        requestAnimationFrame(() => {
            setTimeout(() => fill.setAttribute('data-init', 'true'), 120);
        });
    });
}

initSkillStats();

// Contact form: open mailto with form contents
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            alert('Please fill all fields before sending.');
            return;
        }
        const subject = encodeURIComponent(`Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
        const mailto = `mailto:vaishnavidharmapuri.2004@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
    });
}

// Project modal interactions
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalTitle = modal && modal.querySelector('.modal-title');
const modalDesc = modal && modal.querySelector('.modal-desc');
const modalImage = modal && modal.querySelector('.modal-image');
const modalTags = modal && modal.querySelector('.modal-tags');
const modalClose = modal && modal.querySelector('.modal-close');

function openProjectModal(card) {
    if (!modal) return;
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const tags = (card.dataset.tags || '').split(',').filter(Boolean);
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.style.background = 'linear-gradient(135deg,#60a5fa,#7c3aed)';
    modalTags.innerHTML = '';
    tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'skill-badge';
        span.textContent = t.trim();
        modalTags.appendChild(span);
    });
    modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
}

projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
});

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modal) {
    modal.addEventListener('click', e => {
        if (e.target.dataset.close === 'true' || e.target === modal) closeProjectModal();
    });
}

window.addEventListener('keyup', e => {
    if (e.key === 'Escape') closeProjectModal();
});
