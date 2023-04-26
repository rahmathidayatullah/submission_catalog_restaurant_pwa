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
  I.waitForElement('.restaurant__title a', 10);
  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();

  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  I.waitForElement('.restaurant__title', 10);

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
