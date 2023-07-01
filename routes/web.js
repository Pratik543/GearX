const homeController = require("../app/http/controllers/homeController");
const shopController = require("../app/http/controllers/shopController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
// admin related
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");

// Middlewares
// Doesn't allows login user to access login and sign in page
const guest = require("../app/http/middlewares/guest");
// Only login users can access protected routes
const auth = require("../app/http/middlewares/auth");
// only admins can access this middleware that admin
const admin = require("../app/http/middlewares/admin");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/contact", homeController().conta);
  app.get("/shop", shopController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  // cart routes
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  // Customer routes
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);
  app.get("/customer/orders/:id", auth, orderController().show);

  // Admin routes
  app.get("/admin/orders", admin, adminOrderController().index);
  app.post("/admin/order/status", admin, statusController().update);
}

module.exports = initRoutes;
