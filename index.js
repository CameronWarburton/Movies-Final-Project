const filmsListEl = document.querySelector('.films-list')
const title = localStorage.getItem("title")

async function onSearchChange(event) {
    const title = event.target.value
    renderFilms(title)
}

async function renderFilms(title) {
    const films = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=7f137b53`);
    const filmsData = await films.json();
    console.log(filmsData)
}

function filmsHTML (films) {
    return `
    <div class="films">
    <div class="films__title">
      ${films.title}
    </div>
    <p class="films__body">
      ${films.year}
    </p>
  </div>
  `
}

renderFilms(title)