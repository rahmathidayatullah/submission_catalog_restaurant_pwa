const CONFIG = {
  // KEY: 'YOUR_API_KEY',
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
  BASE_IMAGE_URL_SMALL: 'https://restaurant-api.dicoding.dev/images/small',
  BASE_IMAGE_URL_MEDIUM: 'https://restaurant-api.dicoding.dev/images/medium',
  BASE_IMAGE_URL_LARGE: 'https://restaurant-api.dicoding.dev/images/large',
  // DEFAULT_LANGUAGE: 'en-us',
  // CACHE_NAME: 'RestaurantCatalogue-V1',
  CACHE_NAME: new Date().toISOString(),
  DATABASE_NAME: 'restaurant-catalogue-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
  WEB_SOCKET_SERVER: 'wss://movies-feed.dicoding.dev',
};

export default CONFIG;
