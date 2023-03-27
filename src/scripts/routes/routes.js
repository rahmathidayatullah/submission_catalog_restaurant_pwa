import Restaurants from '../views/pages/restaurants';
import DetailRestaurant from '../views/pages/detail-restaurant';
import Like from '../views/pages/like';

const routes = {
  '/': Restaurants,
  '/list-restaurant': Restaurants,
  '/detail/:id': DetailRestaurant,
  '/like': Like,
};
export default routes;
