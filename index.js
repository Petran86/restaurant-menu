import { menuData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let totalPrice = 0
let orderArr = []

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
  else if(e.target.dataset.remove) {
    handleRemoveItem(e.target.dataset.remove)
  }
})

function handlePizzaClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  orderArr.push({
    ...targetMenuObj,
    id: uuidv4()
  })
  renderOrder(orderArr)
}

function handleBurgerClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  orderArr.push({
    ...targetMenuObj,
    id: uuidv4()
  })
  renderOrder(orderArr)
}

function handleBeerClick(menuId) {
  const targetMenuObj = menuData.filter(menu => {
    return menu.id === menuId
  })[0]
  orderArr.push({
    ...targetMenuObj,
    id: uuidv4()
  })
  renderOrder(orderArr)
}

function renderOrder(orderArr) {
  let orderHTML = ""
  orderArr.forEach(order => {
    orderHTML += `
      <ul>
        <li>${order.name} 
          <button class="remove" id="remove" data-remove="${order.id}">remove</button> 
          <span class="price">$${order.price}</span>
        </li>
      </ul>
    `
  totalPrice += order.price
  })
  document.getElementById("order-items").innerHTML = orderHTML
  document.getElementById("total-price").textContent = `$${totalPrice}`
  document.getElementById("order").classList.remove("hidden")
}

function handleRemoveItem(itemId) {
  orderArr = orderArr.filter(item => itemId != item.id)
  totalPrice = 0
  renderOrder(orderArr)
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