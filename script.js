document.getElementById('year').textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.project-card, .timeline > div');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 520, easing: 'ease-out', fill: 'forwards' });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));
