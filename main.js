const title = document.querySelector('h1');
const ost = document.querySelector('.ost');
const buttonsWrapper = document.querySelector('.buttons__wrapper');
const infoWrapper = document.querySelector('.info__wrapper');
const getInformationBut = document.querySelector('.get__information');
const getPlanetsBut = document.querySelector('.get__planets');
const nextBut = document.querySelector('.next');
const resetBut = document.querySelector('.reset');


async function getCharacters() {
    const filmsData = await axios.get("https://swapi.dev/api/films/2/");
    const charactersList = filmsData.data.characters;        
    const charactersData = {};

    for (let i = 0; i < charactersList.length; i++) {
        const data = await axios.get(`${(charactersList[i].replace('http', 'https'))}`);
        charactersData[i] = {
            name: data.data.name,
            birth_year: data.data.birth_year,
            gender: data.data.gender,
        };

        infoWrapper.insertAdjacentHTML('beforeend', `
            <div class="character">
                <img class="character__photo" src="assets/images/photos/${(charactersData[i].name).replace(' ', '_').toLowerCase()}.jpg" alt="character photo">
                <div class="character__data">
                    <p class="character__name"><span>Name:</span> ${charactersData[i].name}</p>
                    <p class="character__birth-year"><span>Birth year:</span> ${charactersData[i].birth_year}</p>
                    <p class="character__gender"><span>Gender:</span> ${charactersData[i].gender}</p>
                </div>
            </div>
        `);

    };
};

getInformationBut.addEventListener('click', function() {
    ost.play();
    getInformationBut.disabled = true;
    infoWrapper.innerHTML = '';
    getPlanetsBut.disabled = false;

    getCharacters().then(() => {
        title.classList.add('invisible');
        infoWrapper.classList.remove('invisible');
        getPlanetsBut.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    }).catch(() => {
        infoWrapper.insertAdjacentHTML('beforeend', `
        <div class="character error">
            <img class="character__photo" src="assets/images/error.jpg" alt="error">
            <div class="character__data">error</div>
        </div>
        `);
        title.classList.add('invisible');
        infoWrapper.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    });

});

let currentPlanetPage = 1;
function getListOfPlanet () {
    let planetsNames = [];
    axios.get(`https://swapi.dev/api/planets/?page=${currentPlanetPage}`)
    .then((res) => {
        const planetsData = res.data.results;
        planetsNames = planetsData.map((planet) => planet.name);        
    
        for (let i = 0; i < planetsNames.length; i++) {
            infoWrapper.insertAdjacentHTML('beforeend', `
                <div class="planet">
                    <img class="planet__photo" src="assets/images/planet_icon.png" alt="planet photo">                    
                    <p class="planet__name">${planetsNames[i]}</p>
                </div>
            `);                
        };
    }).catch(() => {
        infoWrapper.insertAdjacentHTML('beforeend', `
        <div class="character error">
            <img class="character__photo" src="assets/images/error.jpg" alt="error">
            <div class="character__data">error</div>
        </div>
        `);
        title.classList.add('invisible');
        infoWrapper.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    });
}

getPlanetsBut.addEventListener('click', function() {
    ost.play();
    getPlanetsBut.disabled = true;
    nextBut.disabled = false;
    getInformationBut.disabled = false;
    infoWrapper.innerHTML = '';
    getListOfPlanet();
    nextBut.classList.remove('invisible');
});

nextBut.addEventListener('click', function() {    
    infoWrapper.innerHTML = '';
    currentPlanetPage++;
    getListOfPlanet();    

    if (currentPlanetPage > 5) {
        getPlanetsBut.disabled = false;
        nextBut.disabled = true;
        currentPlanetPage = 1;
    };
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