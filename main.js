const title = document.querySelector('h1');
const ost = document.querySelector('.ost');
const buttonsWrapper = document.querySelector('.buttons__wrapper');
const articlesWrapper = document.querySelector('.articles__wrapper');
const getInformationBut = document.querySelector('.get__information');
const getPlanetsBut = document.querySelector('.get__planets');
const nextBut = document.querySelector('.next');
const resetBut = document.querySelector('.reset');

getInformationBut.addEventListener('click', function() {
    ost.play();
    getInformationBut.disabled = true;

    async function getCharacters() {
        const filmsData = await axios.get("https://swapi.dev/api/films/2/");
        const charactersList = filmsData.data.characters;
        const charactersData = {};

        for (let i = 0; i < charactersList.length; i++) {
            const data = await axios.get(`${charactersList[i]}`);
            charactersData[i] = {
                name: data.data.name,
                birth_year: data.data.birth_year,
                gender: data.data.gender,
            };

            articlesWrapper.insertAdjacentHTML('beforeend', `
                <article class="character">
                    <img class="character__photo" src="assets/images/photos/${(charactersData[i].name).replace(' ', '_').toLowerCase()}.jpg" alt="character photo">
                    <div class="character__data">
                        <p class="character__name"><span>Name:</span> ${charactersData[i].name}</p>
                        <p class="character__birth-year"><span>Birth year:</span> ${charactersData[i].birth_year}</p>
                        <p class="character__gender"><span>Gender:</span> ${charactersData[i].gender}</p>
                    </div>
                </article>
            `);

        };

        return charactersData;
    };

    getCharacters().then(() => {
        title.classList.add('invisible');
        articlesWrapper.classList.remove('invisible');
        getPlanetsBut.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    }).catch(() => {
        articlesWrapper.insertAdjacentHTML('beforeend', `
        <article class="character error">
            <img class="character__photo" src="assets/images/error.jpg" alt="error">
            <div class="character__data">error</div>
        </article>
        `);
        title.classList.add('invisible');
        articlesWrapper.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    });

});

getPlanetsBut.addEventListener('click', function() {
    ost.play();
    getInformationBut.disabled = false;
    getPlanetsBut.disabled = true;
    nextBut.disabled = false;
    articlesWrapper.innerHTML = '';

    let planetsNames = [];

    axios.get("https://swapi.dev/api/planets/")
        .then((res) => {
            const planetsData = res.data.results;
            planetsNames = planetsData.map((planet) => planet.name);
        }).then(() => {
            articlesWrapper.insertAdjacentHTML('beforeend', `
                <article class="planet">
                    <img class="planet__photo" src="assets/images/planets/${(planetsNames[0]).replace(' ', '_').toLowerCase()}.jpg" alt="planet photo">                    
                    <p class="planet__name">${planetsNames[0]}</p>
                </article>
            `);
            nextBut.classList.remove('invisible');
        }).then(() => {
            let i = 1;
            let n = 1;
            nextBut.addEventListener('click', function() {
                articlesWrapper.innerHTML = '';

                articlesWrapper.insertAdjacentHTML('beforeend', `
                    <article class="planet">
                        <img class="planet__photo" src="assets/images/planets/${(planetsNames[i]).replace(' ', '_').toLowerCase()}.jpg" alt="planet photo">                    
                        <p class="planet__name">${planetsNames[i]}</p>
                    </article>
                `);
                n += 1;
                if (n > (planetsNames.length - 1)) {
                    nextBut.disabled = true;
                    getPlanetsBut.disabled = false;
                };
                return i++;
            });
        }).catch(() => {
            articlesWrapper.insertAdjacentHTML('beforeend', `
            <article class="character error">
                <img class="character__photo" src="assets/images/error.jpg" alt="error">
                <div class="character__data">error</div>
            </article>
            `);
            title.classList.add('invisible');
            articlesWrapper.classList.remove('invisible');
            resetBut.classList.remove('invisible');
        });
});


resetBut.addEventListener('click', function() {
    document.location.reload()
});


/* preloader */

window.onload = function() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

/* preloader end */