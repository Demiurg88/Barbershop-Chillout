# Настройка GitHub Pages для сайта барбершопа

## Шаги для публикации сайта:

### 1. Создание репозитория на GitHub
1. Перейдите на https://github.com
2. Войдите в свой аккаунт
3. Нажмите "New repository"
4. Назовите репозиторий: `barber-landing`
5. Сделайте его публичным (Public)
6. НЕ добавляйте README, .gitignore или лицензию
7. Нажмите "Create repository"

### 2. Подключение локального репозитория
```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/barber-landing.git
git branch -M main
git push -u origin main
```

### 3. Настройка GitHub Pages
1. В репозитории перейдите в Settings
2. Прокрутите до раздела "Pages"
3. В разделе "Source" выберите "Deploy from a branch"
4. Выберите ветку "main"
5. Выберите папку "/ (root)"
6. Нажмите "Save"

### 4. Доступ к сайту
После настройки сайт будет доступен по адресу:
`https://ВАШ_ЛОГИН.github.io/barber-landing/`

### 5. Обновление сайта
Для обновления сайта просто делайте новые коммиты и пуши:
```bash
git add .
git commit -m "Описание изменений"
git push
```

## Важные замечания:

- Замените `ВАШ_ЛОГИН` на ваш реальный логин GitHub
- GitHub Pages может занять несколько минут для первого развертывания
- Сайт автоматически обновляется при каждом push в ветку main
- Убедитесь, что файл `index.html` находится в корне репозитория

## Возможные проблемы:

### Если изображения не загружаются:
Проверьте пути к изображениям в HTML и CSS файлах. Они должны быть относительными:
```html
<img src="images/ivan.jpg" alt="Ivan">
```

### Если стили не применяются:
Проверьте пути к CSS файлам:
```html
<link rel="stylesheet" href="css/style.css">
```

### Если JavaScript не работает:
Проверьте пути к JS файлам:
```html
<script src="js/script.js"></script>