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
    // this.render();
  }

  setUpTowers () {
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul>');
      $ul.addClass("cf");
      for (let j = 0; j < 3; j++) {
        let $li = $('<li>');
        if (i === 0) {
          $li.addClass(`disc${j}`);
        }
        $ul.append($li);
      }
      this.$el.append($ul);
    }
  }

  render() {
    $("ul").remove();
    $("li").remove();
    for (let i = 0; i < this.game.towers.length; i++){
      const $ul = $("<ul>");
      for(let j = 0; j < 3; j++){
        const $li = $("<li>");
        if (this.game.towers[i][j] === 3) {
          $li.addClass(`disc2`);
          $ul.append($li);
        } else if (this.game.towers[i][j] === 2) {
          $li.addClass(`disc1`);
          $ul.append($li);
        } else if (this.game.towers[i][j] === 1) {
          $li.addClass(`disc0`);
          $ul.append($li);
        } else {
          $ul.append($li);
        }
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
