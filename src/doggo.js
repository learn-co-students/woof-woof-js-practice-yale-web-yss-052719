class Doggo {
    constructor( {id, name, image, isGoodDog}, adapter ){
        this.id = id
        this.image = image
        this.isGoodDog = isGoodDog
        this.name = name
        this.adapter = adapter
        // order matters here
        // this.renderDetails = this.renderDetails.bind(this)
        // then code this.renderDetails ==> arrow functions are better
        this.renderSpan()
    }

    get buttonText(){
        // refactored code
        // getters are good for specific booleans that we have to call a lot such as "loadReady"
        return this.isGoodDog ? "Good Dog!" : "Bad Dog!"
    }

    renderSpan(){
        const dogBar = document.querySelector(`#dog-bar`)
        const span = document.createElement('span')
        span.addEventListener('click', this.renderDetails)
            // this.renderDetails.bind(this)
        const text = document.createTextNode(`${this.name}`)
        dogBar.append(span)
        // appendChild will only take direct child
        // append will take in a whole array
        span.append(text)
        // textContent is the content of all elements inside the container
        // will return everything within that node
        // innerText will return stying including hidden text
        // span.innerText = `${this.name}`
    }

    // use arrow function to bind the execution context of this - otherwise this will be the span
    // renderDetails is a property on the Doggo instance
    renderDetails = () => {
        // don't actually need to use e.target... as much
        // information is stored in instance
        const dogInfo = document.querySelector("#dog-info")
        dogInfo.innerHTML  = `
            <img src=${this.image}>
            <h2>${this.name}</h2>
            <button>${this.buttonText}</button
        `
        const dogButton = dogInfo.querySelector("button")
        dogButton.addEventListener("click", this.toggleIsGoodDog)
    }

    toggleIsGoodDog = (e) => {
        this.isGoodDog = !this.isGoodDog
        e.target.innerText = this.buttonText
        this.adapter.patchDog(this.id, {isGoodDog: this.isGoodDog}).then(data => console.log(data))
    }


}