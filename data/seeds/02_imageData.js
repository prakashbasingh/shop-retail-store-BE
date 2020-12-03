exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("image")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("image").insert([
        { imageTitle: "image1", image: "../../images/aisle1.jpg" },
        { imageTitle: "image2", image: "../../images/aisle2.jpg" },
        { imageTitle: "image3", image: "../../images/aisle3.jpg" },
        { imageTitle: "image4", image: "../../images/christmasAisle.jpg" },
        { imageTitle: "image5", image: "../../images/coolWines.jpg" },
        { imageTitle: "image6", image: "../../images/frontDisplay.jpg" },
        { imageTitle: "image7", image: "../../images/frontDisplay2.jpg" },
        { imageTitle: "image8", image: "../../images/homePageImage.jpg" },
        { imageTitle: "image9", image: "../../images/display.jpg" },
      ]);
    });
};
