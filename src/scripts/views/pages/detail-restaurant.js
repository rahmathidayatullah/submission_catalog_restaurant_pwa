/* eslint-disable no-alert */
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
          <div class="loading" id="loading">
          </div>
          <div id="restaurant" class="restaurant"></div>
          <div id="likeButtonContainer"></div>
        `;
  },

  async insertReview(dataReview) {
    try {
      alert('Success add reviews');
      await TheRestaurantDbSource.addReviewRestaurant(dataReview);
      this.afterRender();
    } catch (error) {
      alert(error);
    }
  },

  async afterRender() {
    const loader = document.querySelector('#loading');
    loader.classList.add('display');

    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    await TheRestaurantDbSource.detailRestaurant(url.id).then((restaurant) => {
      //
      const restaurantContainer = document.querySelector('#restaurant');
      // insert id food, drink and reivew and another element
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      // read element food, drink, review and other
      const foodContainer = document.querySelector('#foods');
      const drinkContainer = document.querySelector('#drinks');
      const reviewContainer = document.querySelector('#reviews');
      // form input
      const inputName = document.querySelector('#inputName');
      const inputReview = document.querySelector('#inputReview');
      const buttonSave = document.querySelector('#buttonSave');
      // btn submit form
      buttonSave.addEventListener('click', async () => {
        const dataReview = {
          id: url.id,
          name: inputName.value,
          review: inputReview.value,
        };
        this.insertReview(dataReview);
      });
      restaurant.menus.foods.forEach((food) => {
        foodContainer.innerHTML += createDetailListFoods(food);
      });
      restaurant.menus.foods.forEach((drink) => {
        drinkContainer.innerHTML += createDetailListDrinks(drink);
      });
      restaurant.customerReviews.forEach((review) => {
        reviewContainer.innerHTML += createDetailListReviews(review);
      });
      // like btn
      const likeButtonContainer = document.querySelector('#likeButtonContainer');
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
    }).catch(() => {
      alert('Gagal get data detail catalog');
    }).finally(() => {
      loader.classList.remove('display');
    });
  },
};

export default DetailRestaurant;
