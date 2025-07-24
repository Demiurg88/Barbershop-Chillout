# 🚀 Руководство по развертыванию Barbershop Chillout

Подробные инструкции по развертыванию сайта парикмахерской на различных платформах.

## 📋 Предварительные требования

### Обязательные компоненты:
- ✅ Веб-сервер (Apache/Nginx)
- ✅ Поддержка PHP (опционально)
- ✅ SSL сертификат (рекомендуется)
- ✅ Доменное имя

### API ключи:
- 🗺️ **Яндекс Карты API** - [developer.tech.yandex.ru](https://developer.tech.yandex.ru/)
- 🤖 **Telegram Bot Token** - [@BotFather](https://t.me/BotFather)

## 🌐 Варианты хостинга

### 1. Российские хостинг-провайдеры (Рекомендуется)

#### Timeweb
```bash
# Преимущества:
✅ Российский хостинг
✅ Быстрая техподдержка на русском
✅ SSD диски
✅ Бесплатный SSL
✅ Панель управления ISPmanager

# Тарифы: от 150₽/месяц
# Сайт: timeweb.com
```

#### Beget
```bash
# Преимущества:
✅ Стабильная работа
✅ Хорошая скорость
✅ Бесплатные домены .ru
✅ Автоматические бэкапы

# Тарифы: от 200₽/месяц
# Сайт: beget.com
```

#### REG.RU
```bash
# Преимущества:
✅ Крупный регистратор доменов
✅ Интеграция домен + хостинг
✅ Техподдержка 24/7

# Тарифы: от 180₽/месяц
# Сайт: reg.ru
```

### 2. Международные платформы

#### Netlify (Бесплатно для статических сайтов)
```bash
# Преимущества:
✅ Бесплатный план
✅ Автоматическое развертывание из Git
✅ CDN по всему миру
✅ Бесплатный SSL

# Ограничения:
❌ 100GB трафика/месяц
❌ Может быть медленным в России
```

#### Vercel
```bash
# Преимущества:
✅ Быстрое развертывание
✅ Интеграция с GitHub
✅ Бесплатный план

# Подходит для: статических сайтов
```

## 🔧 Пошаговое развертывание

### Вариант 1: Классический хостинг (Timeweb/Beget)

#### Шаг 1: Подготовка файлов
```bash
# 1. Скачайте все файлы проекта
# 2. Проверьте структуру:
barbershop-chillout/
├── index.html
├── css/
├── js/
├── images/
├── robots.txt
├── sitemap.xml
└── .htaccess
```

#### Шаг 2: Настройка API ключей
```javascript
// В index.html замените:
<script src="https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU"></script>

// На ваш ключ:
<script src="https://api-maps.yandex.ru/2.1/?apikey=ваш_реальный_ключ&lang=ru_RU"></script>
```

#### Шаг 3: Загрузка на хостинг
```bash
# Через FTP/SFTP:
1. Подключитесь к хостингу через FileZilla или WinSCP
2. Загрузите файлы в папку public_html/
3. Установите права доступа 644 для файлов, 755 для папок

# Через панель управления:
1. Войдите в панель управления хостингом
2. Откройте файловый менеджер
3. Загрузите архив с файлами
4. Распакуйте в корневую папку сайта
```

#### Шаг 4: Настройка домена
```bash
# В панели управления хостингом:
1. Привяжите домен к папке с сайтом
2. Настройте DNS записи:
   A-запись: @ → IP сервера
   CNAME: www → ваш_домен.ru
3. Дождитесь обновления DNS (до 24 часов)
```

#### Шаг 5: SSL сертификат
```bash
# Автоматический SSL (Let's Encrypt):
1. В панели управления найдите раздел "SSL"
2. Выберите "Let's Encrypt"
3. Активируйте для вашего домена
4. Включите принудительное перенаправление на HTTPS
```

### Вариант 2: GitHub Pages (Бесплатно)

#### Шаг 1: Создание репозитория
```bash
# 1. Создайте аккаунт на GitHub
# 2. Создайте новый репозиторий: barbershop-chillout
# 3. Загрузите файлы проекта
```

#### Шаг 2: Настройка GitHub Pages
```bash
# В настройках репозитория:
1. Перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Сохраните настройки
```

#### Шаг 3: Пользовательский домен
```bash
# Для собственного домена:
1. Создайте файл CNAME в корне репозитория
2. Добавьте в него ваш домен: barbershop-chillout.ru
3. В DNS настройках домена добавьте CNAME запись:
   www → username.github.io
```

### Вариант 3: Netlify

#### Шаг 1: Подключение репозитория
```bash
# 1. Зарегистрируйтесь на netlify.com
# 2. Подключите GitHub аккаунт
# 3. Выберите репозиторий barbershop-chillout
# 4. Настройки сборки оставьте пустыми (статический сайт)
```

#### Шаг 2: Настройка домена
```bash
# В панели Netlify:
1. Site settings → Domain management
2. Add custom domain → ваш_домен.ru
3. Настройте DNS записи согласно инструкциям Netlify
```

## ⚙️ Настройка после развертывания

### 1. Проверка работоспособности
```bash
# Проверьте:
✅ Загружается ли главная страница
✅ Отображаются ли изображения
✅ Работает ли Яндекс Карта
✅ Открывается ли Telegram бот по ссылке
✅ Корректно ли отображается на мобильных
```

### 2. SEO настройки
```html
<!-- Обновите мета-теги в index.html: -->
<meta property="og:url" content="https://ваш_домен.ru">
<link rel="canonical" href="https://ваш_домен.ru">
```

### 3. Аналитика
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(XXXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🔒 Безопасность

### 1. Обновление .htaccess
```apache
# Добавьте в .htaccess для безопасности:
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# HTTPS принуждение:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 2. Регулярные обновления
```bash
# Ежемесячно проверяйте:
✅ Обновления хостинга
✅ Работоспособность SSL
✅ Актуальность контента
✅ Скорость загрузки
```

## 📊 Мониторинг и оптимизация

### 1. Инструменты для проверки
```bash
# Скорость загрузки:
🔗 PageSpeed Insights: pagespeed.web.dev
🔗 GTmetrix: gtmetrix.com
🔗 WebPageTest: webpagetest.org

# SEO проверка:
🔗 Google Search Console
🔗 Яндекс.Вебмастер
🔗 Screaming Frog SEO Spider
```

### 2. Оптимизация изображений
```bash
# Рекомендуемые инструменты:
🔗 TinyPNG: tinypng.com
🔗 ImageOptim (Mac)
🔗 RIOT (Windows)

# Форматы:
✅ WebP для современных браузеров
✅ JPEG для фотографий
✅ PNG для изображений с прозрачностью
```

## 🆘 Решение проблем

### Частые ошибки:

#### 1. Не загружаются изображения
```bash
# Проверьте:
- Правильность путей к файлам
- Права доступа к папке images/
- Размер файлов (не более 2MB)
```

#### 2. Не работает Яндекс Карта
```bash
# Возможные причины:
- Неверный API ключ
- Превышен лимит запросов
- Блокировка JavaScript
```

#### 3. Медленная загрузка
```bash
# Оптимизация:
- Сжатие изображений
- Включение GZIP
- Использование CDN
- Минификация CSS/JS
```

## 📞 Техническая поддержка

### Контакты для помощи:
- **Хостинг Timeweb**: support@timeweb.ru
- **Хостинг Beget**: support@beget.com
- **Яндекс Карты**: api@yandex.ru

### Документация:
- 📖 [Яндекс Карты API](https://yandex.ru/dev/maps/)
- 📖 [Telegram Bot API](https://core.telegram.org/bots/api)
- 📖 [Apache .htaccess](https://httpd.apache.org/docs/current/howto/htaccess.html)

---

## ✅ Чек-лист развертывания

```bash
□ Получен API ключ Яндекс Карт
□ Создан Telegram бот
□ Выбран хостинг-провайдер
□ Зарегистрирован домен
□ Загружены файлы на сервер
□ Настроен SSL сертификат
□ Обновлены API ключи в коде
□ Проверена работоспособность сайта
□ Настроена аналитика
□ Добавлен сайт в поисковые системы
□ Проведена оптимизация скорости
□ Настроен мониторинг
```

**Успешного запуска! 🚀**