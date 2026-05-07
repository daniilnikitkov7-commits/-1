// ============================================
// JobService - MAIN.JS
// Только для поиска и авторизации
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- 1. МОБИЛЬНОЕ МЕНЮ ----------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            if (nav.style.display === 'flex') {
                nav.style.display = '';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'white';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                nav.style.zIndex = '99';
                nav.style.gap = '16px';
            }
        });
    }
    
    // ---------- 2. ПОИСК ВАКАНСИЙ (ТОЛЬКО ДЛЯ ГЛАВНОЙ) ----------
    const vacanciesGrid = document.getElementById('vacanciesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchKeyword = document.getElementById('searchKeyword');
    const searchRegion = document.getElementById('searchRegion');
    
    const vacanciesData = [
        { id: 1, title: 'Frontend разработчик', salary: '1500 - 2500 $', company: 'ТехноКомпания', location: 'Минск', tags: ['React', 'TypeScript', 'CSS'] },
        { id: 2, title: 'Backend разработчик', salary: '1800 - 3000 $', company: 'Цифровые решения', location: 'Гомель', tags: ['Node.js', 'PostgreSQL', 'Docker'] },
        { id: 3, title: 'UX/UI дизайнер', salary: '1200 - 2000 $', company: 'Креативная студия', location: 'Минск', tags: ['Figma', 'Adobe XD'] },
        { id: 4, title: 'Product Manager', salary: '2000 - 3500 $', company: 'StartUp Inc', location: 'Удаленно', tags: ['Agile', 'Jira'] },
        { id: 5, title: 'DevOps инженер', salary: '1600 - 2800 $', company: 'CloudTech', location: 'Брест', tags: ['Kubernetes', 'AWS'] },
        { id: 6, title: 'Маркетолог', salary: '800 - 1500 $', company: 'МаркетПрог', location: 'Витебск', tags: ['SEO', 'SMM'] }
    ];
    
    let displayedVacancies = 6;
    let currentSearch = '';
    let currentRegion = '';
    
    function renderVacancies(vacancies) {
        if (!vacanciesGrid) return;
        if (vacancies.length === 0) {
            vacanciesGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;"><i class="fas fa-search" style="font-size:48px;"></i><h3>Ничего не найдено</h3></div>';
            return;
        }
        vacanciesGrid.innerHTML = vacancies.map(v => `
            <div class="vacancy-card" onclick="location.href='pages/vacancies/vacancy-${v.id}.html'">
                <div class="vacancy-header">
                    <div class="vacancy-title">${v.title}</div>
                    <div class="vacancy-salary">${v.salary}</div>
                </div>
                <div class="vacancy-company"><i class="fas fa-building"></i> ${v.company}</div>
                <div class="vacancy-location"><i class="fas fa-map-marker-alt"></i> ${v.location}</div>
                <div class="vacancy-tags">${v.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
        `).join('');
    }
    
    function filterVacancies() {
        let filtered = [...vacanciesData];
        if (currentSearch) {
            const search = currentSearch.toLowerCase();
            filtered = filtered.filter(v => v.title.toLowerCase().includes(search) || v.company.toLowerCase().includes(search));
        }
        if (currentRegion) {
            filtered = filtered.filter(v => v.location.includes(currentRegion));
        }
        return filtered;
    }
    
    function loadVacancies() {
        const filtered = filterVacancies();
        renderVacancies(filtered.slice(0, displayedVacancies));
        if (loadMoreBtn) loadMoreBtn.style.display = displayedVacancies >= filtered.length ? 'none' : 'inline-flex';
    }
    
    function performSearch() {
        currentSearch = searchKeyword ? searchKeyword.value.trim() : '';
        currentRegion = searchRegion ? searchRegion.value : '';
        displayedVacancies = 6;
        loadVacancies();
    }
    
    function loadMore() {
        const filtered = filterVacancies();
        if (displayedVacancies < filtered.length) {
            displayedVacancies += 4;
            loadVacancies();
        }
    }
    
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchKeyword) searchKeyword?.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMore);
    
    // Категории
    document.querySelectorAll('.category-card').forEach(cat => {
        cat.addEventListener('click', () => {
            currentSearch = '';
            currentRegion = '';
            if (searchKeyword) searchKeyword.value = '';
            if (searchRegion) searchRegion.value = '';
            displayedVacancies = 6;
            loadVacancies();
        });
    });
    
    if (vacanciesGrid) loadVacancies();
    
    // ---------- 3. АВТОРИЗАЦИЯ (ТОЛЬКО ДЛЯ СТРАНИЦЫ ВХОДА) ----------
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('errorMsg');
            
            // Простая проверка без XML для скорости
            if ((email === 'ivan@mail.ru' && password === '123') || 
                (email === 'admin@jobservice.by' && password === 'admin')) {
                localStorage.setItem('savedUser', JSON.stringify({ email, name: email === 'admin@jobservice.by' ? 'Администратор' : 'Иван Петров' }));
                window.location.href = 'cabinet-dashboard.html';
            } else {
                if (errorMsg) {
                    errorMsg.textContent = 'Неверный email или пароль';
                    errorMsg.style.display = 'block';
                }
            }
        });
    }
    
    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('savedUser');
            window.location.href = '../index.html';
        };
    }
    
    // Проверка сессии для показа имени
    const savedUser = localStorage.getItem('savedUser');
    const userNameSpan = document.getElementById('userName');
    const loginBtnHeader = document.getElementById('loginBtnHeader');
    
    if (savedUser && userNameSpan) {
        const user = JSON.parse(savedUser);
        userNameSpan.style.display = 'inline';
        userNameSpan.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
        if (loginBtnHeader) loginBtnHeader.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    }
});