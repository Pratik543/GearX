function homeController() {
  return {
    index(req, res) {
      res.render("home");
    },
    conta(req, res) {
      res.render("contact");
    },
  };
}
module.exports = homeController;
