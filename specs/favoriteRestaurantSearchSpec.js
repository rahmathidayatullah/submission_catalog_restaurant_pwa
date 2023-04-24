import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurants', () => {
  let presenter;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    // eslint-disable-next-line max-len
    presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants: FavoriteRestaurantIdb });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchRestaurants('film a');
    expect(presenter.latestQuery).toEqual('film a');
  });

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurants('film a');

    expect(presenter.latestQuery).toEqual('film a');
  });
  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    const foundMovies = document.querySelectorAll('.movie');
    expect(foundMovies.length).toEqual(1);

    presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    expect(document.querySelectorAll('.movie').length).toEqual(2);
  });
  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.movie__title').item(0).textContent)
      .toEqual('Satu');
  });
  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.movie__title').item(0).textContent)
      .toEqual('Satu');
    presenter._showFoundRestaurants(
      [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
    );
    const movieTitles = document.querySelectorAll('.movie__title');
    expect(movieTitles.item(0).textContent).toEqual('Satu');
    expect(movieTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found restaurants without title', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(document.querySelectorAll('.movie__title').item(0).textContent).toEqual('-');
  });
  it('should show the movies found by Favorite Restaurants', (done) => {
    document.getElementById('movie-search-container')
      .addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(3);
        done();
      });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('film a').and.returnValues([
      { id: 111, title: 'film abc' },
      { id: 222, title: 'ada juga film abcde' },
      { id: 333, title: 'ini juga boleh film a' },
    ]);

    setRestaurantSearchContainer('film a');
    expect(document.querySelectorAll('.movie').length).toEqual(3);
  });
  it('should show the name of the movies found by Favorite Restaurants', (done) => {
    document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
      const movieTitles = document.querySelectorAll('.movie__title');
      expect(movieTitles.item(0).textContent).toEqual('film abc');
      expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
      expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');

      done();
    });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('film a').and.returnValues([
      { id: 111, title: 'film abc' },
      { id: 222, title: 'ada juga film abcde' },
      { id: 333, title: 'ini juga boleh film a' },
    ]);

    setRestaurantSearchContainer('film a');
  });
});
