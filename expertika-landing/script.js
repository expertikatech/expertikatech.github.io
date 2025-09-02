document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for internal links
    const navLinks = document.querySelectorAll('.nav a, .hero-content a.btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const animatedElements = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Carousel controls on presentation page
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = Array.from(carousel.querySelectorAll('.carousel-item'));
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationFrameId = null;
        const viewport = document.querySelector('.carousel-viewport');
        const enableDrag = false; // disable drag to not interfere with fullscreen click

        function goTo(index) {
            if (index < 0) index = 0;
            if (index > items.length - 1) index = items.length - 1;
            currentIndex = index;
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
            prevTranslate = -currentIndex * viewport.clientWidth;
            currentTranslate = prevTranslate;
        }

        function next() { goTo(currentIndex + 1); }
        function prev() { goTo(currentIndex - 1); }

        prevBtn && prevBtn.addEventListener('click', prev);
        nextBtn && nextBtn.addEventListener('click', next);

        // Wheel navigation over carousel
        carousel.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) <= 5 && Math.abs(e.deltaX) <= 5) return;
            e.preventDefault();
            if (e.deltaY > 0 || e.deltaX > 0) next(); else prev();
        }, { passive: false });

        // Keyboard arrows
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
        });

        carousel.setAttribute('tabindex', '0');
        // Block saving via context menu and dragging on images inside carousel
        carousel.addEventListener('contextmenu', (e) => e.preventDefault());
        carousel.addEventListener('dragstart', (e) => e.preventDefault());
        goTo(0);

        // Drag/Swipe disabled to allow click-to-fullscreen without interference
        if (enableDrag) {
            function getEventX(e) { return e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX; }
            function setTranslateX(px) { const percent = (px / viewport.clientWidth) * 100; carousel.style.transform = `translateX(${percent}%)`; }
            function onDragStart(e) { isDragging = true; startX = getEventX(e); carousel.classList.add('is-dragging'); cancelAnimationFrame(animationFrameId); }
            function onDragMove(e) { if (!isDragging) return; const currentX = getEventX(e); const delta = currentX - startX; currentTranslate = prevTranslate + delta; setTranslateX(currentTranslate); }
            function onDragEnd() { if (!isDragging) return; isDragging = false; carousel.classList.remove('is-dragging'); const movedBy = currentTranslate - prevTranslate; const threshold = viewport.clientWidth * 0.2; if (movedBy < -threshold) { next(); } else if (movedBy > threshold) { prev(); } else { goTo(currentIndex); } }
            viewport.addEventListener('mousedown', onDragStart);
            viewport.addEventListener('mousemove', onDragMove);
            viewport.addEventListener('mouseup', onDragEnd);
            viewport.addEventListener('mouseleave', onDragEnd);
            viewport.addEventListener('touchstart', onDragStart, { passive: true });
            viewport.addEventListener('touchmove', onDragMove, { passive: true });
            viewport.addEventListener('touchend', onDragEnd);
        }

        // Lightbox fullscreen viewer
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        function openLightboxByIndex(index) {
            if (index < 0) index = 0;
            if (index > items.length - 1) index = items.length - 1;
            currentIndex = index;
            const imgEl = items[currentIndex].querySelector('.slide-image');
            if (!imgEl) return;
            lightboxImg.src = imgEl.getAttribute('src');
            lightboxImg.alt = imgEl.getAttribute('alt') || '';
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('is-open');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }

        carousel.addEventListener('click', (e) => {
            const img = e.target.closest && e.target.closest('.slide-image');
            if (!img) return;
            const index = items.findIndex(it => it.contains(img));
            openLightboxByIndex(index >= 0 ? index : currentIndex);
        });

        lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
        // Block saving via context menu while in lightbox
        lightbox && lightbox.addEventListener('contextmenu', (e) => {
            if (lightbox.classList.contains('is-open')) e.preventDefault();
        });
        lightboxPrev && lightboxPrev.addEventListener('click', () => openLightboxByIndex(currentIndex - 1));
        lightboxNext && lightboxNext.addEventListener('click', () => openLightboxByIndex(currentIndex + 1));
        lightbox && lightbox.addEventListener('click', (e) => {
            // click outside image closes
            if (e.target === lightbox) closeLightbox();
        });
        window.addEventListener('keydown', (e) => {
            if (!lightbox || !lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') openLightboxByIndex(currentIndex + 1);
            if (e.key === 'ArrowLeft') openLightboxByIndex(currentIndex - 1);
        });
    }

    // Full-page wheel navigation between main sections
    const sections = Array.from(document.querySelectorAll('main > section'));
    let isProgrammaticScroll = false;
    let scrollTimeoutId = null;

    function getCurrentSectionIndex() {
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(sectionTop - viewportMiddle);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        return closestIndex;
    }

    function getHeaderHeight() {
        const header = document.querySelector('.header');
        return header ? header.offsetHeight : 0;
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        const target = sections[index];
        const headerHeight = getHeaderHeight();
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        isProgrammaticScroll = true;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
        scrollTimeoutId = setTimeout(() => { isProgrammaticScroll = false; }, 900);
    }

    function onWheel(e) {
        // Ignore wheel events originating over the carousel area
        const overCarousel = e.target && (e.target.closest && (e.target.closest('.carousel') || e.target.closest('.carousel-viewport')));
        if (overCarousel) return;
        if (isProgrammaticScroll) { e.preventDefault(); return; }
        const delta = e.deltaY || e.wheelDelta || (-e.detail);
        if (Math.abs(delta) < 5) return; // ignore tiny deltas
        const current = getCurrentSectionIndex();
        const isFirst = current === 0;
        const isLast = current === sections.length - 1;
        // Allow native scroll beyond first/last section (e.g., to show footer)
        if ((delta < 0 && isFirst) || (delta > 0 && isLast)) {
            return;
        }
        e.preventDefault();
        if (delta > 0) {
            scrollToSection(current + 1);
        } else {
            scrollToSection(current - 1);
        }
    }

    // Attach wheel handler (non-passive to allow preventDefault)
    window.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard navigation for accessibility
    window.addEventListener('keydown', (e) => {
        if (isProgrammaticScroll) return;
        const keysNext = ['PageDown', 'ArrowDown', ' '];
        const keysPrev = ['PageUp', 'ArrowUp', 'Shift+ '];
        const key = e.key;
        if (keysNext.includes(key)) {
            e.preventDefault();
            scrollToSection(getCurrentSectionIndex() + 1);
        } else if (keysPrev.includes(key)) {
            e.preventDefault();
            scrollToSection(getCurrentSectionIndex() - 1);
        }
    });

});