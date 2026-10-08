const themeToggle = document.querySelector('.theme-toggle');
const root = document.body;

themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = isDark ? '☼' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? '切换到深色主题' : '切换到浅色主题');
});

const views = [...document.querySelectorAll('.page-view')];
const links = [...document.querySelectorAll('.sidebar-link')];

const updatePage = () => {
  const requestedPage = window.location.hash.slice(1);
  const currentPage = views.some((view) => view.id === requestedPage) ? requestedPage : 'home';
  views.forEach((view) => view.classList.toggle('active-view', view.id === currentPage));
  links.forEach((link) => link.classList.toggle('nav-active', link.hash === `#${currentPage}`));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('hashchange', updatePage);
updatePage();