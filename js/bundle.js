/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const HanoiView = __webpack_require__(3);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new Game();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];

	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

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


/***/ }
/******/ ]);