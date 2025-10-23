// main.js
// Скролл-презентация на чистом JS.
// Основная идея:
// - На каждом кадре берём видимый прогресс секции (0..1)
// - Для элементов с классами anim-* применяем стили, зависящие от прогресса:
//    * scale заголовков
//    * translateX/translateY и opacity для slide/slide-left/right/fade
// - IntersectionObserver используем как дополнительный триггер для включения inview, но основная логика — прогресс

(function(){
  // Утилиты
  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

  // Сбор всех секций, которые анализируем
  const sections = Array.from(document.querySelectorAll('.section'));

  // Список элементов-аниматоров внутри секций
  function collectAnimElems(section){
    return Array.from(section.querySelectorAll('.anim-scale, .anim-fade, .anim-slide-up, .anim-slide-left, .anim-slide-right'));
  }

  // Map: section -> anim elems
  const sectionData = sections.map(sec => ({
    el: sec,
    elems: collectAnimElems(sec)
  }));

  // Для отключения heavy calc при неактивности вкладки
  let ticking = false;

  function update(){
    ticking = false;
    const viewportH = window.innerHeight;
    const viewportCenter = viewportH / 2;

    sectionData.forEach(sdata => {
      const rect = sdata.el.getBoundingClientRect();
      const secTop = rect.top;
      const secH = rect.height || 1;

      // Вычисляем "прогресс": как далеко центр viewport прошёл через секцию.
      // p = 0 когда секция только появляется, p = 1 когда секция прошла и центр уже ниже её bottom.
      let p = (viewportCenter - secTop) / (secH * 0.5); // can be negative/ >1
      p = clamp(p, 0, 1);

      // Для устойчивости можно применять сглаживание (lerp) — но пока прямое применение.
      // В зависимости от этого прогресса обновляем дочерние элементы
      sdata.elems.forEach(el => applyProgressToElement(el, p));
    });
  }

  // Apply progress to element according to its classes
  function applyProgressToElement(el, p){
    // base sizes for scaling: read dataset 'data-base-size' optionally
    const baseSize = parseFloat(el.dataset.baseSize) || null;

    // anim-scale: масштаб зависит от p (при p=0 small, при p=1 big)
    if (el.classList.contains('anim-scale')){
      // scale from 0.85 -> 1.02 around p
      const min = 0.86, max = 1.02;
      const s = min + (max - min) * p;
      el.style.transform = `scale(${s})`;
      // optionally change font size by scaling text: if baseSize set, adjust font-size
      if (baseSize){
        el.style.fontSize = (baseSize * s) + 'px';
      }
      el.style.opacity = 0.95 + 0.05 * p;
    }

    // anim-fade: opacity 0->1, translateY 18->0
    if (el.classList.contains('anim-fade')){
      const ty = 18 - 18 * p;
      el.style.transform = `translateY(${ty}px)`;
      el.style.opacity = `${p}`;
    }

    // anim-slide-up
    if (el.classList.contains('anim-slide-up')){
      const ty = 28 - 28 * p; // 28px -> 0
      el.style.transform = `translateY(${ty}px)`;
      el.style.opacity = `${p}`;
      // slight scale for dramatic effect
      const sc = 0.98 + 0.02 * p;
      el.style.transform += ` scale(${sc})`;
    }

    // anim-slide-left
    if (el.classList.contains('anim-slide-left')){
      const tx = -80 + 80 * p; // -80px -> 0
      el.style.transform = `translateX(${tx}px)`;
      el.style.opacity = `${p}`;
    }

    // anim-slide-right
    if (el.classList.contains('anim-slide-right')){
      const tx = 80 - 80 * p;
      el.style.transform = `translateX(${tx}px)`;
      el.style.opacity = `${p}`;
    }

    // Special case: feature-blocks — introduce stagger based on data-order
    if (el.classList.contains('feature-block')){
      const order = parseInt(el.dataset.order || 0);
      // tie p to order: start showing when p > 0.12 + order*0.08
      const start = 0.12 + order * 0.06;
      const localP = clamp((p - start) / (0.6 - start), 0, 1);
      el.style.opacity = `${localP}`;
      const ty = 24 - 24 * localP;
      el.style.transform = `translateY(${ty}px)`;
      const scale = 0.98 + 0.02 * localP;
      el.style.transform += ` scale(${scale})`;
    }
  }

  // Hook scroll + resize
  function onScroll(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);

  // Initial update
  onScroll();

  // Bonus: IntersectionObserver fallback to add 'inview' for elements when they cross threshold (nice for non-js/slow)
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('inview');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.anim-fade, .anim-slide-up, .anim-slide-left, .anim-slide-right').forEach(el => io.observe(el));

  // set current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

})();
