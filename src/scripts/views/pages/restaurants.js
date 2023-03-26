import TheRestaurantDbSource from '../../data/restaurant-api';
import { createMovieItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
    <div class="content">
    <h2 class="content__heading">List Restaurant</h2>
    <div id="restaurant" class="restaurants">
    </div>
  </div>
      `;
  },

  async afterRender() {
    const listRestaurant = await TheRestaurantDbSource.listRestaurant();
    // console.log('listRestaurant', listRestaurant);
    const restaurantContainer = document.querySelector('#restaurant');
    // Fungsi ini akan dipanggil setelah render()
    listRestaurant.forEach((movie) => {
      restaurantContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default ListRestaurant;
