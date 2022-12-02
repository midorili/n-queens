/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



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
  // var createdBoard = new Board({n: 4});
  // var solution = createdBoard.rows();
  // console.log('created board', createdBoard);
  // for (var i = 0; i < solution.length; i++) {
  //   for (var j = 0; j < solution[i].length; j++) {
  //     createdBoard.togglePiece(i, j);
  //     if (!createdBoard.hasAnyQueensConflicts()) {
  //       continue;
  //     }
  //     if (createdBoard.hasAnyQueensConflicts()) {
  //       createdBoard.togglePiece(i, j);
  //     }
  //   }
  // }
  //
  var createdBoard = new Board({n: n});
  var solution = createdBoard.rows();


  if (n === 2 || n === 3) {
    return [];
  }


  var innerFunction = function(currentRow) {
    if (currentRow === n) {
      solution = createdBoard.rows();
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

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
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

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
