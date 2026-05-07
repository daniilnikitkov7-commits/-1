 const candidatesData = [
            {id:1, name:'Анна Ковалева', spec:'Frontend Developer', specKey:'frontend', exp:3, location:'Минск', salary:'2500 BYN', tags:['React','TypeScript','CSS']},
            {id:2, name:'Дмитрий Волков', spec:'Java Developer', specKey:'java', exp:5, location:'Минск', salary:'3000 BYN', tags:['Java','Spring','PostgreSQL']},
            {id:3, name:'Елена Соколова', spec:'UX/UI Designer', specKey:'design', exp:4, location:'Гомель', salary:'2200 BYN', tags:['Figma','Adobe XD','UX Research']},
            {id:4, name:'Максим Андреев', spec:'Product Manager', specKey:'pm', exp:6, location:'Солигорск', salary:'3500 BYN', tags:['Agile','Scrum','Jira']},
            {id:5, name:'Ольга Новикова', spec:'Маркетолог', specKey:'marketing', exp:3, location:'Гомель', salary:'1800 BYN', tags:['SEO','SMM','Google Analytics']}
        ];
        
        const grid = document.getElementById('candidatesGrid');
        const countSpan = document.getElementById('candidatesCount');
        
        function render(candidates) {
            if (candidates.length === 0) {
                grid.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><h3>Резюме не найдены</h3><p>Попробуйте изменить параметры поиска</p></div>`;
                countSpan.innerHTML = `<i class="fas fa-users"></i> Найдено: 0 резюме`;
                return;
            }
            
            grid.innerHTML = candidates.map(c => `
                <div class="candidate-card" onclick="location.href='candidate-${c.id}.html'">
                    <div class="candidate-avatar-small"><i class="fas fa-user-circle"></i></div>
                    <div class="candidate-info">
                        <h3>${c.name}</h3>
                        <div class="candidate-spec">${c.spec}</div>
                        <div class="candidate-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${c.location}</span>
                            <span><i class="fas fa-briefcase"></i> ${c.exp} года опыта</span>
                            <span>от ${c.salary}</span>
                        </div>
                        <div class="vacancy-tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    </div>
                </div>
            `).join('');
            
            countSpan.innerHTML = `<i class="fas fa-users"></i> Найдено: ${candidates.length} резюме`;
        }
        
        function filter() {
            let spec = document.getElementById('filterSpec').value;
            let exp = parseInt(document.getElementById('filterExp').value);
            let filtered = candidatesData.filter(c => (!spec || c.specKey === spec) && (!exp || c.exp >= exp));
            render(filtered);
        }
        
        document.getElementById('applyFilters').onclick = filter;
        document.getElementById('resetFilters').onclick = () => { 
            document.getElementById('filterSpec').value = ''; 
            document.getElementById('filterExp').value = ''; 
            render(candidatesData); 
        };
        
        render(candidatesData);