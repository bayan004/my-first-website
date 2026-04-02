async function loadGitHubProjects() {
    const grid = document.getElementById('projects-grid');

    try {
        const response = await fetch('https://api.github.com/users/bayan004/repos?sort=updated&per_page=20');
        if (!response.ok) throw new Error('Failed to fetch');
        const repos = await response.json();

        const filtered = repos.filter(repo => !repo.fork);

        grid.innerHTML = '';

        filtered.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const lang = repo.language
                ? `<span class="proj-lang">${repo.language}</span>`
                : '';

            card.innerHTML = `
                <div class="proj-top">
                    <h3 class="proj-name">${repo.name.replace(/-/g, ' ')}</h3>
                    ${lang}
                </div>
                <p class="proj-desc">${repo.description || 'No description provided.'}</p>
                <a class="proj-link" href="${repo.html_url}" target="_blank">View on GitHub →</a>
            `;

            grid.appendChild(card);
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<p id="projects-loading">No projects found.</p>';
        }

    } catch (error) {
        grid.innerHTML = '<p id="projects-loading">Could not load projects. Check your connection.</p>';
    }
}

loadGitHubProjects();
