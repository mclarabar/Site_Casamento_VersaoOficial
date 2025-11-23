(function () {
  const btn = document.getElementById('hamburger-button');
  const menu = document.getElementById('main-menu');
  if (!btn || !menu) return;

  if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');

  // Toggle menu open/close
  function toggleMenu() {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  }

  btn.addEventListener('click', toggleMenu);

  // Support Enter/Space on button
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
