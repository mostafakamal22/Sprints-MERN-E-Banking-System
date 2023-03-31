export const navbarLinksClickHandler = () => {
  //get navbar
  const sidebar = document.getElementById("mobile-nav");
  //get close btn
  const closeBtn = document.getElementById("closeSidebar");
  //get show btn
  const showBtn = document.getElementById("openSideBar");

  if (sidebar.classList.contains("-translate-x-full")) {
    //show navbar
    sidebar.classList.replace("-translate-x-full", "translate-x-0");
  } else {
    //hide navbar
    sidebar.classList.replace("translate-x-0", "-translate-x-full");
  }

  //change btns
  closeBtn.classList.toggle("hidden");
  showBtn.classList.toggle("hidden");
};
