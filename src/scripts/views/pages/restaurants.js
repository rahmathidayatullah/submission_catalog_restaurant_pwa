import TheRestaurantDbSource from "../../data/restaurant-api";

const NowPlaying = {
  async render() {
    return `
        <h2>List Restaurant</h2>
      `;
  },

  async afterRender() {
    const listRestaurant = await TheRestaurantDbSource.listRestaurant();
    console.log("listRestaurant",listRestaurant);
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default NowPlaying;
