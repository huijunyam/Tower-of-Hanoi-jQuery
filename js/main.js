const Game = require("./game.js");
const HanoiView = require("./hanoi-view.js");

$( () => {
  const rootEl = $('.hanoi');
  const game = new Game();
  new HanoiView(game, rootEl);
});
