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

  //Input: number of rooks / rows
  //Output: number (output.length)
  //Output: [solution1, solution 2, solution3]
  //Constraints:
  //Edge:

  //Recursion for sure

  //Start row 0, iterate to start with next column
  //Start row 1, iterate to start with next column
  //... ... ..

  //[1,0,0,0]
  //Test first row = ok
  //Recursion second row [0,1,0,0] AND [0,0,1, 0]
  //Recursion third row [0,0,1,0] , another solution for [0,0,0,1]
  //


  //for loop row
  //for loop column
  //set current (row,column) = 1
  //


  //Start a board , new Board ({n:n})
  //counter = 0
  //board.togglepiece(0,0)
  //iterate through each column in row if there is conflict
  //togglepiece then check if conflict
  //if not conflict, keep piece there, counter++
  //if conflict, toggle back
  //when counter === n at end, increase number of solution
  //if counter !== n, number of solution do not increase

  //start a new board
  //board.togglepiece(0,1)
  //somehow run again










  //somehow incorporate findnrooksolution
  //Go inside of findnrooksolution AND toggle each row or column = line 48 and 49
  //[1,0,0]
  //[0,1,0]
  //[0,0,1]
  //[1,0,0]
  //[0,0,1]
  //[0,1,0]

  //[1,0,0]
  //[0,0,0]
  //[0,0,0]

  //[0,1,0]
  //[0,0,0]


  var solutionCount = undefined; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var createdBoard = new Board({n: 4});
  var solution = createdBoard.rows();
  console.log('created board', createdBoard);
  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution[i].length; j++) {
      createdBoard.togglePiece(i, j);
      if (!createdBoard.hasAnyQueensConflicts()) {
        continue;
      }
      if (createdBoard.hasAnyQueensConflicts()) {
        createdBoard.togglePiece(i, j);
      }
    }
  }
  //
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
