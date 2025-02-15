import { menuData } from "./data.js";

let totalPrice = 0

document.addEventListener("click", e => {
  if(e.target.dataset.pizza) {
    handlePizzaClick(e.target.dataset.pizza)
  }
  else if(e.target.dataset.hamburger) {
    handleBurgerClick(e.target.dataset.hamburger)
  }
  else if(e.target.dataset.beer) {
    handleBeerClick(e.target.dataset.beer)
  }
})

function handlePizzaClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  renderOrder(targetMenuObj)
}

function handleBurgerClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  renderOrder(targetMenuObj)
}

function handleBeerClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  renderOrder(targetMenuObj)
}

function renderOrder(orderObj) {
    document.getElementById("order-items").innerHTML += `
      <ul>
        <li>${orderObj.name} <span class="price">$${orderObj.price}</span></li>
      </ul>
    `
  totalPrice += orderObj.price
  document.getElementById("total-price").textContent = `$${totalPrice}`
  document.getElementById("order").classList.remove("hidden")
}

function getMenu() {
  let menuHTML = ``
  menuData.forEach(menu => {
    menuHTML += `
        <div class="menu-item">
          <div class="menu-item-left">
            <img src=${menu.image} alt="" />
            <div class="menu-item-desc">
             <h2>${menu.name}</h2>
             <p class="menu-item-ingredients">${menu.ingredients}</p>
             <p class="menu-item-price">$${menu.price}</p>
            </div>
           </div>
           <button class="menu-add-btn" aria-label="Add ${menu.name} to order" data-${menu.name}="${menu.id}">+</button>
        </div>
    `
  })
  return menuHTML
}

function renderMenu() {
  document.getElementById("menu-items").innerHTML = getMenu()
}

renderMenu()