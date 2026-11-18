// 見えたら表示
const secs = document.querySelectorAll('.sec:not(.fv)');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  secs.forEach((s) => io.observe(s));
} else {
  secs.forEach((s) => s.classList.add('in'));
}

// 追従ボタン：FVを過ぎたら出し、最後のCTAが見えたら隠す
const float = document.querySelector('.float');
const fv = document.querySelector('.fv');
const last = document.querySelector('#contact');
function update() {
  const pastFv = fv.getBoundingClientRect().bottom < 0;
  const r = last.getBoundingClientRect();
  const vis = (el) => { const b = el.getBoundingClientRect(); return b.top < window.innerHeight && b.bottom > 0; };
  const atCta = (r.top < window.innerHeight * 0.6 && r.bottom > 0) || [...document.querySelectorAll('.midcta')].some(vis);
  float.classList.toggle('show', pastFv && !atCta);
}
window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();
