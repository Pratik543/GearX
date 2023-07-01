const Order = require("../../../models/order");

function statusController() {
  return {
    update(req, res) {
      Order.findOneAndUpdate(
        { _id: req.body.orderId },
        { status: req.body.status },
        { new: true }
      )
        .then((data) => {
          return res.redirect("/admin/orders");
        })
        .catch((err) => {
          console.error(err);
          return res.redirect("/admin/orders");
        });
    },
  };
}

module.exports = statusController;
