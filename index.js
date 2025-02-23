import { menuData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let orderArr = []
let fullName = ""

document.addEventListener("click", e => {
  if(e.target.id === "order-btn") {
    handleCompleteOrder()
  }
})

document.getElementById("fullName").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') // Allow only letters and spaces
  fullName = e.target.value
})

document.getElementById("cardNumber").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
  e.target.value = e.target.value.replace(/(\d{4})/g, '$1 ').trim() // Add space every 4 digits
  let cardNumber = e.target.value
})

document.getElementById("cardCVV").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); // Allow only numbers, max 4 digits
})

function handleAdddToOrder(event) {
  const menuId = event.target.getAttribute("data-id")
  const menuItem = menuData.find(item => item.id === menuId)

  if(menuItem) {
    const orderItem = orderArr.find(item => item.id === menuId)
    if(orderItem) {
      orderItem.quantity++
    } else {
      orderArr.push({...menuItem, quantity: 1})
    }
  }
  renderOrder(orderArr)
}

function handleRemoveFromOrder(event) {
  const menuId = event.target.getAttribute("data-id")
  const itemIndex = orderArr.findIndex(item => item.id === menuId)

  if(itemIndex !== -1) {
    if(orderArr[itemIndex].quantity > 1) {
      orderArr[itemIndex].quantity-- // Decrease quantity
    } else {
      orderArr.splice(itemIndex, 1) // Remove item if quantity is 1
    }
  }
  renderOrder()
}

function renderOrder() {
  const orderList = document.getElementById("order-items")
  const totalPriceEl = document.getElementById("total-price")

  if(orderArr.length === 0) {
    orderList.innerHTML = `<p>Your order is empty</p>`
    totalPriceEl.textContent = `$0`
    document.getElementById("order-btn").disabled = true
    return
  }

  let orderHTML = ""
  let totalPrice = 0

  orderArr.forEach(order => {
    orderHTML += `
      <ul>
        <li>${order.name} (x${order.quantity})
          <button class="remove" id="remove" data-id="${order.id}">remove</button> 
          <span class="price">$${order.price * order.quantity}</span>
        </li>
      </ul>
    `
  totalPrice += order.price * order.quantity
  })

  orderList.innerHTML = orderHTML
  totalPriceEl.textContent = `$${totalPrice}`
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", handleRemoveFromOrder)
  })
  document.getElementById("order").classList.remove("hidden")
}

function handleCompleteOrder() {
  document.getElementById("modal").classList.remove("hidden")
  document.getElementById("menu-items").disabled = true
  document.getElementById("order-btn").disabled = true
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
           <button class="menu-add-btn" aria-label="Add ${menu.name} to order" data-id="${menu.id}">+</button>
        </div>
    `
  })
  return menuHTML
}

/** Render menu and add click functionaality to add buttons */
function renderMenu() {
  document.getElementById("menu-items").innerHTML = getMenu()
  document.querySelectorAll(".menu-add-btn").forEach(button => {
    button.addEventListener("click", handleAdddToOrder)
})
}

renderMenu()