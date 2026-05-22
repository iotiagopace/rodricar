
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('hide'), 450);
  });

  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');

  const onScroll = () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 24);
    document.querySelector('.wa-float')?.classList.toggle('compact', window.scrollY > 420);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => menu?.classList.toggle('open'));
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => menu?.classList.remove('open'));
  });

  const slides = [...document.querySelectorAll('.hero-slide')];
  const dotsWrap = document.querySelector('.hero-dots');
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para banner ${i + 1}`);
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap?.appendChild(dot);
  });

  const dots = [...document.querySelectorAll('.hero-dots button')];

  function paint() {
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function goTo(index, reset = false) {
    current = (index + slides.length) % slides.length;
    paint();
    if (reset) restart();
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6200);
  }

  document.querySelector('.hero-arrow.next')?.addEventListener('click', () => goTo(current + 1, true));
  document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => goTo(current - 1, true));

  paint();
  restart();

  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.menu a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
});
