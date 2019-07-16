document.addEventListener('DOMContentLoaded', () =>{

    fetch('http://localhost:3000/pups').then(resp => resp.json()).then(dogs => {
        console.log(dogs)
        dogs.forEach(dog => {
          document.getElementById('dog-bar').innerHTML += `<span class='dog-span' data-id="${dog.id}">${dog.name}</span>` 
        })
    })

    document.addEventListener('click', dogEvent => {
        if (dogEvent.target.className === 'dog-span'){
            fetch(`http://localhost:3000/pups/${dogEvent.target.dataset.id}`)
            .then(resp => resp.json())
            .then(dog => {
                if (dog.isGoodDog === true) {
                document.getElementById(`dog-info`).innerHTML = `
                <img src=${dog.image}>
                <h2>${dog.name}</h2>
                <button class="good-dog" data-id="${dog.id}" data-status=${dog.isGoodDog}>Bad Dog!</button>
                `
                }
                else if (dog.isGoodDog === false) {
                document.getElementById(`dog-info`).innerHTML = `
                <img src=${dog.image}>
                <h2>${dog.name}</h2>
                <button class="good-dog" data-id="${dog.id}" data-status=${dog.isGoodDog}>Good Dog!</button>
                `
                }
            })
        }
    })

    document.addEventListener('click', event =>{
        if (event.target.className === 'good-dog'){
            let dogStatus = !(event.target.dataset.status === 'true')
            fetch(`http://localhost:3000/pups/${event.target.dataset.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                isGoodDog: dogStatus
            })
            }).then(() => {
                if (dogStatus === true){
                    document.getElementsByClassName('good-dog')[0].innerHTML = `Bad Dog!`
                    document.getElementsByClassName('good-dog')[0].dataset.status = dogStatus
                }
                else if (dogStatus === false){
                    document.getElementsByClassName('good-dog')[0].innerHTML = `Good Dog!`
                    document.getElementsByClassName('good-dog')[0].dataset.status = dogStatus
                    
                }
            })
            
        }
    })

    document.addEventListener('click', event =>{
        if (event.target.id === 'good-dog-filter'){
            // debugger
            if (event.target.dataset.status === "OFF"){
                event.target.outerHTML = `<button id="good-dog-filter" data-status="ON">Filter good dogs: ON</button>`
                document.getElementById('dog-bar').innerHTML = ``
                fetch('http://localhost:3000/pups').then(resp => resp.json()).then(dogs => {
                    console.log(dogs)
                    dogs.forEach(dog => {
                    if (dog.isGoodDog === true){
                    document.getElementById('dog-bar').innerHTML += `<span class='dog-span' data-id="${dog.id}">${dog.name}</span>`} 
                    })
                })

                
            }
            else if (event.target.dataset.status === "ON"){
                event.target.outerHTML = `<button id="good-dog-filter" data-status="OFF">Filter good dogs: OFF</button>`
                document.getElementById('dog-bar').innerHTML = ``
                fetch('http://localhost:3000/pups').then(resp => resp.json()).then(dogs => {
                    console.log(dogs)
                    dogs.forEach(dog => {
                    document.getElementById('dog-bar').innerHTML += `<span class='dog-span' data-id="${dog.id}">${dog.name}</span>` 
                    })
                })
             }
        }
    })
})
