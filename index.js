function openMenu() {
  document.body.classList += " menu--open"
  }
  
  function closeMenu() {
  document.body.classList.remove('menu--open')
  }

const filmsListEl = document.querySelector(".films-list");

async function onSearchChange(event) {
  const title = event.target.value;
  renderFilms(title);
}

async function renderFilms(title = "Fast") {
  const films = await fetch(
    `http://www.omdbapi.com/?s=${title}&apikey=7f137b53`
  );
  const filmsData = await films.json();
  const limitedFilms = filmsData.Search.slice(0, 6);
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

renderFilms();

function redirectToPage() {
  window.open("https://cameronwarburton.github.io/Advance-E-Portfolio/", "_blank");
}