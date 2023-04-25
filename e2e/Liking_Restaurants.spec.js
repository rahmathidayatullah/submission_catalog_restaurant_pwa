const assert = require('assert');

/* eslint-disable no-undef */
Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurant-item__not__found');
});

Scenario('linking one restaurants', async ({ I }) => {
  I.see('Not found data ...', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.waitForElement('.movie__title a', 10);
  I.seeElement('.movie__title a');

  const firstFilm = locate('.movie__title a').first();

  const firstFilmTitle = await I.grabTextFrom(firstFilm);

  I.click(firstFilm);
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  I.waitForElement('.movie__title', 10);

  const likedFilmTitle = await I.grabTextFrom('.movie__title');

  assert.strictEqual(firstFilmTitle, likedFilmTitle);
});
