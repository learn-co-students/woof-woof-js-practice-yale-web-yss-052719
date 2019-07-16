const BASE_URL = "http://localhost:3000/pups"


document.addEventListener('DOMContentLoaded', function(){
    
    let filterTag = document.getElementById("good-dog-filter")

    // get all pups function
    function getPups(){
        return fetch(BASE_URL)
        .then(res => res.json())
    }

    // render pup to dog bar - function
    function renderPup(pup){
        let divTag = document.getElementById("dog-bar")
        divTag.innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`
    }

    // render pup details
    function renderPupDetails(pup){
        let divTag = document.getElementById("dog-info")
        divTag.innerHTML = ` <img src=${pup.image}>
        <h2>${pup.name}</h2>`
        if (pup.isGoodDog === true) {
            divTag.innerHTML += `<button id="toggle" data-id=${pup.id} data-on=${pup.isGoodDog}>Good Dog!</button>`
        }
        else {
            divTag.innerHTML += `<button id="toggle" data-id=${pup.id} data-on=${pup.isGoodDog}>Bad Dog!</button>`
        }
            // good/bad pup functionality
        let toggleTag = document.getElementById("toggle")
        toggleTag.addEventListener('click', function(e){
            let goodOrBad = !(e.target.dataset.on === "true")
            fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: goodOrBad
                })
            })
            .then(res => res.json())
            .then(pup => {
                renderPupDetails(pup)
            })
        })
    }

    // get and render all pups
    function renderAllPups(){getPups().then(pups => {
        pups.forEach(pup => {
            renderPup(pup)
        })
    })}

    renderAllPups()

    // upon click render pup details
    document.addEventListener('click', function(e){
        if (e.target.nodeName === "SPAN"){
            fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(pup => {
                renderPupDetails(pup)
            })
        }
    })
        
    // filter functionality
    filterTag.addEventListener('click', function(e){
        if (e.target.value === "off"){
            e.target.value = "on";
            filterTag.innerHTML = `Filter good dogs: ON`
            clearRender()
            getGoodPups().then(goodpups => {
                goodpups.forEach(goodpup => {
                    renderPup(goodpup)
                })
            })
        } else {
            e.target.value = "off";
            filterTag.innerHTML = `Filter good dogs: OFF`
            clearRender()
            renderAllPups()
        }
    })

    // render good pup function
    function getGoodPups(){
        return fetch("http://localhost:3000/pups?isGoodDog=true")
        .then(res => res.json())
    }

    function clearRender(){
        let divTag = document.getElementById("dog-bar")
        divTag.innerHTML = ""
    }
})