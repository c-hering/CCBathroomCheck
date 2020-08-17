module.exports = app => {

  var controller = require("./controller");

  app.route('/').get(controller.home);
  app.route('/CC/dorms').get(controller.ccDorms);
  app.route('/CC/:dorm').get(controller.dormBathrooms)
  app.route('/CC/:dorm/:bathroom').get(controller.getBathroom);

  app.route('/CC/dorms').post(controller.addDorm);
  app.route('/CC/:dorm').post(controller.addBathrooms);
  // app.route('/CC/:dorm/:bathroom').get(controller.setStatus);
}
