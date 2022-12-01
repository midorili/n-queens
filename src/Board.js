// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/




    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var counter = 0;
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        if (this.get(rowIndex)[i] === 1) {
          counter ++;
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    hasAnyRowConflicts: function() {

      var rowConflict = false;
      for (var key in this.attributes) {
        if (key === 'n') {
          continue;
        }
        if (this.hasRowConflictAt(key)) {
          rowConflict = true;
        }
      }
      return rowConflict;

    },


    hasColConflictAt: function(colIndex) {

      var counter = 0;

      for (var key in this.attributes) {
        if (key === 'n') {
          continue;
        }
        if (this.attributes[key][colIndex] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    hasAnyColConflicts: function() {

      // var storage = {};
      // for (var key in this.attributes) {
      //   if (key === 'n') {
      //     continue;
      //   }
      //   for (var i = 0; i < this.attributes[key].length; i++) {
      //     if (this.attributes[key][i] === 1) {
      //       if (storage[i] === undefined) {
      //         storage[i] = 1;
      //       } else {
      //         storage[i]++;
      //       }
      //     }
      //   }
      // }
      // var counterResult = Object.values(storage);
      // for (var j = 0; j < counterResult.length; j++) {
      //   if (counterResult[j] > 1) {
      //     return true;
      //   }
      // }
      // return false;

      var colConflict = false;

      for (var i = 0; i < this.get(0).length; i ++) {
        if (this.hasColConflictAt(i)) {
          colConflict = true;
        }
      }

      return colConflict;

    },
    /*
    var matrix = [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0]
    ];
    var board = new Board(matrix);
   */
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;

      for (var i = 0; i < this.rows().length; i++) {
        if (this._isInBounds(i, columnIndex)) {
          if (this.rows()[i][columnIndex] === 1) {
            counter++;
          }
        }
        columnIndex++;
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    hasAnyMajorDiagonalConflicts: function() {

      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.rows()[i].length; j++) {
          console.log(this.rows()[i]);
          if (this.rows()[i][j] === 1) {
            var currentFound = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
            if (this.hasMajorDiagonalConflictAt(currentFound)) {
              return true;
            }
          }
        }
      }
      return false;
    },



    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;

      for (var i = 0; i < this.rows().length; i++) {
        if (this._isInBounds(i, columnIndex)) {
          if (this.rows()[i][columnIndex] === 1) {
            counter++;
          }
        }
        columnIndex--;
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.rows()[i].length; j++) {
          console.log(this.rows()[i]);
          if (this.rows()[i][j] === 1) {
            var currentFound = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
            if (this.hasMinorDiagonalConflictAt(currentFound)) {
              return true;
            }
          }
        }
      }
      return false;
    },


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
