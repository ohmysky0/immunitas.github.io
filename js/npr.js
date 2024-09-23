// js/npr.js

const NPR = {
    childInfo: null,
    nprData: [],
    nprStandards: {
        1: {
            "Зрительные ориентировочные реакции": "Удерживает в поле зрения движущийся предмет (ступенчатое слежение)",
            "Слуховые ориентировочные реакции": "Длительное слуховое сосредоточение с поворотом головы в сторону звука",
            "Эмоции и социальное поведение": "Первая улыбка в ответ на разговор взрослого",
            "Движения общие": "Лежа на животе, пытается поднимать и удерживать голову",
            "Подготовительные этапы развития активной речи": "Издает отдельные звуки в ответ на разговор с ним"
        },
        3: {
            "Зрительные ориентировочные реакции": "Зрительное сосредоточение в вертикальном положении",
            "Слуховые ориентировочные реакции": "Ищущие повороты головы при длительном звуке",
            "Эмоции и социальное поведение": "Комплекс оживления в ответ на эмоциональное общение взрослого",
            "Движения руки": "Случайно наталкивается руками на игрушки, низко висящие над грудью",
            "Движения общие": "Лежа на животе, поднимает и некоторое время удерживает голову",
            "Подготовительные этапы развития активной речи": "Гуление"
        },
        6: {
            "Зрительные ориентировочные реакции": "Четко берет игрушку, которую держат у его груди, рассматривает, обследует ее",
            "Слуховые ориентировочные реакции": "По-разному реагирует на свое и чужое имя",
            "Эмоции и социальное поведение": "Четко отличает своих от чужих (по-разному реагирует на лицо знакомого и незнакомого взрослого)",
            "Движения руки и действия с предметами": "Уверенно берет игрушки, находящиеся рядом, и манипулирует ими",
            "Движения общие": "Переворачивается на бок (влево, вправо), на живот и обратно на спину",
            "Подготовительные этапы развития активной речи": "Произносит отдельные слоги (начало лепета)",
            "Навыки и умения в процессах": "Ест с ложки полугустую и густую пищу"
        },
        9: {
            "Речь понимаемая": "На вопрос «Где?» находит взглядом предмет, постоянно находящийся в определенном месте",
            "Эмоции и социальное поведение": "Догадывается о последствиях элементарных гигиенических процедур",
            "Действия с предметами": "Действует с предметами по-разному, в зависимости от их свойств",
            "Движения общие": "Сам садится, сидит, ложится, встает, стоит у опоры",
            "Подготовительные этапы развития активной речи": "Подолгу лепечет, повторно произносит одни и те же слоги",
            "Навыки и умения в процессах": "Пьет из чашки, которую держит взрослый"
        },
        12: {
            "Речь понимаемая": "Понимает (без показа) названия нескольких предметов, действий, имена взрослых и детей",
            "Речь активная": "Произносит первые слова-обозначения",
            "Сенсорное развитие": "Ориентируется в двух контрастных величинах предметов",
            "Игры и действия с предметами": "Воспроизводит в игре действия с предметами, ранее разученные",
            "Движения общие": "Ходит самостоятельно (без опоры)",
            "Навыки и умения в процессах": "Самостоятельно пьет из чашки"
        },
        18: {
            "Понимание речи": "Запас понимаемых слов быстро расширяется",
            "Активная речь": "Пользуется лепетом и отдельными облегченными словами в момент двигательной активности",
            "Сенсорное развитие": "Ориентируется в 4 контрастных формах предметов",
            "Игра и действия с предметами": "Отображает отдельные действия взрослых с предметами: подражает",
            "Движения": "Преодолевает препятствия (перешагивает через палку, поднятую над полом на 10 см)",
            "Навыки": "Самостоятельно ест густую пищу ложкой"
        },
        24: {
            "Понимание речи": "Понимает обозначаемую на простых сюжетных картинках знакомую ситуацию",
            "Активная речь": "Пользуется предложениями из 3 слов",
            "Сенсорное развитие": "Ориентируется в 3 контрастных цветах, подбирает по образцу парные предметы одного цвета",
            "Игра и действия с предметами": "В игре воспроизводит ряд логически связанных действий",
            "Движения": "Перешагивает через палку, приподнятую от пола на 20 см",
            "Навыки": "Частично надевает одежду (ботинки, шапку)"
        },
        36: {
            "Активная речь": "Начинает употреблять сложные придаточные предложения",
            "Сенсорное развитие": "Называет 4 основных цвета",
            "Игра и действия с предметами": "В игре действует взаимосвязано и последовательно (ролевая игра)",
            "Движения": "Переступает через препятствия высотой 10–15 см, чередуя шаг",
            "Навыки": "Самостоятельно одевается, но еще не умеет застегивать пуговицы и завязывать шнурки",
            "Конструктивная деятельность": "Умеет собрать пирамиду из 5–7 колец по убывающей величине"
        }
    },

    init(container, childInfo) {
        this.container = container;
        this.childInfo = childInfo;
        this.loadNPRData();
        this.render();
        this.setupEventListeners();
    },

    loadNPRData() {
        const savedData = localStorage.getItem('nprData');
        if (savedData) {
            this.nprData = JSON.parse(savedData);
        }
    },

    saveNPRData() {
        localStorage.setItem('nprData', JSON.stringify(this.nprData));
    },

    render() {
        this.container.innerHTML = `
            <div class="npr-container">
                <h2>Нервно-психическое развитие</h2>
                <div class="npr-timeline"></div>
                <div class="npr-summary"></div>
                <div class="npr-actions">
                    <button id="add-npr-assessment" class="btn btn-primary">Добавить оценку НПР</button>
                </div>
                <div class="npr-history"></div>
            </div>
        `;
        this.renderTimeline();
        this.renderSummary();
        this.renderHistory();
    },

    renderTimeline() {
        const timelineContainer = this.container.querySelector('.npr-timeline');
        const currentAge = this.calculateAgeInMonths();
        const stages = Object.keys(this.nprStandards).map(Number);

        let timelineHTML = '<div class="timeline">';
        stages.forEach((stage, index) => {
            const isCompleted = this.nprData.some(assessment => assessment.ageGroup === stage);
            const isCurrent = currentAge >= stage && (index === stages.length - 1 || currentAge < stages[index + 1]);
            timelineHTML += `
                <div class="timeline-point ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" data-age="${stage}">
                    <div class="timeline-label">${stage} мес.</div>
                </div>
            `;
        });
        timelineHTML += '</div>';

        timelineContainer.innerHTML = timelineHTML;
    },

    renderSummary() {
        const summaryContainer = this.container.querySelector('.npr-summary');
        if (this.nprData.length === 0) {
            summaryContainer.innerHTML = '<p>Нет данных о НПР. Добавьте первую оценку.</p>';
            return;
        }

        const latestAssessment = this.nprData[this.nprData.length - 1];
        const developmentStatus = this.calculateDevelopmentStatus(latestAssessment);

        summaryContainer.innerHTML = `
            <h3>Текущий статус развития</h3>
            <div class="development-status ${developmentStatus.toLowerCase().replace(/\s+/g, '-')}">
                ${developmentStatus}
            </div>
            <p>Последняя оценка: ${this.formatDate(latestAssessment.date)}</p>
        `;
    },

    renderHistory() {
        const historyContainer = this.container.querySelector('.npr-history');
        if (this.nprData.length === 0) {
            historyContainer.innerHTML = '<p>История оценок пуста.</p>';
            return;
        }

        let historyHTML = `
            <h3>История оценок</h3>
            <div class="history-list">
        `;

        this.nprData.slice().reverse().forEach((assessment, index) => {
            const developmentStatus = this.calculateDevelopmentStatus(assessment);
            historyHTML += `
                <div class="history-item" data-index="${this.nprData.length - 1 - index}">
                    <div class="history-date">${this.formatDate(assessment.date)}</div>
                    <div class="history-status ${developmentStatus.toLowerCase().replace(/\s+/g, '-')}">
                        ${developmentStatus}
                    </div>
                    <div class="history-actions">
                        <button class="btn-icon btn-details" title="Подробности">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button class="btn-icon btn-delete" title="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        historyHTML += '</div>';
        historyContainer.innerHTML = historyHTML;
    },

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'add-npr-assessment') {
                this.showAssessmentModal();
            } else if (e.target.closest('.btn-details')) {
                const index = parseInt(e.target.closest('.history-item').dataset.index);
                this.showAssessmentDetails(index);
            } else if (e.target.closest('.btn-delete')) {
                const index = parseInt(e.target.closest('.history-item').dataset.index);
                this.showDeleteConfirmation(index);
            }
        });
    },

    showAssessmentModal() {
        const currentAge = this.calculateAgeInMonths();
        const closestStandardAge = this.getClosestStandardAge(currentAge);
        const standards = this.nprStandards[closestStandardAge];
    
        const today = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD
    
        let modalContent = `
            <form id="npr-assessment-form">
                <div class="form-group">
                    <label for="assessment-date">Дата оценки:</label>
                    <input type="date" id="assessment-date" required value="${today}">
                </div>
                <h4>Оценка для возраста ${closestStandardAge} мес.</h4>
        `;

        Object.entries(standards).forEach(([category, standard]) => {
            modalContent += `
                <div class="form-group">
                    <label>${category}:</label>
                    <p class="standard-description">${standard}</p>
                    <select name="${category}" required>
                        <option value="">Выберите оценку</option>
                        <option value="1">Выполняет</option>
                        <option value="0">Не выполняет</option>
                    </select>
                </div>
            `;
        });

        modalContent += `
                <button type="submit" class="btn btn-primary">Сохранить оценку</button>
            </form>
        `;

        Utils.showModal('Новая оценка НПР', modalContent);

        document.getElementById('npr-assessment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAssessment(new FormData(e.target));
            Utils.closeModal();
            this.render();
        });
    },

    saveAssessment(formData) {
        const assessmentDate = new Date(formData.get('assessment-date'));
        // Проверяем, является ли дата валидной
        if (isNaN(assessmentDate.getTime())) {
            Utils.showNotification('Пожалуйста, введите корректную дату', 'error');
            return;
        }
    
        const assessment = {
            date: assessmentDate.toISOString(), // Сохраняем дату в формате ISO
            ageGroup: this.getClosestStandardAge(this.calculateAgeInMonths(assessmentDate)),
            results: {}
        };
    
        for (let [key, value] of formData.entries()) {
            if (key !== 'assessment-date') {
                assessment.results[key] = parseInt(value);
            }
        }
    
        this.nprData.push(assessment);
        this.saveNPRData();
        Utils.showNotification('Оценка НПР сохранена', 'success');
        this.render();
    },

    showAssessmentDetails(index) {
        const assessment = this.nprData[index];
        const standards = this.nprStandards[assessment.ageGroup];

        let detailsHTML = `
            <h3>Детали оценки НПР</h3>
            <p><strong>Дата оценки:</strong> ${this.formatDate(assessment.date)}</p>
            <p><strong>Возрастная группа:</strong> ${assessment.ageGroup} мес.</p>
            <div class="assessment-results">
        `;

        Object.entries(standards).forEach(([category, standard]) => {
            const result = assessment.results[category];
            detailsHTML += `
                <div class="assessment-item">
                    <h4>${category}</h4>
                    <p>${standard}</p>
                    <p class="result ${result ? 'success' : 'danger'}">
                        ${result ? 'Выполняет' : 'Не выполняет'}
                    </p>
                </div>
            `;
        });

        detailsHTML += '</div>';

        Utils.showModal('Детали оценки НПР', detailsHTML);
    },

    showDeleteConfirmation(index) {
        const assessment = this.nprData[index];
        Utils.showModal('Подтверждение удаления', `
            <p>Вы уверены, что хотите удалить оценку НПР от ${this.formatDate(assessment.date)}?</p>
            <div class="modal-actions">
                <button id="confirm-delete" class="btn btn-danger">Удалить</button>
                <button id="cancel-delete" class="btn btn-secondary">Отмена</button>
            </div>
        `);

        document.getElementById('confirm-delete').addEventListener('click', () => {
            this.deleteAssessment(index);
            Utils.closeModal();
            this.render();
            Utils.showNotification('Оценка НПР удалена', 'warning');
        });

        document.getElementById('cancel-delete').addEventListener('click', () => {
            Utils.closeModal();
        });
    },

    deleteAssessment(index) {
        this.nprData.splice(index, 1);
        this.saveNPRData();
    },

    calculateAgeInMonths(date = new Date()) {
        const birthDate = new Date(this.childInfo.birthdate);
        const assessmentDate = new Date(date);
        let months = (assessmentDate.getFullYear() - birthDate.getFullYear()) * 12;
        months += assessmentDate.getMonth() - birthDate.getMonth();
        if (assessmentDate.getDate() < birthDate.getDate()) {
            months--;
        }
        return months;
    },

    getClosestStandardAge(age) {
        return Object.keys(this.nprStandards)
            .map(Number)
            .reduce((prev, curr) => (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev));
    },

    calculateDevelopmentStatus(assessment) {
        const totalTasks = Object.keys(assessment.results).length;
        const completedTasks = Object.values(assessment.results).filter(Boolean).length;
        const completionPercentage = (completedTasks / totalTasks) * 100;

        if (completionPercentage >= 90) return 'Нормальное развитие';
        if (completionPercentage >= 80) return 'Группа внимания';
        if (completionPercentage >= 70) return 'Задержка 1 степени';
        if (completionPercentage >= 60) return 'Задержка 2 степени';
        return 'Задержка 3 степени';
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Некорректная дата';
        }
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};