/* eslint-disable no-alert */
import TheRestaurantDbSource from '../../data/restaurant-api';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
    <div class="jumbotron">
        <div class="bg-transparent">
            <div class="jumbotron__inner">
                <h1 class="jumbotron__title">
                    Selamat datang di website catalog restaurant, siap melayani anda
                </h1>
                <p class="jumbotron__tagline">
                    Jangan ketinggalan update restoran dan menu menu terbarunya ..
                </p>
            </div>
        </div>
    </div>
    <div class="loading" id="loading">
    </div>
    <div class="content">
    <h2 class="content__heading">List Restaurant</h2>
    <div id="restaurant" class="restaurants">
    </div>
  </div>
      `;
  },

  async afterRender() {
    const loader = document.querySelector('#loading');
    loader.classList.add('display');
    await TheRestaurantDbSource.listRestaurant().then((listRestaurant) => {
      const restaurantContainer = document.querySelector('#restaurant');
      // Fungsi ini akan dipanggil setelah render()
      listRestaurant.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }).catch(() => {
      alert('Gagal get list data catalog');
    }).finally(() => {
      loader.classList.remove('display');
    });
  },
};

export default ListRestaurant;
