document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => {
        const dogBar = document.querySelector("div#dog-bar")
        dogs.forEach(dog => {
            dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
        });
    })

    document.addEventListener("click", function(e) {
        if (e.target.tagName === "SPAN") {
            fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(pup => {
                const dogInfo = document.querySelector("div#dog-info")
                if (pup.isGoodDog) {
                    dogInfo.innerHTML = `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button>Good Dog!</button>`
                } else {
                    dogInfo.innerHTML = `<img src=${pup.image}>
                    <h2>${pup.name}</h2>
                    <button>Bad Dog!</button>`
                }
            })
        }
    })
})