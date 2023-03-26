import TheRestaurantDbSource from '../../data/restaurant-api';
import UrlParser from '../../routes/url-parser';
import {
  createMovieDetailTemplate, createDetailListFoods, createDetailListDrinks, createDetailListReviews,
} from '../templates/template-creator';

const DetailRestaurant = {
  async render() {
    return `
          <div id="movie" class="movie"></div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheRestaurantDbSource.detailRestaurant(url.id);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createMovieDetailTemplate(movie);
    //
    const foodContainer = document.querySelector('#foods');
    movie.menus.foods.forEach((food) => {
      foodContainer.innerHTML += createDetailListFoods(food);
    });
    //
    const drinkContainer = document.querySelector('#drinks');
    movie.menus.foods.forEach((drink) => {
      drinkContainer.innerHTML += createDetailListDrinks(drink);
    });
    //
    const reviewContainer = document.querySelector('#reviews');
    movie.customerReviews.forEach((review) => {
      reviewContainer.innerHTML += createDetailListReviews(review);
    });
  },
};

export default DetailRestaurant;
