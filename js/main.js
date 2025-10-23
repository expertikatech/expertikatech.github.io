// main.js
// Чистый JS: отвечает за взаимодействия при скролле:
// - параллакс фонового видео
// - подсветка / обновление динамической карточки при входе в разные блоки
// - плавный скролл для внутренних ссылок
// - небольшие анимации появления с использованием IntersectionObserver

document.addEventListener('DOMContentLoaded', () => {
  // Устанавливаем текущее год в футере
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Параллакс для фонового видео: немного увеличиваем scale при прокрутке
  const hero = document.getElementById('hero');
  const heroVideo = document.getElementById('heroVideo');

  function onScrollParallax() {
    if (!heroVideo) return;
    const rect = hero.getBoundingClientRect();
    // rect.top = 0 когда герой вверху экрана. Используем отрицательные значения.
    const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    // scale от 1 до 1.12
    const scale = 1 + progress * 0.12;
    heroVideo.style.transform = `scale(${scale})`;
  }

  window.addEventListener('scroll', onScrollParallax, { passive: true });
  onScrollParallax();

  // Плавный скролл для якорей
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // IntersectionObserver для "появления" секций
  const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('inview');
      } else {
        // можно удалять, но оставляем один раз показанным
        // en.target.classList.remove('inview');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section, .feature, .card').forEach(el => {
    appearObserver.observe(el);
  });

  // IntersectionObserver для динамической карточки:
  // Когда определённый "маркер" попадает в viewport, обновляем содержимое.
  const dynamicCard = {
    titleEl: document.getElementById('dyn-title'),
    textEl: document.getElementById('dyn-text'),
    iconEl: document.getElementById('dyn-icon')
  };

  // Определяем элементы, которые будут менять динамику — в нашем случае
  // это карточки .feature и некоторые секции с data-атрибутами.
  const dynTargets = document.querySelectorAll('[data-dyn-title], #product, #tech, #team, #demo');

  const dynObserver = new IntersectionObserver((entries) => {
    // выбираем наиболее видимый элемент (largest intersectionRatio)
    let best = null;
    entries.forEach(en => {
      if (en.isIntersecting) {
        if (!best || en.intersectionRatio > best.intersectionRatio) best = en;
      }
    });
    if (best) {
      const el = best.target;
      // если элемент имеет data-dyn-* — используем их, иначе берем секцию по id
      const newTitle = el.dataset.dynTitle || (el.id === 'product' ? 'Проблемы совещаний' :
                        el.id === 'tech' ? 'Инфраструктура и безопасность' :
                        el.id === 'team' ? 'Команда НОРД' :
                        el.id === 'demo' ? 'Мини-демонстрация' : null);
      const newText = el.dataset.dynText || (el.id === 'product' ? 'Утрата идей, решения без ответственности и финансовые потери.' :
                        el.id === 'tech' ? 'On-prem, Docker/K8s, локальные коннекторы, настройка шаблонов.' :
                        el.id === 'team' ? 'Инженеры в голосовых технологиях и безопасности.' :
                        el.id === 'demo' ? 'Краткий ролик: запись → транскрибация → отчёт.' : null);
      const newIcon = el.dataset.dynIcon || '🎯';

      // обновляем DOM (с плавностью)
      if (dynamicCard.titleEl && dynamicCard.textEl && dynamicCard.iconEl) {
        // простая анимация: уменьшить opacity -> поменять -> появиться
        dynamicCard.titleEl.style.opacity = 0;
        dynamicCard.textEl.style.opacity = 0;
        dynamicCard.iconEl.style.opacity = 0;
        setTimeout(() => {
          dynamicCard.titleEl.textContent = newTitle || dynamicCard.titleEl.textContent;
          dynamicCard.textEl.textContent = newText || dynamicCard.textEl.textContent;
          dynamicCard.iconEl.textContent = newIcon || dynamicCard.iconEl.textContent;
          dynamicCard.titleEl.style.opacity = 1;
          dynamicCard.textEl.style.opacity = 1;
          dynamicCard.iconEl.style.opacity = 1;
        }, 180);
      }
    }
  }, {
    threshold: [0.35, 0.6, 0.9] // срабатывает когда элемент становится заметен
  });

  dynTargets.forEach(t => dynObserver.observe(t));

  // Дополнительно: интерактивность feature — при наведении обновляем динамическую карточку
  document.querySelectorAll('.feature').forEach(f => {
    f.addEventListener('mouseenter', () => {
      const t = f.dataset.dynTitle;
      const txt = f.dataset.dynText;
      const ico = f.querySelector('.feature-ico') ? f.querySelector('.feature-ico').textContent : '✨';
      if (dynamicCard.titleEl) dynamicCard.titleEl.textContent = t;
      if (dynamicCard.textEl) dynamicCard.textEl.textContent = txt;
      if (dynamicCard.iconEl) dynamicCard.iconEl.textContent = ico;
    });
  });

  // Небольшая оптимизация: отключаем тяжелые обработчики при visibilitychange
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // можно сделать что-то при сворачивании (пока ничего)
    }
  });

});
