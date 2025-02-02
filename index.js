import { menuData } from "./data.js";

function getMenu() {
  let menuHTML = ``
  menuData.forEach(menu => {
    menuHTML += `
        <div class="menu-item">
            <img src=${menu.image} alt="" />
            <div class="menu-item-desc">
             <h2>${menu.name}</h2>
             <p>${menu.ingredients}</p>
             <p>$${menu.price}</p>
           </div>
           <button aria-label="Add item to order">+</button>
        </div>
    `
  })
  return menuHTML
}

function render() {
  document.getElementById("menu-items").innerHTML = getMenu()
}

render()