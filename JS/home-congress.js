


//Home Page

if ((document.getElementsByTagName("title")[0].innerText=="Start page")) {
  var bouton = document.getElementById("collapse");


bouton.addEventListener("click", function() {
    if (bouton.innerText=="See more") {
    bouton.innerHTML = "See less"}
    
    else if  (bouton.innerText=="See less"){
        bouton.innerHTML = "See more"
    }
});}

//Congress

if(document.getElementsByTagName("title")[0].innerText=="House starting page"||document.getElementsByTagName("title")[0].innerText=="Senate starting page") {
  let init = {
  method: "GET",
  headers: {
    "X-API-Key": "SGMpjTcpJ2Ba68DwEiH53tdVgQNarFrtUB2Byi4T"
  }
}




let data = []
let members = []
let states = []
let HOS = []
let congress =[]


if (document.getElementsByTagName("title")[0].innerText=="House starting page") {
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
    sortAndSpliceStates(members);
    HOS = data["results"][0]["chamber"];
    HouOrSen(members);
    dropdownState(states);
    congress = data.results[0].congress
    congressNr.innerHTML = "Congress" + " " + congress
  })

  .catch(error => console.log(error));
} else if (document.getElementsByTagName("title")[0].innerText=="Senate starting page"){
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

console.log(data)
members = data.results[0].members
document.getElementById("plain").id="fade"
console.log(members)

sortAndSpliceStates(members);
HOS = data["results"][0]["chamber"];
HouOrSen(members);
dropdownState(states);
congress = data.results[0].congress
congressNr.innerHTML = "Congress" + " " + congress
loading = true

})

.catch(error => console.log(error));
}



var table = document.getElementById("table");
var tr = table.getElementsByTagName("tr");
var dropDown = document.getElementById("dropDown")
var congressNr = document.getElementById("congressNr")




function sortAndSpliceStates(x) {

  for (i = 0; i < x.length; i++) {
    states.push(x[i].state)
  }

  states.sort();
  for (i = 0; i < states.length; i++) {
    if (states[i] == states[i + 1]) {
      states.splice(i + 1, 1);

      i--;

    } else if (x[i] != x[i + 1]) {

    }
  }
}




var newA = document.createElement("a");
var newOption = document.createElement("option");

function dropdownState(x) {
  for (i = 0; i < x.length; i++) {
    var newOption = document.createElement("option");
    newOption.setAttribute("value", x[i]);
    dropDown.appendChild(newOption)
    newOption.innerHTML = x[i];
  }
}







var reset = document.getElementById("reset")
var filteredByState = [];

function filterState(x) {

  for (i = 0; i < x.length; i++) {
    if (x[i].state == dropDown.selectedOptions[0].value) {
      filteredByState.push(x[i])
    }
  }
}





document.getElementById("dropDown").addEventListener("change", function () {

  if (checkRep.checked == true || checkDem.checked == true || checkInd.checked == true) {
    filteredByState = [];
    table.innerHTML = "";
    filterState(filteredByParty)
    HouOrSen(filteredByState)
  } else {
    filteredByState = [];
    table.innerHTML = "";
    filterState(members)
    HouOrSen(filteredByState)


  }



})

document.getElementById("reset").addEventListener("click", function () {

  if (checkRep.checked == true || checkDem.checked == true || checkInd.checked == true) {
    filteredByState = [];
    table.innerHTML = "";
    filterState(filteredByParty)
    HouOrSen(filteredByState)
  } else {
    filteredByState = [];
    table.innerHTML = "";
    HouOrSen(members)


  }



})


function HouOrSen(x) {
  if (HOS == "House") {

    var newTr = document.createElement("tr")
    table.appendChild(newTr)


    for (j = 0; j < 5; j++) {

      if (j == 0) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 1);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Name"

      } else if (j == 1) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 2);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Party"
      } else if (j == 2) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 3);
        newTr.appendChild(newTh);
        newTh.innerHTML = "State"
      } else if (j == 3) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 4);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Seniority"
      } else if (j == 4) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 5);
        newTr.appendChild(newTh);
        newTh.innerHTML = "% Votes"
      }



    }

    for (i = 0; i < x.length; i++) {

      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      table.appendChild(newTr)


      for (j = 0; j < 5; j++) {


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


        } else if (j == 1) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 2);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["party"];

        } else if (j == 2) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 3);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["state"];

        } else if (j == 3) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 4);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["seniority"];

        } else if (j == 4) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 5);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["votes_with_party_pct"];

        }


      }
    }

  } else if (HOS == "Senate") {

    var newTr = document.createElement("tr")
    table.appendChild(newTr)


    for (j = 0; j < 5; j++) {

      if (j == 0) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 1);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Name"

      } else if (j == 1) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 2);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Party"
      } else if (j == 2) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 3);
        newTr.appendChild(newTh);
        newTh.innerHTML = "State"
      } else if (j == 3) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 4);
        newTr.appendChild(newTh);
        newTh.innerHTML = "Seniority"
      } else if (j == 4) {
        var newTh = document.createElement("th");

        newTh.setAttribute("column", 5);
        newTr.appendChild(newTh);
        newTh.innerHTML = "% Votes"
      }



    }

    for (i = 0; i < x.length; i++) {

      var newTr = document.createElement("tr")
      newTr.setAttribute("row", i);
      table.appendChild(newTr)


      for (j = 0; j < 5; j++) {


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


        } else if (j == 1) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 2);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["party"];

        } else if (j == 2) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 3);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["state"];

        } else if (j == 3) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 4);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["seniority"];

        } else if (j == 4) {
          var newTd = document.createElement("td");
          newTd.setAttribute("column", 5);
          newTr.appendChild(newTd);
          newTd.innerHTML = x[i]["votes_with_party_pct"];

        }


      }
    }

  }
}




let filteredByParty = []

function filterParty(x) {
  if (checkRep.checked == true && checkDem.checked == false && checkInd.checked == false) {

    for (i = 0; i < x.length; i++) {

      if (x[i].party == "R") {
        filteredByParty.push(x[i])
      }
    }

  } else if (checkRep.checked == false && checkDem.checked == true && checkInd.checked == false) {
    for (i = 0; i < x.length; i++) {

      if (x[i].party == "D") {
        filteredByParty.push(x[i])
      }
    }
  } else if (checkRep.checked == false && checkDem.checked == false && checkInd.checked == true) {
    for (i = 0; i < x.length; i++) {


      if (x[i].party == "I") {
        filteredByParty.push(x[i])
      }
    }
  } else if (checkRep.checked == true && checkDem.checked == true && checkInd.checked == false) {
    for (i = 0; i < x.length; i++) {

      if (x[i].party == "R" || x[i].party == "D") {}
    }
    filteredByParty.push(x[i])
  } else if (checkRep.checked == false && checkDem.checked == true && checkInd.checked == true) {
    for (i = 0; i < x.length; i++) {

      if (x[i].party == "D" || x[i].party == "I") {

        filteredByParty.push(x[i])
      }
    }
  } else if (checkRep.checked == true && checkDem.checked == true && checkInd.checked == true) {
    for (i = 0; i < x.length; i++) {

      if (x[i].party == "R" || x[i].party == "D" || x[i].party == "I") {
        filteredByParty.push(x[i])
      }

    }


  } else if (checkRep.checked == false && checkDem.checked == false && checkInd.checked == false) {
    for (i = 0; i < x.length; i++) {

      if (x[i].party == "R" || x[i].party == "D" || x[i].party == "I") {
        filteredByParty.push(x[i])
      }

    }


  }
}



document.getElementById("filter").addEventListener("change", function () {
  if (filteredByState == "") {
    console.log("test1")
    filteredByParty = [];
    table.innerHTML = ""
    filterParty(members)
    HouOrSen(filteredByParty)
  } else {
    console.log("test2")
    table.innerHTML = ""
    filteredByParty = [];
    filterParty(filteredByState)
    HouOrSen(filteredByParty);
  }
})

}

