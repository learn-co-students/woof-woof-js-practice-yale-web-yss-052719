class Square {
    constructor(sideLength, color = "blue") {
        this.sideLength = sideLength
        this.color = color
        this.render()
    }

    // instance method
    render () {
        const container = document.querySelector('#dog-summary-container')
        const div = document.createElement('div')
        div.style.background = `${this.color}`
        div.style.height = `${this.sideLength}px`
        div.style.width = `${this.sideLength}px`
        div.style.display = "inline-block"
        container.append(div)
        // renders down because divs are blockscoped and blockscope takes up the whole width
        // display: block ==> display: inline will make it display horizontally
    }
}