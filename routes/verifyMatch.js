module.exports = function (teamAGuess, teamBGuess, teamAResult, teamBResult) {
  let totalPoints = 0;
  if (teamAResult === teamAGuess && teamBResult === teamBGuess) {
    return (totalPoints += 10);
  } else {
    if (teamAResult > teamBResult) {
      if (teamAGuess > teamBGuess) {
        totalPoints += 5;
        if (teamBGuess === teamBResult || teamAGuess === teamAResult) {
          totalPoints += 1;
        }
      } else {
        if (teamBGuess === teamBResult || teamAGuess === teamAResult) {
          totalPoints += 1;
        }
      }
    }
    if (teamBResult > teamAResult) {
      if (teamBGuess > teamAGuess) {
        totalPoints += 5;
      }
      if (teamBGuess === teamBResult || teamAGuess === teamAResult) {
        totalPoints += 1;
      }
    }

    if (teamAResult === teamBResult) {
      if (teamAGuess === teamBGuess) {
        totalPoints += 5;
      }
      if (teamBGuess === teamBResult || teamAGuess === teamAResult) {
        totalPoints += 1;
      }
    }
  }
  return totalPoints;
};
