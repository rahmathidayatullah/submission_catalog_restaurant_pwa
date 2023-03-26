/* eslint-disable max-len */
import TheRestaurantDbSource from '../../data/restaurant-api';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import {
  createRestaurantDetailTemplate, createDetailListFoods, createDetailListDrinks, createDetailListReviews, createLikeButtonTemplate,
} from '../templates/template-creator';

const DetailRestaurant = {
  async render() {
    return `
          <div id="restaurant" class="restaurant"></div>
          <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    //
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
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
    // like btn
    const likeButtonContainer = document.querySelector('#likeButtonContainer');

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    likeButtonContainer.innerHTML = createLikeButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
      },
    });
  },
};

export default DetailRestaurant;
