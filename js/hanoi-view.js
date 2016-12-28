const Game = require("./game.js");

class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setUpTowers();
    this.startTower = null;
    this.$el.on("click", "ul", (event) => {
      this.clickTower(event);
    });
    this.render();
  }

  setUpTowers () {
    this.$el.addClass("cf");
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul>');
      for (let j = 0; j < 3; j++) {
        let $li = $('<li>');
        $ul.append($li);
      }
      this.$el.append($ul);
    }
  }

  render() {
    this.$el.find("ul").remove();
    this.$el.find("li").remove();
    for (let towerIdx = 0; towerIdx < 3; towerIdx++){
      const $ul = $("<ul>");
      let numDisc = this.game.towers[towerIdx].length;
      for (let discIdx = 1; discIdx <= numDisc; discIdx++){
        let $li = $("<li>");
        $li.addClass(`disc${discIdx}`);
        $ul.append($li);
      }
      this.$el.append($ul);
    }

  }

  clickTower(event) {
    const currentIdx = $(event.currentTarget).index();
    console.log(currentIdx);
    if (this.startTower === null) {
      this.startTower = currentIdx;
    } else {
      if (this.game.move(this.startTower, currentIdx)) {
        this.startTower = null;
      } else {
        alert("Invalid move!");
      }
    }

    this.render();

    if (this.game.isWon()) {
      const $p = $('<p>');
      this.$el.append($p);
      this.$el.off("click");
      this.$el.addClass(`winner`);
      $p.text(`You win!`);
    }
  }

}

module.exports = HanoiView;
