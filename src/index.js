
let divTag = document.querySelector('#dog-bar')



document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(pups => {
        let divTag = document.querySelector('#dog-bar')
        pups.forEach(pup => {
            divTag.innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`
        })
    })

    document.addEventListener("click", function(e){
        // console.log('asdf')

        if (e.target.tagName === "SPAN"){
            console.log(e.target)
            fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
            .then(resp => resp.json())
            .then(pup => {
             
                let divTag2 = document.querySelector('#dog-info')
                divTag2.innerHTML = ""
                if (pup.isGoodDog === true){
                    divTag2.innerHTML += `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button id="add" data-id=${pup.id} data-status =${pup.isGoodDog}>Good Dog!</button>
                    `
                }else if(pup.isGoodDog === false){
                    divTag2.innerHTML += `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button id="add" data-id=${pup.id} data-status =${pup.isGoodDog}>Bad Dog!</button>
                    `
                }
            })
        }else if(e.target.id === "add"){
            console.log(e.target.dataset.status)
            
            e.preventDefault()
            let dogstatus = !(e.target.dataset.status === 'true')

            fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
                method: "PATCH",
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: dogstatus
                })
            })
            .then(resp => resp.json())
            .then(pup => {
                console.log(pup.isGoodDog)
                console.log(dogstatus)
                let divTag2 = document.querySelector('#dog-info')
                // console.log(status)
                if (dogstatus === false){
                    // console.log(document.getElementById("add").dataset.status)
                    pup.isGoodDog = dogstatus
                    divTag2.innerHTML =""
                    divTag2.innerHTML += `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button id="add" data-id=${pup.id} data-status =${pup.isGoodDog}>Bad Dog!</button>
                    `
                    // console.log(document.getElementById("add").dataset.status)
                }else if (dogstatus === true){
                    pup.isGoodDog = dogstatus
                    divTag2.innerHTML =""
                    divTag2.innerHTML += `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button id="add" data-id=${pup.id} data-status =${pup.isGoodDog}>Good Dog!</button>
                    `
                }
                
            })
        }


    })

    document.addEventListener('click', function(e){
        if(e.target.id === "good-dog-filter"){
            console.log(e.target)
            if(e.target.dataset.status === "false"){
                e.target.outerHTML = `<button id="good-dog-filter" data-status="true">Filter good dogs: ON</button>`
                document.querySelector('#dog-bar').innerHTML = ""
                fetch(`http://localhost:3000/pups`)
                .then(resp => resp.json())
                .then(pups => {
                    pups.forEach(pup => {
                        if (pup.isGoodDog === true){
                            document.querySelector('#dog-bar').innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`
                        }
                    })
                })
            } else if(e.target.dataset.status === "true"){
                e.target.outerHTML = `<button id="good-dog-filter" data-status="false">Filter good dogs: OFF</button>`
                document.querySelector('#dog-bar').innerHTML = ""
                fetch(`http://localhost:3000/pups`)
                .then(resp => resp.json())
                .then(pups => {
                    pups.forEach(pup => {
                            document.querySelector('#dog-bar').innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`
                        
                    })
                })
            }
        }
    })




})