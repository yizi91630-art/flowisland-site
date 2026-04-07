const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .btn[href^="#"], .site-footer a[href^="#"]');

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const closeMobileMenu = () => {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

navAnchors.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    const header = document.querySelector(".site-header");
    const headerOffset = header ? header.offsetHeight : 74;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    closeMobileMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!navLinks || !menuToggle || window.innerWidth > 760) return;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!navLinks.contains(target) && !menuToggle.contains(target)) {
    closeMobileMenu();
  }
});
