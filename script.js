document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            const container = document.getElementById('flags-container');
            const modal = document.getElementById('flag-modal');
            const modalContent = document.getElementById('flag-modal-content');
            const searchBar = document.getElementById('search-bar');
            const noResults = document.getElementById('no-results');

            let filteredCountries = countries;

            function showModal(flagImageSrc, flagName) {
                modalContent.innerHTML = `
                    <span id="flag-modal-close">&times;</span>
                    <img src="${flagImageSrc}" alt="${flagName}">
                    <h3>${flagName}</h3>
                `;
                modal.style.display = 'flex';

                const modalClose = document.getElementById('flag-modal-close');
                modalClose.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            function handleFlagCardClick(event) {
                const flagImageSrc = event.currentTarget.querySelector('img').src;
                const flagName = event.currentTarget.querySelector('h3').textContent;
                showModal(flagImageSrc, flagName);
            }

            function updateFlags() {
                container.innerHTML = '';
                if (filteredCountries.length === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                    filteredCountries.forEach(country => {
                        const flagCard = document.createElement('div');
                        flagCard.className = 'flag-card';
                        flagCard.addEventListener('click', handleFlagCardClick);

                        const flagImage = document.createElement('img');
                        flagImage.src = country.flag;
                        flagImage.alt = `Drapeau de ${country.name}`;

                        const flagName = document.createElement('h3');
                        flagName.textContent = country.name;

                        flagCard.appendChild(flagImage);
                        flagCard.appendChild(flagName);

                        container.appendChild(flagCard);
                    });
                }
            }

            searchBar.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                filteredCountries = countries.filter(country => country.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query));
                updateFlags();
            });

            updateFlags();

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
});
