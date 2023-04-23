import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteMovieIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteMovieIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteMovieIdb);
});
