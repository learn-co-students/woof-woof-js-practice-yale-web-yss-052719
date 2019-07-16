document.addEventListener("DOMContentLoaded", function(){
  const dogBar = document.querySelector("#dog-bar")
  const doggoTag = document.querySelector("#dog-info")
  fetchAllData()

  dogBar.addEventListener('click', function(e){
    if (e.target.querySelector = ".doggo"){
      fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(data => {
        let dogToggle = "Good"
        if (data.isGoodDog === true){
          dogToggle = "Good"
        }
        else if (data.isGoodDog === false){
          dogToggle = "Bad"
        }
        doggoTag.innerHTML = ` <img src= ${data.image}>
           <h2>${data.name}</h2>
           <button data-dog=${data.isGoodDog} data-id=${data.id}>${dogToggle} Dog!</button>`
      })
    }
  })
  doggoTag.addEventListener('click', function(e){
    if (e.target.tagName === "BUTTON"){
      let dogStatus = e.target.dataset.dog
      const isHeGood = !(dogStatus === "true")
      fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "isGoodDog": isHeGood
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        let dogToggle = "Good"
        if (data.isGoodDog === true){
          dogToggle = "Good"
        }
        else if (data.isGoodDog === false){
          dogToggle = "Bad"
        }
        doggoTag.children[2].innerHTML = `<button data-dog=${data.isGoodDog} data-id=${data.id}>${dogToggle} Dog!</button>`
      })
    }
  })

  document.querySelector("#good-dog-filter").addEventListener('click', function(e){
    if (e.target.innerText === "Filter good dogs: ON"){
      e.target.innerText = "Filter good dogs: OFF"
      fetchAllData()
    }
    else if (e.target.innerText === "Filter good dogs: OFF"){
      e.target.innerText = "Filter good dogs: ON"
      fetch(`http://localhost:3000/pups?isGoodDog=true`)
      .then(res => res.json())
      .then(data => {
        dogBar.innerHTML = ''
        for (let i =0; i < data.length; i++){
          dogBar.innerHTML += `<span class="doggo" data-id=${data[i].id}>${data[i].name}</span>`
          if (data[i].isGoodDog === false){
            dogBar.innerHTML -= `<span class="doggo" data-id=${data[i].id}>${data[i].name}</span>`
          }
        }
      })
    }

  })

  function fetchAllData(){
    const dogBar = document.querySelector("#dog-bar")
    fetch(`http://localhost:3000/pups`)
    .then(res => res.json())
    .then(data => {
      dogBar.innerHTML = ''
      for(let i = 0; i < data.length; i++){
        dogBar.innerHTML += `<span class="doggo" data-id=${data[i].id}>${data[i].name}</span>`
      }
    })
  }
})
