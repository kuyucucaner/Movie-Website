var openModalBtn = document.getElementById("openModal");

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function addCloseEventListeners() {
  var closeBtns = document.getElementsByClassName("close");
  for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener("click", closeModal);
  }
}

window.onload = function() {
  openModalBtn.addEventListener("click", openModal);
  addCloseEventListeners();
};
