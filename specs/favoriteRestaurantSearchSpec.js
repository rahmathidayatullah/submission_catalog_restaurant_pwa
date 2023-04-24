import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurants', () => {
  let presenter;
  let favoriteRestaurants;

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
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });
  describe('When query is not empty', () => {
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
    it('should show the restaurants found by Favorite Restaurants', (done) => {
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
    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
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

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should ask the model to search for restaurants', () => {
      searchRestaurants('film a');
      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('film a');
    });
    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          expect(document.querySelectorAll('.movie').length)
            .toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('film a')
        .and
        .returnValues([
          { id: 111, title: 'film abc' },
          { id: 222, title: 'ada juga film abcde' },
          { id: 333, title: 'ini juga boleh film a' },
        ]);

      searchRestaurants('film a');
    });
    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');
          expect(movieTitles.item(0).textContent)
            .toEqual('film abc');
          expect(movieTitles.item(1).textContent)
            .toEqual('ada juga film abcde');
          expect(movieTitles.item(2).textContent)
            .toEqual('ini juga boleh film a');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('film a')
        .and
        .returnValues([
          { id: 111, title: 'film abc' },
          { id: 222, title: 'ada juga film abcde' },
          { id: 333, title: 'ini juga boleh film a' },
        ]);

      searchRestaurants('film a');
    });
    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          expect(document.querySelectorAll('.movies__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);

      searchRestaurants('film a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);
      searchRestaurants('film a');
    });
  });
});
