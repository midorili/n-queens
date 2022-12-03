
window.findNRooksSolution = function(n) {
  var createdBoard = new Board({n: n});
  var solution = createdBoard.rows();

  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution[i].length; j++) {
      createdBoard.togglePiece(i, j);
      if (!createdBoard.hasAnyRooksConflicts()) {
        continue;
      }
      if (createdBoard.hasAnyRooksConflicts()) {
        createdBoard.togglePiece(i, j);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var createdBoard = new Board({n: n});
  var solutionCount = 0;

  var innerFunction = function(currentRow) {
    if (currentRow === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      createdBoard.togglePiece(currentRow, i);
      if (!createdBoard.hasAnyRooksConflicts()) {
        innerFunction(currentRow + 1);
      }
      createdBoard.togglePiece(currentRow, i);
    }
  };
  innerFunction(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution;
  // var solutionFound = false;

  // if (n === 2 || n === 3 || n === 0) {
  //   var createdBoard = new Board({n: n});
  //   var solution = createdBoard.rows();
  //   return solution;
  // }


  // var solverFunction = function (columnIndex) {

  //   var createdInnerBoard = new Board({n: n});
  //   var innerSolution = createdInnerBoard.rows();
  //   createdInnerBoard.togglePiece(0, columnIndex);
  //   var queensCounter = 1;

  //   if (innerSolution.length > 1) {
  //     for (var i = 1; i < innerSolution.length; i++) {
  //       for (var j = 0; j < innerSolution[i].length; j++) {
  //         createdInnerBoard.togglePiece(i, j);
  //         queensCounter ++;
  //         if (!createdInnerBoard.hasAnyQueensConflicts()) {
  //           continue;
  //         }
  //         if (createdInnerBoard.hasAnyQueensConflicts()) {
  //           createdInnerBoard.togglePiece(i, j);
  //           queensCounter--;
  //         }
  //       }
  //     }
  //   }
  //   if (queensCounter === n) {
  //     solutionFound = true;
  //     return innerSolution;
  //   }
  // };

  // for (var i = 0; i < n; i++) {
  //   solution = solverFunction(i);
  //   if (solutionFound) {
  //     return solution;
  //   }
  // }
  var createdBoard = new Board({n: n});
  var solutionFound = false;

  var solverFunction = function (currentRow) {

    if (currentRow === n) {
      var queenCounter = _.reduce(createdBoard.rows(), function(memo, row) {
        return memo + _.reduce(row, function(memo, col) {
          return memo + col;
        }, 0);
      }, 0);
      if (queenCounter === n) {
        solutionFound = true;
      }
    }
    for (var i = 0; i < n; i++) {
      if (currentRow !== n) {
        createdBoard.togglePiece(currentRow, i);
        if (createdBoard.hasAnyQueensConflicts()) {
          createdBoard.togglePiece(currentRow, i);
        } else {
          solverFunction(currentRow + 1);
          if (solutionFound === true) {
            return createdBoard.rows();
          }
          createdBoard.togglePiece(currentRow, i);
        }
      }
    }
  };
  solverFunction(0);

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return createdBoard.rows();
};

window.countNQueensSolutions = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  var createdBoard = new Board({n: n});
  var solutionCount = 0;

  var innerFunction = function(currentRow) {
    if (currentRow === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      createdBoard.togglePiece(currentRow, i);
      if (!createdBoard.hasAnyQueensConflicts()) {
        innerFunction(currentRow + 1);
      }
      createdBoard.togglePiece(currentRow, i);
    }
  };
  innerFunction(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};