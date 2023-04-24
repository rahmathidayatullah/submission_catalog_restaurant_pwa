class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurants(event.target.value);
    });
  }

  async _searchRestaurants(latestQuery) {
    // this._latestQuery = latestQuery;
    this._latestQuery = latestQuery.trim();

    // const foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latestQuery);

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }

    // this._favoriteRestaurants.searchRestaurants(this._latestQuery);
    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
    console.log('restaurants', restaurants);
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`
          <li class="movie">
            <span class="movie__title">${restaurant.title || '-'}</span>
          </li>
        `),
      '',
    );
    document.querySelector('.movies').innerHTML = html;
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
