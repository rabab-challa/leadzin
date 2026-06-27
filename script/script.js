
  // Scroll progress bar
  // Prevent auto-scroll to hash on page load
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname);
}
window.addEventListener('load', () => {
  document.documentElement.setAttribute('data-scrolled', 'true');
});
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
  });

  // Intersection observer for fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // Counter animation
  function animateCounter(el, target) {
    const suffix = target >= 1000 ? 'K+' : '+';
    const displayTarget = target >= 1000 ? target / 1000 : target;
    let start = 0;
    const step = displayTarget / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= displayTarget) {
        el.textContent = displayTarget + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 30);
  }
  function copyCoupon(el, code) {
  navigator.clipboard.writeText(code).catch(() => {});
  el.classList.add('copied');
  el.querySelector('.copy-hint').textContent = '✓ Copied!';
  setTimeout(() => {
    el.classList.remove('copied');
    el.querySelector('.copy-hint').textContent = 'Tap to Copy 📋';
  }, 2500);
}
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, +entry.target.dataset.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));
