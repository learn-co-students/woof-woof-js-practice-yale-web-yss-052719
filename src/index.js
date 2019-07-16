document.addEventListener('DOMContentLoaded', function(){
    console.log('content loaded')

    const URL = "http://localhost:3000/pups"
    const dogBar = document.querySelector('div#dog-bar')
    const dogInfo = document.querySelector('div#dog-info')
    const filterButton = document.querySelector('button#good-dog-filter')
    
    showAllDogs()
    
    dogBar.addEventListener('click', function(e){
        if (e.target.tagName === "SPAN") {
            let dogId = e.target.dataset.id
            fetch(`http://localhost:3000/pups/${dogId}`)
            .then(res => res.json())
            .then(dog => renderDog(dog))
        }
    })

    dogInfo.addEventListener('click', function(e){
        if (e.target.tagName === "BUTTON"){
            let dogId = e.target.dataset.id
            let isGoodDog = e.target.dataset.isGoodDog
            let toggleValue = !(isGoodDog === "true")
            fetch(`http://localhost:3000/pups/${dogId}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: toggleValue
                })
            })
            .then(res => res.json())
            .then(({name, image, isGoodDog, id}) => renderDog({name, image, isGoodDog, id}))
            }
    })

    filterButton.addEventListener('click', function(e){
        if (e.target.innerText === "Filter good dogs: OFF"){
            e.target.innerText = "Filter good dogs: ON"
            clearInnerHtml()
            fetch(URL)
            .then(res => res.json())
            .then(data => {
                data.forEach(dog => {
                    if (dog.isGoodDog) {
                        dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
                    }
            })        
            })
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            clearInnerHtml()
            showAllDogs()
        }
    })


    /********** functions **********/
    function showAllDogs() {
        fetch(URL)
        .then(res => res.json())
        .then(data =>
            data.forEach(function(dog) {
                dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
            })        
        )
    }

    function renderDog({name, image, isGoodDog, id}) {
        dogInfo.innerHTML = `
        <img src=${image}>
        <h2>${name}</h2>`
        if (isGoodDog) {
            dogInfo.innerHTML += `<button data-id=${id} data-is-good-dog=${isGoodDog}>Good Dog!</button>`
        } else {
            dogInfo.innerHTML += `<button data-id=${id} data-is-good-dog=${isGoodDog}>Bad Dog!</button>`
        }
    }

    function clearInnerHtml() {
        dogBar.innerHTML = ""
    }


})


