/* eslint-disable max-len */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<div class="restaurant__info">
<img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL_MEDIUM}/${restaurant.pictureId}" alt="${restaurant.name}" />

</div>
    <div class="restaurant__info">
       <h3>Information</h3>
       <h4 class="title">Name Restaurant</h4>
       <p class="title_desc">${restaurant.name}</p>
       <h4 class="address">Address</h4>
       <p class="address_desc">${restaurant.address}</p>
       <h4 class="city">City</h4>
       <p class="city_desc">${restaurant.city}</p>
       <h4 class="rating">Rating</h4>
       <p class="rating_desc">${restaurant.rating}</p>
    </div>
    <div class="restaurant__overview">
       <h3>Menu Foods</h3>
       <div class="foods" id="foods">
       </div>
    </div>
    <div class="restaurant__overview">
       <h3>Menu Drinks</h3>
       <div class="drinks" id="drinks">
    </div>
       <div class="restaurant__overview">
          <h3>Description</h3>
          <p>${restaurant.description}</p>
      </div>
      <div class="wrap-input">
         <h3>Add Reviews</h3>
         <input class="form-input" type="text" id="inputName" placeholder="Masukan nama anda ..." />
         <textarea rows="7" class="form-input" id="inputReview" name="textarea" placeholder="Masukan reviews anda untuk cafe ini ..."></textarea>
         <button class="btn" id="buttonSave">Submit Review</button>
      </div>
      <div class="restaurant__overview">
          <h3>Customer Reviews</h3>
      </div>
      <div class="reviews" id="reviews">
      </div>
  `;
const createDetailListFoods = (food) => `<span class="food_item">${food.name}</span>`;
const createDetailListDrinks = (drink) => `<span class="drink_item">${drink.name}</span>`;
const createDetailListReviews = (reviews) => `
<div class="review-item">
  <h3 class="title">${reviews.name}</h3>
  <p class="description">${reviews.review}</p>
  <hr class="hr"/>
  <p class="date">${reviews.date}</p>
</div>`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.name}"
           src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL_MEDIUM}/${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate, createDetailListFoods, createDetailListDrinks, createDetailListReviews, createLikeButtonTemplate, createLikedButtonTemplate,
};
