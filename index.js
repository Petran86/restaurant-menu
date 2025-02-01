import { menu } from "./data";

const menuItems = document.getElementById("menu-items")

function renderMenu() {
    const menuString = ``
    for(let menuItm of menu) {
        menuString += `
        <img src="" alt="" />
          <div class="menu-item-desc">
            <h2>${menuItm.name}</h2>
            <p>${menuItm.ingredients}</p>
            <p>$${menuItm.price}</p>
          </div>
          <button aria-label="Add item to order">+</button>
        `
    }
    console.log(menuString)
    menuItems.innerHTML = menuString
}
renderMenu()