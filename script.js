/* Akaeid Hasan — dependency-free portfolio interactions */
(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme');
  const menuButton = document.querySelector('.menu');
  const mobileNav = document.getElementById('mobile-nav');
  const filterButtons = [...document.querySelectorAll('.filter[data-filter]')];
  const projectCards = [...document.querySelectorAll('.project[data-category]')];
  const count = document.getElementById('count');
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  let savedTheme;
  try { savedTheme = localStorage.getItem('akaeid-portfolio-theme'); } catch (_) {}
  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.textContent = theme === 'dark' ? '☼' : '☾';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#0c1413' : '#f4f7f3';
  }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('akaeid-portfolio-theme', next); } catch (_) {}
  });

  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '☰';
  }
  menuButton?.addEventListener('click', () => {
    if (mobileNav.hidden) {
      mobileNav.hidden = false;
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      menuButton.textContent = '×';
    } else closeMenu();
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!document.querySelector('.header').contains(e.target) && !mobileNav.hidden) closeMenu();
  });
  window.matchMedia('(min-width: 821px)').addEventListener?.('change', e => { if (e.matches) closeMenu(); });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let visible = 0;
      filterButtons.forEach(b => {
        const active = b === button;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = String(visible).padStart(2, '0');
    });
  });
})();