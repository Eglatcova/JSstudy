//Menu
const toggleMenu = () => {
  const menu = document.querySelector("menu"),
    menuItems = menu.querySelectorAll("ul>li");

  const addMenu = () => {
    menu.classList.add("active-menu");
  };

  const removeMenu = () => {
    menu.classList.remove("active-menu");
  };

  document.addEventListener("click", () => {
    let target = event.target;
    //искючение всех слушателей, кроме меню и его детей
    if (!target.closest("menu, .menu, .close-btn, a")) {
      removeMenu();
      return;
    }
    //открытие меню на клик по бургеру и его детям
    if (target.closest(".menu")) {
      addMenu();
    }
    //закрытие при клике на крестик
    if (target.classList.contains("close-btn")) {
      removeMenu();
    }
    //закрытие при клике на каждую ссылку
    if (target.matches("a")) {
      menuItems.forEach(() => {
        removeMenu();
      });
    }
  });
};

export default toggleMenu;