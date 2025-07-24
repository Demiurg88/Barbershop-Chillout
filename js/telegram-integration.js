// Интеграция с Telegram ботом для Barbershop Chillout
class TelegramIntegration {
    constructor() {
        this.botUsername = 'CHILLOUT_BARBER_bot';
        this.botUrl = `https://t.me/${this.botUsername}`;
        this.init();
    }

    init() {
        this.setupBookingButtons();
        this.setupQRCodeHandlers();
        this.trackTelegramClicks();
    }

    // Настройка кнопок записи
    setupBookingButtons() {
        const bookingButtons = document.querySelectorAll('a[href*="t.me"]');
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleBookingClick(e, button);
            });
        });
    }

    // Обработка клика по кнопке записи
    handleBookingClick(event, button) {
        // Отслеживание для аналитики
        this.trackEvent('booking_click', {
            source: 'website',
            button_type: button.className,
            timestamp: new Date().toISOString()
        });

        // Проверяем, поддерживает ли устройство Telegram
        if (this.isMobileDevice()) {
            // На мобильных устройствах пытаемся открыть приложение
            this.openTelegramApp(button.href);
        } else {
            // На десктопе открываем веб-версию
            window.open(button.href, '_blank', 'noopener,noreferrer');
        }
    }

    // Настройка обработчиков QR-кода
    setupQRCodeHandlers() {
        const qrCodes = document.querySelectorAll('.qr-code, .qr-small img');
        qrCodes.forEach(qr => {
            qr.addEventListener('click', () => {
                this.handleQRClick();
            });
            
            // Добавляем подсказку при наведении
            qr.title = 'Нажмите для перехода в Telegram бот';
            qr.style.cursor = 'pointer';
        });
    }

    // Обработка клика по QR-коду
    handleQRClick() {
        this.trackEvent('qr_click', {
            source: 'qr_code',
            timestamp: new Date().toISOString()
        });

        // Открываем Telegram бот
        window.open(this.botUrl, '_blank', 'noopener,noreferrer');
        
        // Показываем уведомление
        this.showNotification('Переходим в Telegram бот для записи!', 'info');
    }

    // Проверка мобильного устройства
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Открытие Telegram приложения
    openTelegramApp(url) {
        // Пытаемся открыть приложение
        const appUrl = url.replace('https://t.me/', 'tg://resolve?domain=');
        
        // Создаем невидимый iframe для попытки открытия приложения
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = appUrl;
        document.body.appendChild(iframe);

        // Если приложение не открылось, открываем веб-версию
        setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 1000);
    }

    // Отслеживание событий для аналитики
    trackEvent(eventName, data) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter: JSON.stringify(data)
            });
        }

        // Яндекс.Метрика
        if (typeof ym !== 'undefined') {
            ym(123456789, 'reachGoal', eventName, data);
        }

        // Консоль для отладки
        console.log(`Telegram Event: ${eventName}`, data);
    }

    // Показ уведомлений
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `telegram-notification telegram-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">📱</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-family: 'Inter', sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Цвета для уведомлений
    getNotificationColor(type) {
        const colors = {
            info: '#3498db',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        return colors[type] || colors.info;
    }

    // Генерация QR-кода (если нужно динамически)
    generateQRCode(text, size = 150) {
        // Используем внешний сервис для генерации QR-кода
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
        return qrUrl;
    }

    // Обновление QR-кода
    updateQRCode(selector, text) {
        const qrElement = document.querySelector(selector);
        if (qrElement) {
            qrElement.src = this.generateQRCode(text);
            qrElement.alt = `QR-код для ${text}`;
        }
    }

    // Проверка доступности Telegram бота
    async checkBotAvailability() {
        try {
            // Простая проверка доступности через fetch
            const response = await fetch(`https://t.me/${this.botUsername}`, {
                method: 'HEAD',
                mode: 'no-cors'
            });
            return true;
        } catch (error) {
            console.warn('Не удалось проверить доступность Telegram бота:', error);
            return false;
        }
    }

    // Добавление кнопки "Поделиться" для Telegram
    addShareButton() {
        const shareText = encodeURIComponent('Barbershop Chillout - лучший барбер в Тимашевске! Записывайтесь через бота: https://t.me/CHILLOUT_BARBER_bot');
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${shareText}`;
        
        const shareButton = document.createElement('a');
        shareButton.href = shareUrl;
        shareButton.target = '_blank';
        shareButton.rel = 'noopener noreferrer';
        shareButton.className = 'telegram-share-btn';
        shareButton.innerHTML = '📤 Поделиться в Telegram';
        shareButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0088cc;
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            text-decoration: none;
            font-size: 14px;
            box-shadow: 0 3px 10px rgba(0,136,204,0.3);
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        shareButton.addEventListener('mouseenter', () => {
            shareButton.style.transform = 'translateY(-2px)';
            shareButton.style.boxShadow = '0 5px 15px rgba(0,136,204,0.4)';
        });
        
        shareButton.addEventListener('mouseleave', () => {
            shareButton.style.transform = 'translateY(0)';
            shareButton.style.boxShadow = '0 3px 10px rgba(0,136,204,0.3)';
        });
        
        document.body.appendChild(shareButton);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const telegramIntegration = new TelegramIntegration();
    
    // Добавляем кнопку "Поделиться" через 2 секунды после загрузки
    setTimeout(() => {
        telegramIntegration.addShareButton();
    }, 2000);
    
    // Проверяем доступность бота
    telegramIntegration.checkBotAvailability().then(available => {
        if (!available) {
            console.warn('Telegram бот может быть недоступен');
        }
    });
});

// Экспорт для использования в других файлах
window.TelegramIntegration = TelegramIntegration;