const vacanciesData = [
            {id:1, title:'Frontend разработчик', salary:'1500 - 2500 $', company:'ТехноКомпания', location:'Минск', tags:['React','TypeScript','CSS'], category:'it'},
            {id:2, title:'Backend разработчик', salary:'1800 - 3000 $', company:'Цифровые решения', location:'Гомель', tags:['Node.js','PostgreSQL','Docker'], category:'it'},
            {id:3, title:'UX/UI дизайнер', salary:'1200 - 2000 $', company:'Креативная студия', location:'Минск', tags:['Figma','Adobe XD','Prototyping'], category:'design'},
            {id:4, title:'Product Manager', salary:'2000 - 3500 $', company:'StartUp Inc', location:'Удаленно', tags:['Agile','Jira','Analytics'], category:'management'},
            {id:5, title:'DevOps инженер', salary:'1600 - 2800 $', company:'CloudTech', location:'Брест', tags:['Kubernetes','AWS','CI/CD'], category:'it'},
            {id:6, title:'Маркетолог', salary:'800 - 1500 $', company:'МаркетПрог', location:'Витебск', tags:['SEO','SMM','Google Analytics'], category:'marketing'}
        ];
        
        const grid = document.getElementById('vacanciesGrid');
        const countSpan = document.getElementById('vacanciesCount');
        
        function render(vacancies) {
            if (vacancies.length === 0) {
                grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;"><i class="fas fa-search" style="font-size:48px;color:#9ca3af;"></i><h3 style="margin-top:16px;">Вакансии не найдены</h3><p style="color:#6b7280;">Попробуйте изменить параметры фильтрации</p></div>`;
                countSpan.innerHTML = `<i class="fas fa-briefcase"></i> Найдено: 0 вакансий`;
                return;
            }
            
            // ПРОСТАЯ ССЫЛКА - БЕЗ ЛИШНИХ ПАПОК
            grid.innerHTML = vacancies.map(v => `
                <a href="vacancy-${v.id}.html" class="vacancy-card" style="text-decoration: none; display: block; color: inherit;">
                    <div class="vacancy-header">
                        <div class="vacancy-title">${v.title}</div>
                        <div class="vacancy-salary">${v.salary}</div>
                    </div>
                    <div class="vacancy-company"><i class="fas fa-building"></i> ${v.company}</div>
                    <div class="vacancy-location"><i class="fas fa-map-marker-alt"></i> ${v.location}</div>
                    <div class="vacancy-tags">${v.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                </a>
            `).join('');
            
            countSpan.innerHTML = `<i class="fas fa-briefcase"></i> Найдено: ${vacancies.length} вакансий`;
        }
        
        function filter() {
            let cat = document.getElementById('filterCategory').value;
            let reg = document.getElementById('filterRegion').value;
            let filtered = vacanciesData.filter(v => (!cat || v.category === cat) && (!reg || v.location.includes(reg)));
            render(filtered);
        }
        
        document.getElementById('applyFilters').onclick = filter;
        document.getElementById('resetFilters').onclick = () => { 
            document.getElementById('filterCategory').value = ''; 
            document.getElementById('filterRegion').value = ''; 
            render(vacanciesData); 
        };
        
        render(vacanciesData);