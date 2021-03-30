const title = document.querySelector('h1');
const ost = document.querySelector('.ost');
const buttonsWrapper = document.querySelector('.buttons__wrapper');
const articlesWrapper = document.querySelector('.articles__wrapper');
const getInformationBut = document.querySelector('.get__information');
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
        nextBut.classList.remove('invisible');
        resetBut.classList.remove('invisible');
    });

});

nextBut.addEventListener('click', function() {
    ost.play();
    nextBut.disabled = true;
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