/* ======================================================================
   UI.JS — comportamento compartilhado entre todas as páginas
   (menu mobile e botão "voltar ao topo")
   ====================================================================== */

/* Menu mobile */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("aberto");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("aberto"));
    });
}

/* Botão voltar ao topo */
const btnTopo = document.getElementById("btn-topo");

if (btnTopo) {
    window.addEventListener("scroll", () => {
        btnTopo.classList.toggle("visivel", window.scrollY > 400);
    });

    btnTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
