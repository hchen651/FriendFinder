var friendData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatchScore = 999;
    friendData.push(req.body);
    for (let i=0; i<friendData.length-1; i++){
        var userScores = req.body.scores;
        var friendScores = friendData[i].scores;
        var scoreDifference = 0;
        for (let i=0; i<10; i++){
            scoreDifference = scoreDifference + Math.abs(parseInt(userScores[i])-parseInt(friendScores[i]));
        }
        if (scoreDifference<bestMatchScore)
        {
            var bestMatch = friendData[i];
            bestMatchScore = scoreDifference;
        }
    };
    res.json(bestMatch);
  });


};
