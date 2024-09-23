// js/checkup.js

const Checkup = {
    checkups: [],
    childInfo: null,
    checkupSchedule: {
        'Новорожденный': {
            ageRange: '0-1 месяц',
            specialists: ['Педиатр'],
            tests: ['Неонатальный скрининг', 'Аудиологический скрининг']
        },
        '1 месяц': {
            ageRange: '1-2 месяца',
            specialists: ['Педиатр', 'Невролог', 'Детский хирург', 'Офтальмолог', 'Детский стоматолог'],
            tests: ['УЗИ органов брюшной полости', 'УЗИ почек', 'УЗИ тазобедренных суставов', 'ЭХО-КГ', 'НСГ', 'Аудиологический скрининг']
        },
        '2 месяца': {
            ageRange: '2-3 месяца',
            specialists: ['Педиатр'],
            tests: ['ОАК', 'ОАМ', 'Аудиологический скрининг']
        },
        '3 месяца': {
            ageRange: '3-4 месяца',
            specialists: ['Педиатр', 'Травматолог-ортопед'],
            tests: ['Аудиологический скрининг']
        },
        '4-11 месяцев': {
            ageRange: '4-11 месяцев',
            specialists: ['Педиатр'],
            tests: []
        },
        '12 месяцев': {
            ageRange: '12-13 месяцев',
            specialists: ['Педиатр', 'Невролог', 'Детский хирург', 'Оториноларинголог', 'Травматолог-ортопед', 'Офтальмолог'],
            tests: ['ОАК', 'ОАМ', 'ЭКГ']
        },
        '2 года': {
            ageRange: '2-3 года',
            specialists: ['Педиатр', 'Детский стоматолог', 'Психиатр детский'],
            tests: ['Скрининг на выявление группы риска возникновения или наличия нарушений психического развития']
        },
        '3 года': {
            ageRange: '3-4 года',
            specialists: ['Педиатр', 'Невролог', 'Детский хирург', 'Детский стоматолог', 'Офтальмолог', 'Оториноларинголог', 'Акушер-гинеколог', 'Детский уролог-андролог'],
            tests: ['ОАМ', 'ОАК']
        },
        '4-5 лет': {
            ageRange: '4-6 лет',
            specialists: ['Педиатр', 'Детский стоматолог'],
            tests: []
        },
        '6 лет': {
            ageRange: '6-7 лет',
            specialists: ['Педиатр', 'Невролог', 'Детский хирург', 'Детский стоматолог', 'Травматолог-ортопед', 'Офтальмолог', 'Оториноларинголог', 'Психиатр детский', 'Акушер-гинеколог', 'Детский уролог-андролог', 'Детский эндокринолог'],
            tests: ['ОАК', 'ОАМ', 'УЗИ органов брюшной полости', 'УЗИ почек', 'ЭКГ', 'ЭХО-КГ']
        },
        '7 лет': {
            ageRange: '7-8 лет',
            specialists: ['Педиатр', 'Невролог', 'Детский стоматолог', 'Офтальмолог', 'Оториноларинголог'],
            tests: ['ОАМ', 'ОАК']
        },
        '10 лет': {
            ageRange: '10-11 лет',
            specialists: ['Педиатр', 'Невролог', 'Детский стоматолог', 'Детский эндокринолог', 'Травматолог-ортопед', 'Офтальмолог'],
            tests: ['ОАМ', 'ОАК']
        },
        '14 лет': {
            ageRange: '14-15 лет',
            specialists: ['Педиатр', 'Детский стоматолог', 'Детский уролог-андролог', 'Акушер-гинеколог', 'Психиатр подростковый'],
            tests: []
        },
        '15-17 лет': {
            ageRange: '15-17 лет',
            specialists: ['Педиатр', 'Детский хирург', 'Детский стоматолог', 'Детский уролог-андролог', 'Детский эндокринолог', 'Невролог', 'Травматолог-ортопед', 'Офтальмолог', 'Оториноларинголог', 'Акушер-гинеколог', 'Психиатр подростковый'],
            tests: ['ОАК', 'ОАМ', 'УЗИ органов брюшной полости', 'УЗИ почек', 'ЭКГ']
        }
    },

    commonDiagnoses: {
        'Педиатр': [
            'Здоров', 'ОРВИ', 'Острый бронхит', 'Пневмония', 'Острый гастроэнтерит',
            'Атопический дерматит', 'Анемия', 'Ожирение', 'Функциональные расстройства ЖКТ',
            'Рахит', 'Аллергический ринит', 'Бронхиальная астма', 'Дисбактериоз кишечника',
            'Острый отит', 'Инфекция мочевыводящих путей', 'Дефицит витамина D',
            'Задержка физического развития', 'Вазомоторный ринит', 'Гельминтоз'
        ],
        'Невролог': [
            'Здоров', 'Перинатальная энцефалопатия', 'Гипертензионный синдром',
            'Детский церебральный паралич', 'Эпилепсия', 'Задержка психомоторного развития',
            'Минимальная мозговая дисфункция', 'Вегето-сосудистая дистония',
            'Синдром дефицита внимания и гиперактивности', 'Тики', 'Невроз',
            'Гидроцефалия', 'Мигрень', 'Невропатия лицевого нерва', 'Энурез',
            'Судорожный синдром', 'Перинатальное поражение ЦНС'
        ],
        'Детский хирург': [
            'Здоров', 'Пупочная грыжа', 'Паховая грыжа', 'Водянка оболочек яичка',
            'Крипторхизм', 'Варикоцеле', 'Фимоз', 'Синехии малых половых губ',
            'Дисплазия тазобедренных суставов', 'Пороки развития ЖКТ',
            'Гемангиома', 'Пилоростеноз', 'Инвагинация кишечника', 'Аппендицит',
            'Перитонит', 'Врожденный вывих бедра', 'Гипоспадия', 'Крипторхизм'
        ],
        'Офтальмолог': [
            'Здоров', 'Миопия', 'Гиперметропия', 'Астигматизм', 'Косоглазие', 
            'Амблиопия', 'Конъюнктивит', 'Блефарит', 'Ретинопатия недоношенных',
            'Катаракта', 'Глаукома', 'Дакриоцистит новорожденных',
            'Халязион', 'Ячмень', 'Нистагм', 'Птоз', 'Кератоконус', 'Увеит'
        ],
        'Детский стоматолог': [
            'Здоров', 'Кариес', 'Пульпит', 'Периодонтит', 'Гингивит', 'Стоматит',
            'Неправильный прикус', 'Адентия', 'Гипоплазия эмали', 'Флюороз',
            'Зубочелюстные аномалии', 'Травма зуба', 'Периостит', 'Ретенция зуба',
            'Пародонтит', 'Анкилоглоссия', 'Ранула', 'Остеомиелит челюсти'
        ],
        'Травматолог-ортопед': [
            'Здоров', 'Плоскостопие', 'Дисплазия тазобедренных суставов', 'Сколиоз',
            'Вальгусная деформация стоп', 'Варусная деформация голеней',
            'Остеохондропатия', 'Врожденная косолапость', 'Врожденный вывих бедра',
            'Болезнь Осгуда-Шлаттера', 'Ювенильный остеохондроз',
            'Кривошея', 'Остеомиелит', 'Перелом кости', 'Вывих сустава',
            'Рахит', 'Артрит', 'Остеопороз'
        ],
        'Оториноларинголог': [
            'Здоров', 'Аденоиды', 'Хронический тонзиллит', 'Отит', 'Синусит',
            'Искривление носовой перегородки', 'Аллергический ринит', 'Ларингит',
            'Фарингит', 'Гипертрофия небных миндалин', 'Экссудативный средний отит',
            'Полипы носа', 'Ангина', 'Мастоидит', 'Отосклероз', 'Нейросенсорная тугоухость',
            'Вазомоторный ринит', 'Фурункул наружного слухового прохода'
        ],
        'Психиатр детский': [
            'Здоров', 'Задержка психического развития', 'Синдром дефицита внимания и гиперактивности',
            'Расстройства аутистического спектра', 'Тревожные расстройства',
            'Депрессивные расстройства', 'Нарушения пищевого поведения',
            'Обсессивно-компульсивное расстройство', 'Тикозные расстройства',
            'Энурез', 'Заикание', 'Элективный мутизм', 'Шизофрения',
            'Биполярное расстройство', 'Расстройство привязанности',
            'Посттравматическое стрессовое расстройство', 'Фобии', 'Селективный мутизм'
        ],
        'Детский уролог-андролог': [
            'Здоров', 'Фимоз', 'Варикоцеле', 'Крипторхизм', 'Гидроцеле',
            'Гипоспадия', 'Эписпадия', 'Баланопостит', 'Пиелонефрит',
            'Инфекция мочевыводящих путей', 'Мочекаменная болезнь', 'Энурез',
            'Гидронефроз', 'Орхит', 'Везикоуретеральный рефлюкс', 'Нефроптоз',
            'Синдром "острой мошонки"', 'Уретероцеле'
        ],
        'Акушер-гинеколог': [
            'Здорова', 'Нарушение менструального цикла', 'Дисменорея', 'Вульвовагинит',
            'Задержка полового развития', 'Преждевременное половое развитие',
            'Синдром поликистозных яичников', 'Аномалии развития половых органов',
            'Мастопатия', 'Дисфункция яичников', 'Аменорея', 'Олигоменорея',
            'Гиперандрогения', 'Киста яичника', 'Эндометриоз', 'Дисгенезия гонад',
            'Вульводиния', 'Синехии малых половых губ'
        ],
        'Детский эндокринолог': [
            'Здоров', 'Ожирение', 'Задержка роста', 'Сахарный диабет 1 типа',
            'Гипотиреоз', 'Диффузный зоб', 'Аутоиммунный тиреоидит',
            'Преждевременное половое развитие', 'Задержка полового развития',
            'Гипопаратиреоз', 'Несахарный диабет', 'Адреногенитальный синдром',
            'Гипертиреоз', 'Узловой зоб', 'Гипогонадизм', 'Гиперпролактинемия',
            'Синдром Кушинга', 'Акромегалия'
        ],
        'Психиатр подростковый': [
            'Здоров', 'Депрессивное расстройство', 'Тревожное расстройство',
            'Биполярное аффективное расстройство', 'Шизофрения',
            'Расстройства пищевого поведения', 'Обсессивно-компульсивное расстройство',
            'Посттравматическое стрессовое расстройство', 'Расстройства личности',
            'Аддиктивное поведение', 'Суицидальное поведение', 'Социальная фобия',
            'Паническое расстройство', 'Генерализованное тревожное расстройство',
            'Дисморфофобия', 'Нервная анорексия', 'Нервная булимия'
        ]
    },

    init(container, childInfo) {
        this.container = container;
        this.childInfo = childInfo;
        this.loadCheckups();
        this.render();
        this.setupEventListeners();
    },
    
    loadCheckups() {
        const savedCheckups = localStorage.getItem('checkups');
        if (savedCheckups) {
            this.checkups = JSON.parse(savedCheckups);
        }
    },
    
    saveCheckups() {
        localStorage.setItem('checkups', JSON.stringify(this.checkups));
    },
    
    render() {
        this.container.innerHTML = `
            <div class="checkup-container">
                <h2 class="checkup-title">Профилактические осмотры</h2>
                <button id="add-new-checkup" class="btn btn-primary">Добавить новый осмотр</button>
                <div id="checkups-list" class="checkups-list"></div>
            </div>
        `;
        this.renderCheckups();
    },
    
    renderCheckups() {
        const checkupsList = document.getElementById('checkups-list');
        checkupsList.innerHTML = '';
    
        if (this.checkups.length === 0) {
            checkupsList.innerHTML = '<p class="no-checkups">Нет сохраненных осмотров.</p>';
            return;
        }
    
        this.checkups.sort((a, b) => new Date(b.date) - new Date(a.date));
    
        this.checkups.forEach((checkup, index) => {
            const checkupCard = this.createCheckupCard(checkup, index);
            checkupsList.appendChild(checkupCard);
        });
    },
    
    createCheckupCard(checkup, index) {
        const card = document.createElement('div');
        card.className = 'checkup-card';
        card.innerHTML = `
            <div class="checkup-card-header">
                <h3 class="checkup-date">${new Date(checkup.date).toLocaleDateString()}</h3>
                <span class="checkup-age-group">${checkup.ageGroup}</span>
            </div>
            <div class="checkup-card-body">
                <button class="btn btn-secondary btn-toggle" data-index="${index}">Показать детали</button>
                <div class="checkup-details" style="display: none;">
                    <h4>Специалисты:</h4>
                    <ul class="specialists-list">
                        ${checkup.specialists.map(specialist => `
                            <li>
                                <strong>${specialist.name}:</strong> 
                                ${specialist.conclusion}
                            </li>
                        `).join('')}
                    </ul>
                    <h4>Обследования:</h4>
                    <ul class="tests-list">
                        ${checkup.tests.map(test => `
                            <li>
                                <strong>${test.name}:</strong> 
                                ${test.result}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <div class="checkup-card-footer">
                <button class="btn btn-edit" data-index="${index}">Редактировать</button>
                <button class="btn btn-delete" data-index="${index}">Удалить</button>
                <button class="btn btn-export" data-index="${index}">Экспорт PDF</button>
            </div>
        `;
        return card;
    },
    
    setupEventListeners() {
        document.getElementById('add-new-checkup').addEventListener('click', () => this.showCheckupModal());
    
        document.getElementById('checkups-list').addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('btn-toggle')) {
                this.toggleCheckupDetails(e.target);
            } else if (e.target.classList.contains('btn-edit')) {
                this.showCheckupModal(index);
            } else if (e.target.classList.contains('btn-delete')) {
                this.deleteCheckup(index);
            } else if (e.target.classList.contains('btn-export')) {
                this.exportToPDF(index);
            }
        });
    },
    
    toggleCheckupDetails(button) {
        const details = button.nextElementSibling;
        if (details.style.display === 'none') {
            details.style.display = 'block';
            button.textContent = 'Скрыть детали';
        } else {
            details.style.display = 'none';
            button.textContent = 'Показать детали';
        }
    },
    
    showCheckupModal(index = null) {
        const checkup = index !== null ? this.checkups[index] : null;
        const modalTitle = checkup ? 'Редактировать осмотр' : 'Добавить новый осмотр';
        const ageGroup = checkup ? checkup.ageGroup : this.getAgeGroup();
        const { specialists, tests } = this.checkupSchedule[ageGroup];
    
        let formHtml = `
            <form id="checkup-form" class="checkup-form">
                <div class="form-group">
                    <label for="checkup-date">Дата осмотра:</label>
                    <input type="date" id="checkup-date" required value="${checkup ? checkup.date : ''}">
                </div>
                <div class="form-group">
                    <label for="age-group">Возрастная группа:</label>
                    <select id="age-group" required>
                        ${Object.keys(this.checkupSchedule).map(group => 
                            `<option value="${group}" ${ageGroup === group ? 'selected' : ''}>${group} (${this.checkupSchedule[group].ageRange})</option>`
                        ).join('')}
                    </select>
                </div>
                <div id="specialists-container">
                    <h4>Специалисты:</h4>
                    ${this.renderSpecialists(specialists, checkup)}
                </div>
                <div id="tests-container">
                    <h4>Обследования:</h4>
                    ${this.renderTests(tests, checkup)}
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">${checkup ? 'Сохранить' : 'Добавить'}</button>
                </div>
            </form>
        `;
    
        Utils.showModal(modalTitle, formHtml);
    
        document.getElementById('age-group').addEventListener('change', (e) => {
            const newAgeGroup = e.target.value;
            const { specialists: newSpecialists, tests: newTests } = this.checkupSchedule[newAgeGroup];
            document.getElementById('specialists-container').innerHTML = `
                <h4>Специалисты:</h4>
                ${this.renderSpecialists(newSpecialists)}
            `;
            document.getElementById('tests-container').innerHTML = `
                <h4>Обследования:</h4>
                ${this.renderTests(newTests)}
            `;
        });
    
        document.getElementById('checkup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.collectFormData();
            if (checkup) {
                this.updateCheckup(index, formData);
            } else {
                this.addCheckup(formData);
            }
            Utils.closeModal();
            this.renderCheckups();
        });
    },
    
    renderSpecialists(specialists, checkup = null) {
        return specialists.map(specialist => {
            const specialistData = checkup ? checkup.specialists.find(s => s.name === specialist) : null;
            return `
                <div class="form-group specialist-group">
                    <label for="specialist-${specialist}">${specialist}:</label>
                    <select id="specialist-${specialist}" required>
                        ${this.commonDiagnoses[specialist].map(diagnosis => 
                            `<option value="${diagnosis}" ${specialistData && specialistData.conclusion === diagnosis ? 'selected' : ''}>${diagnosis}</option>`
                        ).join('')}
                        <option value="custom">Другой диагноз</option>
                    </select>
                    <input type="text" id="specialist-${specialist}-custom" class="custom-diagnosis" style="display: none;" placeholder="Введите диагноз">
                </div>
            `;
        }).join('');
    },
    
    renderTests(tests, checkup = null) {
        return tests.map(test => {
            const testData = checkup ? checkup.tests.find(t => t.name === test) : null;
            return `
                <div class="form-group">
                    <label for="test-${test}">${test}:</label>
                    <input type="text" id="test-${test}" value="${testData ? testData.result : ''}">
                </div>
            `;
        }).join('');
    },
    
    collectFormData() {
        const ageGroup = document.getElementById('age-group').value;
        const { specialists, tests } = this.checkupSchedule[ageGroup];
        return {
            date: document.getElementById('checkup-date').value,
            ageGroup: ageGroup,
            specialists: specialists.map(specialist => ({
                name: specialist,
                conclusion: document.getElementById(`specialist-${specialist}`).value === 'custom' 
                    ? document.getElementById(`specialist-${specialist}-custom`).value 
                    : document.getElementById(`specialist-${specialist}`).value
            })),
            tests: tests.map(test => ({
                name: test,
                result: document.getElementById(`test-${test}`).value
            }))
        };
    },
    
    addCheckup(checkupData) {
        this.checkups.push(checkupData);
        this.saveCheckups();
        Utils.showNotification('Осмотр успешно добавлен', 'success');
    },
    
    updateCheckup(index, checkupData) {
        this.checkups[index] = checkupData;
        this.saveCheckups();
        Utils.showNotification('Осмотр успешно обновлен', 'success');
    },
    
    deleteCheckup(index) {
        Utils.showModal('Подтверждение удаления', `
            <p>Вы уверены, что хотите удалить этот осмотр?</p>
            <div class="modal-actions">
                <button id="confirm-delete" class="btn btn-danger">Удалить</button>
                <button id="cancel-delete" class="btn btn-secondary">Отмена</button>
            </div>
        `);
    
        document.getElementById('confirm-delete').addEventListener('click', () => {
            this.checkups.splice(index, 1);
            this.saveCheckups();
            this.renderCheckups();
            Utils.closeModal();
            Utils.showNotification('Осмотр удален', 'warning');
        });
    
        document.getElementById('cancel-delete').addEventListener('click', () => {
            Utils.closeModal();
        });
    },
    
    getAgeGroup() {
        const birthDate = new Date(this.childInfo.birthdate);
        const today = new Date();
        const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
        
        if (ageInMonths < 1) return 'Новорожденный';
        if (ageInMonths === 1) return '1 месяц';
        if (ageInMonths === 2) return '2 месяца';
        if (ageInMonths === 3) return '3 месяца';
        if (ageInMonths >= 4 && ageInMonths < 12) return '4-11 месяцев';
        if (ageInMonths === 12) return '12 месяцев';
        if (ageInMonths >= 24 && ageInMonths < 36) return '2 года';
        if (ageInMonths >= 36 && ageInMonths < 48) return '3 года';
        if (ageInMonths >= 48 && ageInMonths < 72) return '4-5 лет';
        if (ageInMonths === 72) return '6 лет';
        if (ageInMonths === 84) return '7 лет';
        if (ageInMonths === 120) return '10 лет';
        if (ageInMonths === 168) return '14 лет';
        if (ageInMonths >= 180) return '15-17 лет';
        return '4-5 лет'; // Если не попадает ни в одну группу, возвращаем наиболее общую
    },
    
    exportToPDF(index) {
        const checkup = this.checkups[index];
        const docDefinition = {
            content: [
                { text: 'Результаты профилактического осмотра', style: 'header' },
                { text: `Дата осмотра: ${new Date(checkup.date).toLocaleDateString()}`, style: 'subheader' },
                { text: `Возрастная группа: ${checkup.ageGroup}`, style: 'subheader' },
                { text: 'Заключения специалистов:', style: 'subheader' },
                ...checkup.specialists.map(specialist => [
                    { text: specialist.name, style: 'specialistName' },
                    { text: specialist.conclusion, style: 'specialistConclusion' }
                ]).flat(),
                { text: 'Результаты обследований:', style: 'subheader' },
                ...checkup.tests.map(test => [
                    { text: test.name, style: 'testName' },
                    { text: test.result, style: 'testResult' }
                ]).flat()
            ],
            styles: {
                header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
                subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
                specialistName: { fontSize: 12, bold: true, margin: [0, 5, 0, 0] },
                specialistConclusion: { fontSize: 10, margin: [0, 0, 0, 10] },
                testName: { fontSize: 12, bold: true, margin: [0, 5, 0, 0] },
                testResult: { fontSize: 10, margin: [0, 0, 0, 10] }
            }
        };
    
        pdfMake.createPdf(docDefinition).download(`Профосмотр_${checkup.date}.pdf`);
    }
}