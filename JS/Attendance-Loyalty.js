let init = {
  method: "GET",
  headers: {
    "X-API-Key": "SGMpjTcpJ2Ba68DwEiH53tdVgQNarFrtUB2Byi4T"
  }
}




let data = []
let members = []
let congress = []



if (document.getElementsByTagName("title")[0].innerText == "House attendance") {
  fetch("https://api.propublica.org/congress/v1/116/house/members.json", init)
    .then(response => {

      console.log(response);
      let json = response.json();
      console.log(json)
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
      avePartyVotedRep = average(RepVotedPartyList);
      avePartyVotedDem = average(DemVotedPartyList)
      avePartyVotedInd = average(IndVotedPartyList)
      votedWithParty();
      sortedMembers = members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
      });
      tenPrct = Math.ceil(members.length / 10);
      leastAtt(members)
      mostAtt(members);
      return members
    })

    .catch(error => console.log(error));
} else if (document.getElementsByTagName("title")[0].innerText == "Senate attendance") {
  fetch("https://api.propublica.org/congress/v1/116/senate/members.json", init)
    .then(response => {

      console.log(response);
      let json = response.json();
      console.log(json)
      return json;
    })
    .then(result => {


      let string = JSON.stringify(result);
      data = JSON.parse(string)
      document.getElementById("plain").id="fade"
      members = data.results[0].members
 
      congress = data.results[0].congress
      congressNr.innerHTML = "Congress" + " " + congress
      console.log(members[0]["party"])
      createList(members)
      politicianNum();
      createVotedPartyList(members);
      avePartyVotedRep = average(RepVotedPartyList);
      avePartyVotedDem = average(DemVotedPartyList)
      avePartyVotedInd = average(IndVotedPartyList)
      votedWithParty();
      sortedMembers = members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
      });
      tenPrct = Math.ceil(members.length / 10);
      leastAtt(members)
      mostAtt(members);
      return members
    })
} else if (document.getElementsByTagName("title")[0].innerText == "Senate loyalty") {
  fetch("https://api.propublica.org/congress/v1/116/senate/members.json", init)
    .then(response => {

      console.log(response);
      let json = response.json();
      console.log(json)
      return json;
    })
    .then(result => {


      let string = JSON.stringify(result);
      data = JSON.parse(string)
      document.getElementById("plain").id="fade"
      members = data.results[0].members
      console.log(members)
      congress = data.results[0].congress
      congressNr.innerHTML = "Congress" + " " + congress
      console.log(members[0]["party"])
      createList(members)
      politicianNum();
      createVotedPartyList(members);
      avePartyVotedRep = average(RepVotedPartyList);
      avePartyVotedDem = average(DemVotedPartyList)
      avePartyVotedInd = average(IndVotedPartyList)
      votedWithParty();
      sortedMembersLoyality = members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
      });
      tenPrct = Math.ceil(members.length / 10);
      leastLoy(members)
      mostLoy(members)

      return members
    })
} else if (document.getElementsByTagName("title")[0].innerText == "House loyalty") {
  fetch("https://api.propublica.org/congress/v1/116/house/members.json", init)
    .then(response => {

      console.log(response);
      let json = response.json();
      console.log(json)
      return json;
    })
    .then(result => {


      let string = JSON.stringify(result);
      data = JSON.parse(string)
      document.getElementById("plain").id="fade"
      members = data.results[0].members
      console.log(members)
      congress = data.results[0].congress
      congressNr.innerHTML = "Congress" + " " + congress
      console.log(members[0]["party"])
      createList(members)
      politicianNum();
      createVotedPartyList(members);
      avePartyVotedRep = average(RepVotedPartyList);
      avePartyVotedDem = average(DemVotedPartyList)
      avePartyVotedInd = average(IndVotedPartyList)
      votedWithParty();
      sortedMembersLoyality = members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
      });
      tenPrct = Math.ceil(members.length / 10);
      leastLoy(members)
      mostLoy(members)

      return members
    })
}



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
    } else if (x[i]["party"] == "I") {
      IndList.push(x[i]["last_name"])
    }
  }
}

var numRep = document.getElementById("numRep");
var numDem = document.getElementById("numDem");
var numInd = document.getElementById("numInd");

function politicianNum() {
  numRep.innerHTML = RepList.length + 1;
  numDem.innerHTML = DemList.length + 1;
  numInd.innerHTML = IndList.length + 1;
}

//calculate the average voted within party and include in HTML

var RepVotedPartyList = []
var DemVotedPartyList = [];
var IndVotedPartyList = [];
var avePartyVotedRep = average(RepVotedPartyList);
var avePartyVotedDem = []
var avePartyVotedInd = []

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

//Calculate average missed_votes


// var RepMissVotedPartyList = [];
// var DemMissVotedPartyList = [];
// var IndMissVotedPartyList = [];

// function createMissVotedPartyList(x) {
//   for (i = 0; i < x.length; i++) {
//     if (x["results"][0]["members"][i]["party"] == "R") {
//       RepMissVotedPartyList.push(x["results"][0]["members"][i]["missed_votes_pct"])
//     } else if (x["results"][0]["members"][i]["party"] == "D") {
//       DemMissVotedPartyList.push(x["results"][0]["members"][i]["missed_votes_pct"])
//     } else if (x["results"][0]["members"][i]["party"] == "I") {
//       IndMissVotedPartyList.push(x["results"][0]["members"][i]["missed_votes_pct"])
//     }
//   }
// }

// createMissVotedPartyList(data);


// var sum = 0;

// function addingArray(x) {

//   for (i = 0; i < x.length; i++) {
//     sum += x[i];

//   }

//   return sum
// }

// var aveMissPartyVotedRep = addingArray(RepMissVotedPartyList) / (RepMissVotedPartyList.length + 1);
// var sum = 0;
// var aveMissPartyVotedDem = addingArray(DemMissVotedPartyList) / (DemMissVotedPartyList.length + 1);
// var sum = 0;
// var aveMissPartyVotedInd = addingArray(IndMissVotedPartyList) / (IndMissVotedPartyList.length + 1);




//

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

leastAtt(data);
mostAtt(data);

// var sortedMembersLoyality = allMembers.sort(function (a, b) {
//   return a.votes_with_party_pct - b.votes_with_party_pct
// });

// console.log(sortedMembersLoyality);




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







leastLoy(members);

mostLoy(members)
