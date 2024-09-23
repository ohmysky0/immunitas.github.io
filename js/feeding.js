// js/feeding.js

const Feeding = {
    childInfo: null,
    feedingData: {
        type: 'breast', // 'breast', 'mixed', 'formula'
        formulaType: '', // Если используется смесь
        allergies: [],
        lastWeight: null,
        lastWeightDate: null
    },
    complementaryFoods: {
        4: [
            { name: 'овощное пюре', amount: '10-150 г', frequency: '1 раз в день' }
        ],
        5: [
            { name: 'овощное пюре', amount: '150 г', frequency: '1 раз в день' },
            { name: 'фруктовое пюре', amount: '5-60 г', frequency: '1 раз в день' }
        ],
        6: [
            { name: 'овощное пюре', amount: '150 г', frequency: '1-2 раза в день' },
            { name: 'фруктовое пюре', amount: '60 г', frequency: '1 раз в день' },
            { name: 'каша', amount: '10-150 г', frequency: '1 раз в день' },
            { name: 'мясное пюре', amount: '5-30 г', frequency: '1 раз в день' }
        ],
        7: [
            { name: 'овощное пюре', amount: '150 г', frequency: '2 раза в день' },
            { name: 'фруктовое пюре', amount: '70 г', frequency: '1 раз в день' },
            { name: 'каша', amount: '150 г', frequency: '1 раз в день' },
            { name: 'мясное пюре', amount: '30 г', frequency: '1 раз в день' },
            { name: 'творог', amount: '10-40 г', frequency: '1 раз в день' },
            { name: 'желток', amount: '1/8 шт', frequency: '1 раз в день' }
        ],
        8: [
            { name: 'овощное пюре', amount: '150 г', frequency: '2 раза в день' },
            { name: 'фруктовое пюре', amount: '80 г', frequency: '1 раз в день' },
            { name: 'каша', amount: '150 г', frequency: '2 раза в день' },
            { name: 'мясное пюре', amount: '50 г', frequency: '1 раз в день' },
            { name: 'творог', amount: '40 г', frequency: '1 раз в день' },
            { name: 'желток', amount: '1/4 шт', frequency: '1 раз в день' },
            { name: 'рыбное пюре', amount: '5-30 г', frequency: '1-2 раза в неделю' },
            { name: 'растительное масло', amount: '1 ч.л.', frequency: 'в день' },
            { name: 'сливочное масло', amount: '1/2 ч.л.', frequency: 'в день' }
        ]
        // Добавьте данные для остальных месяцев
    },

    init(container, childInfo) {
        this.container = container;
        this.childInfo = childInfo;
        this.loadFeedingData();
        this.render();
        this.setupEventListeners();
    },

    loadFeedingData() {
        const savedData = localStorage.getItem('feedingData');
        if (savedData) {
            this.feedingData = JSON.parse(savedData);
        }
        // Получаем последнее измерение веса из модуля физического развития
        const measurements = JSON.parse(localStorage.getItem('growthMeasurements') || '[]');
        if (measurements.length > 0) {
            const lastMeasurement = measurements[measurements.length - 1];
            this.feedingData.lastWeight = lastMeasurement.weight;
            this.feedingData.lastWeightDate = lastMeasurement.date;
        }
    },

    saveFeedingData() {
        localStorage.setItem('feedingData', JSON.stringify(this.feedingData));
    },

    render() {
        const age = this.calculateAgeInMonths();
        const feedingPlan = this.calculateFeedingPlan(age, this.feedingData.lastWeight);

        this.container.innerHTML = `
            <div class="feeding-container">
                <h2>Дозатор вскармливания</h2>
                <div class="feeding-info">
                    <p>Возраст ребенка: ${this.formatAge(age)}</p>
                    <p>Текущий вес: ${this.feedingData.lastWeight ? this.feedingData.lastWeight.toFixed(2) + ' кг' : 'Нет данных'}</p>
                    <p>Дата последнего измерения: ${this.feedingData.lastWeightDate ? this.formatDate(this.feedingData.lastWeightDate) : 'Нет данных'}</p>
                    <p>Тип вскармливания: ${this.getFeedingTypeText()}</p>
                </div>
                <div class="feeding-actions">
                    <button id="edit-feeding-type" class="btn btn-primary">Изменить тип вскармливания</button>
                    <button id="edit-weight" class="btn btn-secondary">Обновить вес</button>
                    <button id="edit-allergies" class="btn btn-secondary">Указать аллергии</button>
                </div>
                <div class="feeding-plan">
                    <h3>План кормления</h3>
                    ${this.renderFeedingPlan(feedingPlan)}
                </div>
                <div class="complementary-foods">
                    <h3>Прикорм</h3>
                    ${this.renderComplementaryFoods(age)}
                </div>
            </div>
        `;
    },

    renderFeedingPlan(plan) {
        if (!plan) return '<p>Недостаточно данных для расчета плана кормления</p>';

        let html = '<table class="feeding-schedule"><thead><tr><th>Время</th><th>Объем (мл)</th></tr></thead><tbody>';
        plan.schedule.forEach(feeding => {
            html += `
                <tr>
                    <td>${feeding.time}</td>
                    <td>${feeding.amount} мл</td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        html += `<p>Общий объем в сутки: ${plan.totalVolume} мл</p>`;
        html += `<p>Кратность кормлений: ${plan.feedingsPerDay} раз в сутки</p>`;
        return html;
    },

    renderComplementaryFoods(age) {
        const foods = this.getComplementaryFoods(age);
        if (foods.length === 0) return '<p>Прикорм пока не рекомендуется</p>';

        let html = '<ul class="complementary-foods-list">';
        foods.forEach(food => {
            html += `<li>${food.name} - ${food.amount} (${food.frequency})</li>`;
        });
        html += '</ul>';
        return html;
    },

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'edit-feeding-type') {
                this.showFeedingTypeModal();
            } else if (e.target.id === 'edit-weight') {
                this.showWeightModal();
            } else if (e.target.id === 'edit-allergies') {
                this.showAllergiesModal();
            }
        });
    },

    showFeedingTypeModal() {
        Utils.showModal('Тип вскармливания', `
            <form id="feeding-type-form">
                <div class="form-group">
                    <label for="feeding-type">Выберите тип вскармливания:</label>
                    <select id="feeding-type" required>
                        <option value="breast" ${this.feedingData.type === 'breast' ? 'selected' : ''}>Грудное</option>
                        <option value="mixed" ${this.feedingData.type === 'mixed' ? 'selected' : ''}>Смешанное</option>
                        <option value="formula" ${this.feedingData.type === 'formula' ? 'selected' : ''}>Искусственное</option>
                    </select>
                </div>
                <div id="formula-type-group" style="display: none;">
                    <div class="form-group">
                        <label for="formula-type">Тип смеси:</label>
                        <input type="text" id="formula-type" value="${this.feedingData.formulaType || ''}">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        `);

        const feedingTypeSelect = document.getElementById('feeding-type');
        const formulaTypeGroup = document.getElementById('formula-type-group');

        feedingTypeSelect.addEventListener('change', () => {
            formulaTypeGroup.style.display = feedingTypeSelect.value !== 'breast' ? 'block' : 'none';
        });

        document.getElementById('feeding-type-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.feedingData.type = feedingTypeSelect.value;
            this.feedingData.formulaType = document.getElementById('formula-type').value;
            this.saveFeedingData();
            Utils.closeModal();
            this.render();
            Utils.showNotification('Тип вскармливания обновлен', 'success');
        });

        // Инициализация отображения поля для типа смеси
        formulaTypeGroup.style.display = this.feedingData.type !== 'breast' ? 'block' : 'none';
    },

    showWeightModal() {
        Utils.showModal('Обновить вес', `
            <form id="weight-form">
                <div class="form-group">
                    <label for="current-weight">Текущий вес (кг):</label>
                    <input type="number" id="current-weight" step="0.1" min="0" required value="${this.feedingData.lastWeight || ''}">
                </div>
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        `);

        document.getElementById('weight-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.feedingData.lastWeight = parseFloat(document.getElementById('current-weight').value);
            this.feedingData.lastWeightDate = new Date().toISOString();
            this.saveFeedingData();
            Utils.closeModal();
            this.render();
            Utils.showNotification('Вес обновлен', 'success');
        });
    },

    showAllergiesModal() {
        const commonAllergens = ['молоко', 'яйца', 'арахис', 'орехи', 'соя', 'пшеница', 'рыба', 'морепродукты'];

        Utils.showModal('Аллергии', `
            <form id="allergies-form">
                <div class="form-group">
                    <label>Выберите продукты, на которые есть аллергия:</label>
                    <div class="allergies-list">
                        ${commonAllergens.map(allergen => `
                            <div class="allergen-item">
                                <input type="checkbox" id="${allergen}" name="allergies" value="${allergen}" 
                                    ${this.feedingData.allergies.includes(allergen) ? 'checked' : ''}>
                                <label for="${allergen}">${allergen}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="other-allergies">Другие аллергии:</label>
                    <input type="text" id="other-allergies" placeholder="Введите через запятую">
                </div>
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        `);

        document.getElementById('allergies-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedAllergies = Array.from(document.querySelectorAll('input[name="allergies"]:checked')).map(el => el.value);
            const otherAllergies = document.getElementById('other-allergies').value.split(',').map(a => a.trim()).filter(a => a);
            this.feedingData.allergies = [...new Set([...selectedAllergies, ...otherAllergies])];
            this.saveFeedingData();
            Utils.closeModal();
            this.render();
            Utils.showNotification('Список аллергий обновлен', 'success');
        });
    },

    calculateAgeInMonths() {
        const birthDate = new Date(this.childInfo.birthdate);
        const now = new Date();
        return (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
    },

    calculateFeedingPlan(age, weight) {
        if (!weight) return null;

        let dailyVolume, feedingsPerDay, interval;

        if (age <= 2) {
            dailyVolume = weight * 1/5 * 1000;
            feedingsPerDay = 7;
            interval = 3;
        } else if (age <= 4) {
            dailyVolume = weight * 1/6 * 1000;
            feedingsPerDay = 6;
            interval = 3.5;
        } else if (age <= 6) {
            dailyVolume = weight * 1/7 * 1000;
            feedingsPerDay = 5;
            interval = 4;
        } else {
            dailyVolume = 1000; // Примерно 1000 мл в сутки после 6 месяцев
            feedingsPerDay = 5;
            interval = 4;
        }

        // Округляем до ближайших 10 мл
        dailyVolume = Math.round(dailyVolume / 10) * 10;

        const volumePerFeeding = Math.round(dailyVolume / feedingsPerDay);
        const schedule = [];

        let currentHour = 6; // Начинаем с 6 утра
        for (let i = 0; i < feedingsPerDay; i++) {
            schedule.push({
                time: `${Math.floor(currentHour).toString().padStart(2, '0')}:${(currentHour % 1 * 60).toString().padStart(2, '0')}`,
                amount: volumePerFeeding
            });
            currentHour = (currentHour + interval) % 24;
        }

        return {
            totalVolume: dailyVolume,
            feedingsPerDay: feedingsPerDay,
            schedule: schedule
        };
    },

    getComplementaryFoods(age) {
        const monthKey = Object.keys(this.complementaryFoods)
            .map(Number)
            .filter(month => month <= age)
            .sort((a, b) => b - a)[0];

        if (!monthKey) return [];

        return this.complementaryFoods[monthKey].filter(food => {
            // Проверяем аллергии и заменяем продукты при необходимости
            if (this.feedingData.allergies.includes('молоко') && food.name === 'каша') {
                food.name += ' (на воде)';
            }
            if (this.feedingData.allergies.includes('яйца') && food.name === 'желток') {
                return false; // Исключаем желток из рекомендаций
            }
            return !this.feedingData.allergies.includes(food.name.toLowerCase());
        });
    },

    getFeedingTypeText() {
        switch (this.feedingData.type) {
            case 'breast':
                return 'Грудное вскармливание';
            case 'mixed':
                return 'Смешанное вскармливание';
            case 'formula':
                return `Искусственное вскармливание (${this.feedingData.formulaType || 'адаптированная смесь'})`;
            default:
                return 'Не указано';
        }
    },

    formatAge(ageInMonths) {
        const years = Math.floor(ageInMonths / 12);
        const months = ageInMonths % 12;
        return `${years ? years + ' г. ' : ''}${months} мес.`;
    },

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};