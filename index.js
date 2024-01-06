function openMenu() {
  document.body.classList += " menu--open"
  }
  
  function closeMenu() {
  document.body.classList.remove('menu--open')
  }

const filmsListEl = document.querySelector(".films-list");
const loadingIndicatorEl = document.getElementById("loadingIndicator");

async function onSearchChange(event) {
  const title = event.target.value;
  renderFilms(title);
}

async function renderFilms(title = "Fast") {
  showLoadingIndicator();
  showSkeletonState();
  const films = await fetch(
    `https://www.omdbapi.com/?s=${title}&apikey=7f137b53`
  );
  const filmsData = await films.json();
  const limitedFilms = filmsData.Search.slice(0, 6);
  hideLoadingIndicator();
  hideSkeletonState();
  filmsListEl.innerHTML = limitedFilms.map((film) => filmsHTML(film)).join(
    ""
  );
}


function filmsHTML(film) {
  return `
    <div class="film">
              <figure class="film__img--wrapper">
                <img
                  class="film__img"
                  src="${film.Poster}"
                  alt=""
                />
              </figure>
              <div class="films__title">${film.Title}</div>
              <p class="films__body">Year: ${film.Year}</p>
            </div>
  `;
}

function showLoadingIndicator() {
  loadingIndicatorEl.style.display = "block";
}

function hideLoadingIndicator() {
  loadingIndicatorEl.style.display = "none";
}

function showSkeletonState() {
  const skeletonElements = Array.from({ length: 6 }, (_, index) => `<li class="skeleton" key=${index}></li>`);
  filmsListEl.innerHTML = skeletonElements.join("");
}

function hideSkeletonState() {
  filmsListEl.innerHTML = "";
}

function onFormSubmit(event) {

  event.preventDefault();

  const input = event.target.querySelector("input");
  const title = input.value;
  renderFilms(title);
}

renderFilms();

function redirectToPage() {
  window.open("https://cameronwarburton.github.io/Advance-E-Portfolio/", "_blank");
}