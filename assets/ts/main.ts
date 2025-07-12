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
const navMenu: HTMLElement | null = document.getElementById('nav-menu');
const navToggle: HTMLElement | null = document.getElementById('nav-toggle');
const navClose: HTMLElement | null = document.getElementById('nav-close');

/* Affiche le menu */
// Grâce au typage, on est obligé de vérifier que `navToggle` et `navMenu` ne sont pas `null` (qu'ils existent bien).
// Cela évite les erreurs "Cannot read properties of null" qui sont très courantes en JavaScript.
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Cache le menu */
if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
// `querySelectorAll` retourne une `NodeListOf<Element>`. C'est une liste d'éléments.
const navLinks: NodeListOf<Element> = document.querySelectorAll('.nav__link');

function linkAction(): void { // `: void` signifie que cette fonction ne retourne aucune valeur.
    // On réutilise la variable `navMenu` déjà déclarée, c'est plus performant.
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(): void {
    const header: HTMLElement | null = document.getElementById('header');
    if (header) {
        // `window.scrollY` est plus moderne et explicite que `this.scrollY` dans ce contexte.
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(): void {
    const scrollUp: HTMLElement | null = document.getElementById('scroll-up');
    if (scrollUp) {
        if (window.scrollY >= 200) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

function scrollActive(): void {
    const scrollY: number = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight: number = current.offsetHeight;
        const sectionTop: number = current.offsetTop - 58;
        const sectionId: string | null = current.getAttribute('id');

        // On vérifie que l'ID existe avant de l'utiliser pour construire le sélecteur.
        if (sectionId) {
            const link: Element | null = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
// La bibliothèque ScrollReveal est chargée via une balise <script>, elle n'est pas importée.
// Pour rendre notre code plus sûr, au lieu d'utiliser le type `any` qui désactive toute vérification,
// nous définissons des "interfaces" pour décrire la forme de l'objet ScrollReveal.
// C'est une des grandes forces de TypeScript !

// 1. Interface pour les options que l'on peut passer à ScrollReveal.
// Maintenant, si vous écrivez `distanc` au lieu de `distance`, TypeScript vous le dira !
interface ScrollRevealOptions {
    distance?: string;
    duration?: number;
    delay?: number;
    origin?: 'top' | 'bottom' | 'left' | 'right';
    interval?: number;
    reset?: boolean;
}

// 2. Interface pour l'objet retourné par ScrollReveal, qui a une méthode `reveal`.
interface ScrollRevealObject {
    reveal(selector: string, options?: ScrollRevealOptions): void;
}

// 3. On déclare la variable globale `ScrollReveal` en utilisant nos interfaces.
declare const ScrollReveal: (options?: ScrollRevealOptions) => ScrollRevealObject;

const sr: ScrollRevealObject = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Décommentez pour réinitialiser les animations en sortant de la vue
});

sr.reveal(`.home__header, .section__title`, { delay: 600 });
sr.reveal(`.home__footer`, { delay: 700 });
sr.reveal(`.home__img`, { delay: 900, origin: 'top' });

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`, { origin: 'top', interval: 100 });
sr.reveal(`.specs__data, .discount__animate`, { origin: 'left', interval: 100 });
sr.reveal(`.specs__img, .discount__img`, { origin: 'right' });
sr.reveal(`.case__img`, { origin: 'top' });
sr.reveal(`.case__data`);