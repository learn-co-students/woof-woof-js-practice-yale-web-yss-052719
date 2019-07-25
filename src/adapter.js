class Adapter {

    constructor(baseURL){
        this.baseURL = baseURL
    }

    getIndex(){
        return fetch(this.baseURL).then(r => r.json())
    }

    options(method, body){
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body)
        }
    }

    patchDog(id, body) {
        // const options = {
        //     // can also make this its own method
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // javascript needs quotes for above because - will be read as operator
        //         Accept: 'application/json'
        //     },
        //     body: JSON.stringify(body)
        // }
        return fetch(`${this.baseURL}/${id}`, this.options('PATCH', body)).then(r => r.json())
        // can easily make POST and DELETE requests
    }

}