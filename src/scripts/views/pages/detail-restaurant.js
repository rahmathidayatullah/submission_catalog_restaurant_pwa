import TheRestaurantDbSource from '../../data/restaurant-api';
import UrlParser from '../../routes/url-parser';
import {
  createMovieDetailTemplate, createDetailListFoods, createDetailListDrinks, createDetailListReviews,
} from '../templates/template-creator';

const DetailRestaurant = {
  async render() {
    return `
          <div id="restaurant" class="restaurant"></div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createMovieDetailTemplate(restaurant);
    //
    const foodContainer = document.querySelector('#foods');
    restaurant.menus.foods.forEach((food) => {
      foodContainer.innerHTML += createDetailListFoods(food);
    });
    //
    const drinkContainer = document.querySelector('#drinks');
    restaurant.menus.foods.forEach((drink) => {
      drinkContainer.innerHTML += createDetailListDrinks(drink);
    });
    //
    const reviewContainer = document.querySelector('#reviews');
    restaurant.customerReviews.forEach((review) => {
      reviewContainer.innerHTML += createDetailListReviews(review);
    });
  },
};

export default DetailRestaurant;
