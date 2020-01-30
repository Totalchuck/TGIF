let init = {
  method: "GET",
  headers: {
    "X-API-Key": "SGMpjTcpJ2Ba68DwEiH53tdVgQNarFrtUB2Byi4T"
  }
}




let data = []
let members = []
let congress = []
let title = document.getElementsByTagName("title")[0].id



  fetch("https://api.propublica.org/congress/v1/116/"+ title +"/members.json", init)
    .then(response => {
      let json = response.json();
      return json;
    })
    .then(result => {
     let string = JSON.stringify(result);
      data = JSON.parse(string)
      document.getElementById("plain").id="fade"
      members = data.results[0].members
      congress = data.results[0].congress
      congressNr.innerHTML = "Congress" + " " + congress
      createList(members)
      politicianNum();
      createVotedPartyList(members);
      avePartyVotedRep = (Math.round((average(RepVotedPartyList))*100)/100);
      avePartyVotedDem = (Math.round((average(DemVotedPartyList))*100)/100);
      avePartyVotedInd = (Math.round((average(IndVotedPartyList))*100)/100);
      votedWithParty();
      sortedMembers = members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
      });
      tenPrct = Math.ceil(members.length / 10);
      if (document.getElementsByTagName("title")[0].innerText == "House attendance"||document.getElementsByTagName("title")[0].innerText == "Senate attendance") {
        sortedMembers = members.sort(function (a, b) {
          return a.missed_votes_pct - b.missed_votes_pct
        });
        leastAtt(members)
      mostAtt(members);
      } else if (document.getElementsByTagName("title")[0].innerText == "Senate loyalty"||document.getElementsByTagName("title")[0].innerText == "House loyalty") {
        sortedMembers = members.sort(function (a, b) {
          return a.votes_with_party_pct - b.votes_with_party_pct
        });
        console.log(sortedMembers)
        leastLoy(members)
        mostLoy(members)
      }
      return members
    })

    .catch(error => console.log(error));




var table = document.getElementById("table");
var tr = table.getElementsByTagName("tr");
var stringData = JSON.stringify(data, null, 2);
var newA = document.createElement("a");


//House at a glance


var tableLeast = document.getElementById("least");
var tableMost = document.getElementById("most");

var RepList = [];
var DemList = [];
var IndList = [];

function createList(x) {
  for (i = 0; i < x.length; i++) {
    if (x[i]["party"] == "R") {
      RepList.push(x[i]["last_name"])
    } else if (x[i]["party"] == "D") {
      DemList.push(x[i]["last_name"])
    } else if (x[i]["party"] == "ID") {
      IndList.push(x[i]["last_name"])
    }
  }
}

var numRep = document.getElementById("numRep");
var numDem = document.getElementById("numDem");
var numInd = document.getElementById("numInd");

function politicianNum() {
  numRep.innerHTML = RepList.length;
  numDem.innerHTML = DemList.length;
  numInd.innerHTML = IndList.length;
}

//calculate the average voted within party and include in HTML

var RepVotedPartyList = []
var DemVotedPartyList = [];
var IndVotedPartyList = [];


function createVotedPartyList(x) {
  for (i = 0; i < x.length; i++) {
    if (x[i]["party"] == "R" && x[i]["votes_with_party_pct"] != null) {
      RepVotedPartyList.push(x[i]["votes_with_party_pct"])
    } else if (x[i]["party"] == "D" && x[i]["votes_with_party_pct"] != null) {
      DemVotedPartyList.push(x[i]["votes_with_party_pct"])
    } else if (x[i]["party"] == "I" && x[i]["votes_with_party_pct"] != null) {
      IndVotedPartyList.push(x[i]["votes_with_party_pct"])
    }
  }
}

var ave = []

function average(x) {
  var sum = 0
  for (j = 0; j < x.length; j++) {
    if (x[j] != "null") {
      sum += x[j];
    }

    ave = sum / (x.length)
    Math.round((ave*100)/100)

  }
  return ave
}





var votedRep = document.getElementById("votedRep");
var votedDem = document.getElementById("votedDem");
var votedInd = document.getElementById("votedInd");


function votedWithParty() {
  votedRep.innerHTML = avePartyVotedRep;
  votedDem.innerHTML = avePartyVotedDem;
  votedInd.innerHTML = avePartyVotedInd;
}

//calculte total missed vote

var totalMissVotedPartyList = [];

function createTotalMissVotedPartyList(x) {
  for (i = 0; i < x.length; i++) {

    totalMissVotedPartyList.push({
      vote: x["results"][0]["members"][i]["missed_votes_pct"],
      name: x["results"][0]["members"][i]["last_name"]
    })

  }
}

createTotalMissVotedPartyList(data);

//Least and most attendance

var sortedMembers = []
var tenPrct = []

function leastAtt(x) {
  for (i = members.length - 1; i > (members.length - tenPrct); i--) {
    if ((x[(members.length - tenPrct)]["missed_votes_pct"]) != (x[(members.length - tenPrct) + 1]["missed_votes_pct"])) {


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableLeast.appendChild(newTr)

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes"]);


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes_pct"]);


        }
      }

    } else if ((x[(members.length - tenPrct)]["missed_votes_pct"]) == (x[(members.length - tenPrct) + 1]["missed_votes_pct"])) {

      tenPrct++


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableLeast.appendChild(newTr);

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes"]);


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes_pct"]);


        }

      }
    }
  }
}

function mostAtt(x) {



  for (i = 0; i < tenPrct; i++) {

    if ((x[(tenPrct)]["missed_votes_pct"]) != (x[tenPrct + 1]["missed_votes_pct"])) {


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableMost.appendChild(newTr)

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes"]);


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes_pct"]);


        }
      }

    } else if ((x[tenPrct]["missed_votes_pct"]) == (x[tenPrct + 1]["missed_votes_pct"])) {

      tenPrct++


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableMost.appendChild(newTr)

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes"]);


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["missed_votes_pct"]);


        }

      }
    }
  }
}

//Least and most Loyal





function leastLoy(x) {
  for (i = 0; i < tenPrct; i++) {

    if ((x[(tenPrct)]["votes_with_party_pct"]) != (x[tenPrct + 1]["votes_with_party_pct"])) {


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableLeast.appendChild(newTr)

      for (j = 0; j < 4; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = ((Math.ceil((x[i]["total_votes"] * x[i]["votes_with_party_pct"]) / 100)));


        }

        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["votes_with_party_pct"]);


        }
      }

    } else if ((x[tenPrct]["votes_with_party_pct"]) == (x[tenPrct + 1]["votes_with_party_pct"])) {

      tenPrct++


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableLeast.appendChild(newTr)

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = ((Math.ceil((x[i]["total_votes"] * x[i]["votes_with_party_pct"]) / 100)));


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["votes_with_party_pct"]);


        }

      }
    }
  }
}

function mostLoy(x) {
 for (i = x.length - 1; i > (x.length - tenPrct); i--) {

    if ((x[(x.length - tenPrct)]["votes_with_party_pct"]) != (x[(x.length - tenPrct) + 1]["votes_with_party_pct"])) {


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableMost.appendChild(newTr)

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["url"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = ((Math.ceil((x[i]["total_votes"] * x[i]["votes_with_party_pct"]) / 100)));


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["votes_with_party_pct"]);


        }
      }

    } else if ((x[(x.length - tenPrct)]["votes_with_party_pct"]) == (x[(x.length - tenPrct) + 1]["votes_with_party_pct"])) {

      tenPrct++


      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      tableMost.appendChild(newTr);

      for (j = 0; j < 3; j++) {

        if (j == 0) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          var newA = document.createElement("a");
          newTd.appendChild(newA);

          if ((x[i]["middle_name"]) != null) {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["middle_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          } else {
            newA.innerHTML = (x[i]["first_name"]) + " " + (x[i]["last_name"]);
            newA.setAttribute("href", x[i]["api_uri"])
          }

        }
        if (j == 1) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = ((Math.ceil((x[i]["total_votes"] * x[i]["votes_with_party_pct"]) / 100)));


        }
        if (j == 2) {
          var newTd = document.createElement("td");

          newTd.setAttribute("column", 1);
          newTr.appendChild(newTd);
          newTd.innerHTML = (x[i]["votes_with_party_pct"]);


        }

      }
    }
  }
}






