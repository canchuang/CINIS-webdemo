/* Mutually exclusive background modes, persistent preference and live feedback. */
(() => {
  const hero = document.querySelector('.hero-v2x');
  if (!hero) return;
  const buttons = [...document.querySelectorAll('.bg-switch button')];
  const status = document.createElement('span');
  status.className = 'bg-status'; status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  document.querySelector('.bg-switch')?.appendChild(status);
  function set(value, announce = false) {
    if (!['aurora','grainient'].includes(value)) value = 'grainient';
    hero.dataset.bg = value;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.bgset === value)));
    status.textContent = (announce ? '已切换为' : '当前：') + (value === 'aurora' ? '光幕' : '流光');
    try { localStorage.setItem('portfolio-background-v2', value); } catch (_) {}
  }
  buttons.forEach(button => button.addEventListener('click', () => set(button.dataset.bgset, true)));
  let saved; try { saved = localStorage.getItem('portfolio-background-v2'); } catch (_) {}
  set(saved || hero.dataset.bg);
})();
