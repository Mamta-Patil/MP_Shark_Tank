
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}
let productdata = []
function fetchdata() {
  fetch("https://mp-addtocard.onrender.com/pitches")
    .then((res) => res.json())
    .then((data) => {
      datalist(data)
      productdata = data
    })
    .catch((err) => console.log(err))
}
fetchdata()

function datalist(data) {
  let store = data.map((el) =>
    singledata(el.id, el.image, el.title, el.price, el.founder, el.category, el.description))
  mainSection.innerHTML = store.join("")
}

function singledata(id, image, title, price, founder, category, description) {
  let data = `
   <a href="discription.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&title=${encodeURIComponent(title)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}&description=${description}">
    <div class="card" data-id="${id}">
    <div class="card-img">
      <img src="${image}" alt="" height="250px" width="250px">
    </div>
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-founder">${founder}</p>
      <p class="card-category">${category}</p>
      <p class="card-price">${price}</p>
      <p class="card-description">${description}</p>
      <a href="#" class="card-link" data-id="${id}">Edit</a>
      <button class="card-button" data-id="${id}">Delete</button>
    </div>
  </div>
  </a>
`
  return data;
}




// post part
pitchCreateBtn.addEventListener("click", () => {

  const title = pitchTitleInput.value
  const price = pitchPriceInput.value
  const category = pitchCategoryInput.value
  const image = pitchPriceInput.value
  const founder = pitchfounderInput.value

  let product = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    category: pitchCategoryInput.value,
    image: pitchImageInput.value,
    founder: pitchfounderInput.value,

  }

  fetch("http://localhost:3000/pitches", {
    method: "POST",
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(product)
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Data added scuceessfully")
      fetchdata()
    })
    .catch((err) => {
      console.log(err)
      alert("data not added");
    })
  pitchTitleInput.value = ""
  pitchfounderInput.value = ""
  pitchCategoryInput.value = ""
  pitchImageInput.value = ""
  pitchPriceInput.value = ""
})

// Delete part
document.addEventListener("click", (el) => {
  if (el.target.classList.contains("card-button")) {
    Deleteproduct(el.target.dataset.id)
  }
})

function Deleteproduct(id) {
  fetch(`https://mp-addtocard.onrender.com/pitches/${id}`, {
    method: "DELETE"

  })
    .then((res) => res.json())
    .then((data) => {
      alert("data deleted scucceessfully")
      fetchdata()
    })
    .catch((err) => console.log(err))
}

// cateory part
// filter based on category
filterFood.addEventListener("click", () => {
  let filterdata = productdata.filter((el) => el.category == "Food")
  console.log(filterdata)
  datalist(filterdata)
})
filterElectronics.addEventListener("click", () => {
  let filterdata = productdata.filter((el) => el.category == "Electronics")
  console.log(filterdata)
  datalist(filterdata)
})
filterPersonalCare.addEventListener("click", () => {
  let filterdata = productdata.filter((el) => el.category == "Personal Care")
  console.log(filterdata)
  datalist(filterdata)
})

// soart to lo price to highprice
sortAtoZBtn.addEventListener("click", () => {
  const sortAtoZData = productdata.sort((a, b) => a.price - b.price)
  datalist(sortAtoZData)
})
sortZtoABtn.addEventListener("click", () => {
  const sortZtoABtnData = productdata.sort((a, b) => b.price - a.price)
  datalist(sortZtoABtnData)
})

// Populate updata data in dom
document.addEventListener("click", (el) => {
  if (el.target.classList.contains("card-link")) {
    let id = el.target.dataset.id
    PopulateForm(id)
  }
})

function PopulateForm(id) {
  fetch(`https://mp-addtocard.onrender.com/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchTitleInput.value = data.title
      updatePitchImageInput.value = data.image
      updatePitchPriceInput.value = data.price
      updatePitchCategoryInput.value = data.category
      updatePitchfounderInput.value = data.founder
      updatePitchIdInput.value = data.id

    })
    .catch((err) => console.log(err))
}

updatePitchBtn.addEventListener("click", () => {
  let updateProductData = {
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    founder: updatePitchfounderInput.value,
    category: updatePitchCategoryInput.value,
    price: updatePitchPriceInput.value,
    id: updatePitchIdInput.value

  }

  fetch(`https://mp-addtocard.onrender.com/pitches/${updateProductData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"

    },
    body: JSON.stringify(updateProductData)
  })

    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      alert("data updated scuceessfully")
      datalist()
    })
    .catch((err) => console.log(err))
})

document.addEventListener("click", (el) => {
  if (el.target.classList.contains("card-link")) {
    let id = el.target.dataset.id
    PopulateForm(id)
  }
})

function PopulateForm(id) {
  fetch(`https://mp-addtocard.onrender.com/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchTitleInput.value = data.title
      updatePitchImageInput.value = data.image
      updatePitchPriceInput.value = data.price
      updatePitchCategoryInput.value = data.category
      updatePitchfounderInput.value = data.founder
      updatePitchIdInput.value = data.id

    })
    .catch((err) => console.log(err))
}

updatePricePitchPriceButton.addEventListener("click", () => {
  let updateProductData = {
    price: updatePricePitchPrice.value,
    id: updatePricePitchId.value

  }

  fetch(`https://mp-addtocard.onrender.com/pitches/${updateProductData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"

    },
    body: JSON.stringify(updateProductData)
  })

    .then((res) => res.json())
    .then((data) => {
      alert("data updated scuceessfully")
      fetchdata()
    })
    .catch((err) => console.log(err))
})

