/*
  Explication Générale :
  TypeScript est un "superset" de JavaScript. Tout code JavaScript est techniquement du TypeScript valide,
  mais l'intérêt est d'y ajouter des "types". Un type définit la nature d'une variable (un nombre, du texte, un objet, etc.).
  Cela rend le code plus sûr et plus facile à comprendre.
*/
/*=============== SHOW MENU ===============*/
// Ici, on dit à TypeScript : "cherche un élément avec l'ID 'nav-menu'".
// Le type `HTMLElement | null` signifie que la variable `navMenu` sera soit un élément HTML,
// soit `null` si aucun élément avec cet ID n'est trouvé. C'est plus sûr que de supposer qu'il existe toujours.
var navMenu = document.getElementById('nav-menu');
var navToggle = document.getElementById('nav-toggle');
var navClose = document.getElementById('nav-close');
/* Affiche le menu */
// Grâce au typage, on est obligé de vérifier que `navToggle` et `navMenu` ne sont pas `null` (qu'ils existent bien).
// Cela évite les erreurs "Cannot read properties of null" qui sont très courantes en JavaScript.
if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.add('show-menu');
    });
}
/* Cache le menu */
if (navClose && navMenu) {
    navClose.addEventListener('click', function () {
        navMenu.classList.remove('show-menu');
    });
}
/*=============== REMOVE MENU MOBILE ===============*/
// `querySelectorAll` retourne une `NodeListOf<Element>`. C'est une liste d'éléments.
var navLinks = document.querySelectorAll('.nav__link');
function linkAction() {
    // On réutilise la variable `navMenu` déjà déclarée, c'est plus performant.
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
}
navLinks.forEach(function (n) { return n.addEventListener('click', linkAction); });
/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    var header = document.getElementById('header');
    if (header) {
        // `window.scrollY` est plus moderne et explicite que `this.scrollY` dans ce contexte.
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        }
        else {
            header.classList.remove('scroll-header');
        }
    }
}
window.addEventListener('scroll', scrollHeader);
/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    var scrollUp = document.getElementById('scroll-up');
    if (scrollUp) {
        if (window.scrollY >= 200) {
            scrollUp.classList.add('show-scroll');
        }
        else {
            scrollUp.classList.remove('show-scroll');
        }
    }
}
window.addEventListener('scroll', scrollUp);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
var sections = document.querySelectorAll('section[id]');
function scrollActive() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (current) {
        var sectionHeight = current.offsetHeight;
        var sectionTop = current.offsetTop - 58;
        var sectionId = current.getAttribute('id');
        // On vérifie que l'ID existe avant de l'utiliser pour construire le sélecteur.
        if (sectionId) {
            var link = document.querySelector(".nav__menu a[href*='".concat(sectionId, "']"));
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                }
                else {
                    link.classList.remove('active-link');
                }
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);
var sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400
});
sr.reveal(".home__header, .section__title", { delay: 600 });
sr.reveal(".home__footer", { delay: 700 });
sr.reveal(".home__img", { delay: 900, origin: 'top' });
sr.reveal(".sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy", { origin: 'top', interval: 100 });
sr.reveal(".specs__data, .discount__animate", { origin: 'left', interval: 100 });
sr.reveal(".specs__img, .discount__img", { origin: 'right' });
sr.reveal(".case__img", { origin: 'top' });
sr.reveal(".case__data");
