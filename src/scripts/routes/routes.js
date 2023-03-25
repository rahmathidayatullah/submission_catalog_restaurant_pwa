import Restaurants from '../views/pages/restaurants';
import DetailRestaurant from '../views/pages/detail-restaurant';

const routes = {
  '/': Restaurants, // default page
  '/list-restaurant': Restaurants,
  '/detail/:id': DetailRestaurant,
};
export default routes;
