import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('select.breed-select');
const catInfoDiv = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catEl = document.querySelector('.cat');

function hideLoader() {
    return (loader.style.display = 'none', catInfoDiv.style.display = 'block');
}
function Loader() {
    return (loader.style.display = 'block', catInfoDiv.style.display = 'none')
}
function vad() {
    return breedSelect.style.display = 'block';
}
function populateBreedSelect(breeds) {
    breedSelect.innerHTML = breeds
        .map(breed => `<option value="${breed.id}" >${breed.name}</option>`)
        .join('');
}
function showCatInfo(cat) {
    const { name, description, temperament } = cat[0].breeds[0];

    const catInfoHTML = `<div class="cat">
   <img loading="eager" class="img-cat " src="${cat[0].url}" alt="Cat Image"> 
    <div class="cat-conteiner">
    <h2>${name}</h2>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
     </div>
  `;

    catInfoDiv.innerHTML = catInfoHTML;
}

function handleBreedSelect(event) {
    Loader();
    setTimeout(() => {
        const breedId = event.target.value;
        fetchCatByBreed(breedId)
            .then(cat => {
                showCatInfo(cat);
                hideLoader();
            })
            .catch(() => {
                showError();
            });
    }, 1000);
}

function showError() {
    Notiflix.Notify.failure('Loading data, please wait...');
}
function init() {
    fetchBreeds()
        .then(breeds => {
            populateBreedSelect(breeds);
            vad();
            breedSelect.addEventListener('change', handleBreedSelect);
            hideLoader();
        })
        .catch(() => {
            showError();
        });
}

init();