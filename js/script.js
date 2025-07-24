// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций
    initAnimations();
    
    // Плавная прокрутка для якорных ссылок
    initSmoothScroll();
    
    // Оптимизация изображений
    initLazyLoading();
});

// Анимации при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.about, .portfolio, .booking, .contact-section');
    animatedElements.forEach(el => observer.observe(el));
}


// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Простая ленивая загрузка изображений
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Функция для отслеживания кликов по кнопке записи (аналитика)
function trackBookingClick() {
    // Здесь можно добавить код для аналитики (Google Analytics, Яндекс.Метрика)
    console.log('Клик по кнопке записи');
    
    // Пример для Google Analytics (если подключен)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'booking',
            'event_label': 'telegram_bot'
        });
    }
    
    // Пример для Яндекс.Метрики (если подключена)
    if (typeof ym !== 'undefined') {
        ym(123456789, 'reachGoal', 'booking_click');
    }
}

// Добавляем обработчик на кнопку записи
document.addEventListener('DOMContentLoaded', function() {
    const bookingBtn = document.querySelector('.btn-booking');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', trackBookingClick);
    }
});

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Заменяем на placeholder при ошибке загрузки
            this.src = 'images/placeholder.jpg';
            this.alt = 'Изображение недоступно';
        });
    });
});

// Функция для копирования номера телефона
function copyPhone() {
    const phone = '+79181969212';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phone).then(() => {
            showNotification('Номер телефона скопирован!', 'success');
        });
    } else {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = phone;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Номер телефона скопирован!', 'success');
    }
}

// Добавляем возможность копирования номера телефона по клику
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            copyPhone();
        });
    });
});

// Простая валидация и оптимизация производительности
window.addEventListener('load', function() {
    // Проверяем, что все критичные элементы загружены
    const criticalElements = [
        '.header',
        '.hero',
        '.barber-intro',
        '.about',
        '.portfolio',
        '.booking'
    ];
    
    let allLoaded = true;
    criticalElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Критичный элемент не найден: ${selector}`);
            allLoaded = false;
        }
    });
    
    if (allLoaded) {
        console.log('Все критичные элементы загружены успешно');
    }
    
    // Добавляем класс для CSS анимаций после полной загрузки
    document.body.classList.add('loaded');
    
    // Инициализация слайдеров
    initSliders();
});

// Глобальные переменные для слайдеров
let sliders = {};

// Инициализация всех слайдеров
function initSliders() {
    // Инициализация слайдера Ивана
    initSlider('ivan-slider', {
        autoplay: false,
        autoplayDelay: 4000,
        showDots: true,
        showCounter: false
    });
    
    // Инициализация слайдера портфолио
    initSlider('works-slider', {
        autoplay: false,
        showDots: false,
        showCounter: true
    });
    
    // Инициализация слайдера места
    initSlider('place-slider', {
        autoplay: false,
        autoplayDelay: 5000,
        showDots: false,
        showCounter: true
    });
}

// Инициализация отдельного слайдера
function initSlider(sliderId, options = {}) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const counter = slider.querySelector('.slider-counter');
    const sliderTrack = slider.querySelector('.slider-track');
    
    sliders[sliderId] = {
        currentSlide: 0,
        totalSlides: slides.length,
        slides: slides,
        dots: dots,
        counter: counter,
        autoplayInterval: null,
        options: options
    };
    
    // Устанавливаем начальную позицию слайдера
    if (sliderTrack) {
        sliderTrack.style.transform = 'translateX(0%)';
    }
    
    // Устанавливаем активную точку
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Обновляем счетчик
    updateSliderCounter(sliderId);
    
    // Запускаем автопроигрывание если включено
    if (options.autoplay) {
        startAutoplay(sliderId);
    }
    
    // Добавляем поддержку свайпов на мобильных устройствах
    addTouchSupport(sliderId);
}

// Функция смены слайда
function changeSlide(sliderId, direction) {
    const slider = sliders[sliderId];
    if (!slider) return;
    
    // Останавливаем автопроигрывание при ручном переключении
    if (slider.autoplayInterval) {
        clearInterval(slider.autoplayInterval);
        // Перезапускаем через 2 секунды
        setTimeout(() => {
            if (slider.options.autoplay) {
                startAutoplay(sliderId);
            }
        }, 2000);
    }
    
    // Убираем активный класс с текущего слайда
    if (slider.dots.length > 0) {
        slider.dots[slider.currentSlide].classList.remove('active');
    }
    
    // Вычисляем новый индекс
    slider.currentSlide += direction;
    
    if (slider.currentSlide >= slider.totalSlides) {
        slider.currentSlide = 0;
    } else if (slider.currentSlide < 0) {
        slider.currentSlide = slider.totalSlides - 1;
    }
    
    // Перемещаем слайдер
    const sliderTrack = document.querySelector(`#${sliderId} .slider-track`);
    if (sliderTrack) {
        const translateX = -slider.currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    // Добавляем активный класс к новому слайду
    if (slider.dots.length > 0) {
        slider.dots[slider.currentSlide].classList.add('active');
    }
    
    // Обновляем счетчик
    updateSliderCounter(sliderId);
}

// Функция перехода к конкретному слайду
function currentSlide(sliderId, slideIndex) {
    const slider = sliders[sliderId];
    if (!slider) return;
    
    const targetIndex = slideIndex - 1; // Преобразуем в 0-based индекс
    
    if (targetIndex === slider.currentSlide) return;
    
    // Останавливаем автопроигрывание
    if (slider.autoplayInterval) {
        clearInterval(slider.autoplayInterval);
        setTimeout(() => {
            if (slider.options.autoplay) {
                startAutoplay(sliderId);
            }
        }, 2000);
    }
    
    // Убираем активный класс с текущего слайда
    if (slider.dots.length > 0) {
        slider.dots[slider.currentSlide].classList.remove('active');
    }
    
    // Устанавливаем новый слайд
    slider.currentSlide = targetIndex;
    
    // Перемещаем слайдер
    const sliderTrack = document.querySelector(`#${sliderId} .slider-track`);
    if (sliderTrack) {
        const translateX = -slider.currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    // Добавляем активный класс к новому слайду
    if (slider.dots.length > 0) {
        slider.dots[slider.currentSlide].classList.add('active');
    }
    
    // Обновляем счетчик
    updateSliderCounter(sliderId);
}

// Обновление счетчика слайдов
function updateSliderCounter(sliderId) {
    const slider = sliders[sliderId];
    if (!slider || !slider.counter) return;
    
    const currentSlideSpan = slider.counter.querySelector('.current-slide');
    if (currentSlideSpan) {
        currentSlideSpan.textContent = slider.currentSlide + 1;
    }
}

// Запуск автопроигрывания
function startAutoplay(sliderId) {
    const slider = sliders[sliderId];
    if (!slider || !slider.options.autoplay) return;
    
    slider.autoplayInterval = setInterval(() => {
        changeSlide(sliderId, 1);
    }, slider.options.autoplayDelay || 3000);
}

// Остановка автопроигрывания при наведении мыши
document.addEventListener('DOMContentLoaded', function() {
    const sliderElements = document.querySelectorAll('#ivan-slider, #works-slider, #place-slider');
    
    sliderElements.forEach(slider => {
        slider.addEventListener('mouseenter', function() {
            const sliderId = this.id;
            const sliderData = sliders[sliderId];
            if (sliderData && sliderData.autoplayInterval) {
                clearInterval(sliderData.autoplayInterval);
            }
        });
        
        slider.addEventListener('mouseleave', function() {
            const sliderId = this.id;
            const sliderData = sliders[sliderId];
            if (sliderData && sliderData.options.autoplay) {
                startAutoplay(sliderId);
            }
        });
    });
});

// Поддержка свайпов на мобильных устройствах
function addTouchSupport(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isScrolling = false;
    
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });
    
    slider.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // Определяем направление скролла
        if (diffY > diffX) {
            isScrolling = true;
        } else if (diffX > 10) {
            // Предотвращаем вертикальный скролл при горизонтальном свайпе
            e.preventDefault();
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe(sliderId);
    }, { passive: true });
    
    function handleSwipe(sliderId) {
        const threshold = 50; // Минимальное расстояние для свайпа
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Проверяем, что это горизонтальный свайп
        if (Math.abs(diffX) > threshold && diffY < 100) {
            if (diffX > 0) {
                // Свайп влево - следующий слайд
                changeSlide(sliderId, 1);
            } else {
                // Свайп вправо - предыдущий слайд
                changeSlide(sliderId, -1);
            }
        }
        
        // Сбрасываем значения
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;
    }
}

// Управление слайдерами с клавиатуры
document.addEventListener('keydown', function(e) {
    // Определяем, какой слайдер в фокусе (можно улучшить)
    const activeSlider = document.querySelector('.photo-slider:hover, .portfolio-slider:hover, .place-slider:hover');
    if (!activeSlider) return;
    
    const sliderId = activeSlider.id;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide(sliderId, -1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        changeSlide(sliderId, 1);
    }
});