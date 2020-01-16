var bouton = document.getElementById("collapse");


bouton.addEventListener("click", function() {
    if (bouton.innerText=="See more") {
    bouton.innerHTML = "See less"}
    
    else if  (bouton.innerText=="See less"){
        bouton.innerHTML = "See more"
    }
});