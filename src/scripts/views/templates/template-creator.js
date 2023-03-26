/* eslint-disable max-len */
import CONFIG from '../../globals/config';

const createMovieDetailTemplate = (restaurant) => `
    <h2 class="movie__title">${restaurant.name}</h2>
    <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL_MEDIUM}/${restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="movie__info">
      <h3>Information</h3>
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <h4>Rating</h4>
      <p>${restaurant.rating}</p>
    </div>
    <div class="movie__overview">
      <h3>Menu Foods</h3>
      <div class="foods" id="foods">
      </div>
    </div>
    <hr />
    <div class="movie__overview">
      <h3>Menu Drinks</h3>
      <div class="drinks" id="drinks">
    </div>
    <hr />
      <div class="movie__overview">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </div>
      <div class="movie__overview">
        <h3>Customer Reviews</h3>
      </div>
      <div class="reviews" id="reviews">
      </div>
  `;

const createDetailListFoods = (food) => `<span class="food_item">${food.name}</span>`;
const createDetailListDrinks = (drink) => `<span class="drink_item">${drink.name}</span>`;
const createDetailListReviews = (reviews) => `
<div class="review-item"><h3>${reviews.name}</h3>
  <p>${reviews.review}</p>
  <p>${reviews.date}</p>
</div>`;

const createMovieItemTemplate = (restaurant) => `
  <div class="movie-item">
    <div class="movie-item__header">
      <img class="movie-item__header__poster" alt="${restaurant.name}"
           src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL_MEDIUM}/${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="movie-item__header__rating">
        <p>⭐️<span class="movie-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="movie-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;
export {
  createMovieItemTemplate, createMovieDetailTemplate, createDetailListFoods, createDetailListDrinks, createDetailListReviews,
};
