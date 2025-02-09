import { menuData } from "./data.js";

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
           <button class="menu-add-btn" aria-label="Add ${menu.name} to order">+</button>
        </div>
    `
  })
  return menuHTML
}

function render() {
  document.getElementById("menu-items").innerHTML = getMenu()
}

render()