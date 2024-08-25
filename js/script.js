const apiURL = 'https://api.sdu.yakovlevdev.com/index.php/services';
let currentIndex = 0;
let services = [];

// Функция для запроса данных
async function fetchServices() {
    try {
        const response = await fetch(apiURL);
        services = await response.json();

        // Отображаем первый элемент в карусели
        displayService(currentIndex);

        // Заполняем таблицу данными
        populateTable(services);
    } catch (error) {
        alert('Ошибка при загрузке данных: ' + error.message);
    }
}

// Функция для отображения сервиса в карусели
function displayService(index) {
    const service = services[index];
    document.getElementById('carouselImage').src = service.image;
    document.getElementById('carouselTitle').textContent = service.name;
    document.getElementById('carouselDescription').textContent = service.description;
    document.getElementById('carouselPrice').textContent = 'Цена: ' + service.price + ' руб.';
    document.getElementById('carouselDate').textContent = 'Дата: ' + new Date(service.created_at).toLocaleDateString();
}

// Функции для кнопок "Назад" и "Вперед"
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        displayService(currentIndex);
    }
}

function nextSlide() {
    if (currentIndex < services.length - 1) {
        currentIndex++;
        displayService(currentIndex);
    }
}

// Функция для заполнения таблицы данными
function populateTable(services) {
    const tableBody = document.getElementById('servicesTable').querySelector('tbody');
    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${service.name}</td>
                    <td>${service.description}</td>
                    <td>${service.price} руб.</td>
                    <td>${new Date(service.created_at).toLocaleDateString()}</td>
                `;
        tableBody.appendChild(row);
    });
}

// Загружаем данные при загрузке страницы
window.onload = fetchServices;