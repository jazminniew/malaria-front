const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral"); 
const span = document.querySelector("span");

cloud.addEventListener("click", ()=>{ 
    barraLateral.classList.toggle("mini-barra-lateral");
    span.classList.toggle("oculto");
});