const Product = require("../../models/product");

function shopController() {
  return {
    // index(req, res) {
    //   Product.find().then(function (gears) {
    //     console.log(gears)
    //     res.render("shop",{ allproducts: gears});
    //   });
    // },

    async index(req, res) {
      const gears = await Product.find();
      // console.log(gears);
      return res.render("shop", { gears: gears });
    },
  };
}
module.exports = shopController;
