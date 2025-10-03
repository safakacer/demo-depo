// Bayrak imlecini mouse ile hareket ettir
const flag = document.getElementById("flag-cursor");

window.addEventListener("mousemove", (e) => {
  flag.style.left = e.clientX + "px";
  flag.style.top  = e.clientY + "px";
});

