(function () {
  const btn = document.getElementById('hamburger-button');
  const menu = document.getElementById('main-menu');

  if (!btn || !menu) return;

  function toggleMenu() {
    const isOpen = btn.classList.contains('menu-open');

    btn.classList.toggle('menu-open');
    menu.classList.toggle('active');

    btn.setAttribute('aria-expanded', String(!isOpen));
  }

  btn.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      btn.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
