const BASE_URL = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', ()=> {
    // const squareInstance = new Square(100)
    const adapter = new Adapter(BASE_URL)
    adapter.getIndex().then(dogs => {
        dogs.forEach(dog => {
            const doggo = new Doggo(dog, adapter)
        })
    })
})