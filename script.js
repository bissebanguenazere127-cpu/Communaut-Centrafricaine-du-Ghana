/* ==========================================
   CCG WEBSITE JAVASCRIPT
   Communauté de Centrafrique du Ghana
========================================== */



// ================================
// MENU MOBILE
// ================================


const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector("#navbar");


menuBtn.addEventListener("click",()=>{

    navbar.classList.toggle("active");

});



// Fermer le menu après clic sur un lien

document.querySelectorAll("nav a").forEach(link=>{


    link.addEventListener("click",()=>{

        navbar.classList.remove("active");

    });


});







// ================================
// HEADER SCROLL EFFECT
// ================================


window.addEventListener("scroll",()=>{


const header=document.querySelector("header");


if(window.scrollY > 50){

header.style.background="rgba(255,255,255,0.98)";

header.style.boxShadow=
"0 10px 30px rgba(0,0,0,0.15)";

}

else{


header.style.background=
"rgba(255,255,255,0.9)";


header.style.boxShadow=
"0 5px 20px rgba(0,0,0,0.08)";


}


});








// ================================
// ANIMATION AU SCROLL
// ================================


const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";


}


});


},
{

threshold:0.15

});



document.querySelectorAll(".section, .new-section, .member, .card, .new-card, .values div")
.forEach(element=>{


element.style.opacity="0";

element.style.transform="translateY(50px)";

element.style.transition="0.8s ease";


observer.observe(element);


});

const newCards = document.querySelectorAll('.new-card');
newCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3')?.textContent || 'Carte';
        alert(`${title} sélectionnée.`);
    });
});

// ================================
// RECHERCHE DE DOCUMENTS
// ================================

const documentSearchInput = document.querySelector('#document-search-input');

if (documentSearchInput) {
    const documentCards = [...document.querySelectorAll('[data-document-card]')];
    const documentSearchStatus = document.querySelector('#document-search-status');
    const documentNoResults = document.querySelector('#document-no-results');
    const clearDocumentSearch = document.querySelector('#clear-document-search');

    const filterDocuments = () => {
        const query = documentSearchInput.value.trim().toLocaleLowerCase('fr');
        let visibleCount = 0;

        documentCards.forEach((card) => {
            const matches = card.textContent.toLocaleLowerCase('fr').includes(query);
            card.hidden = !matches;
            if (matches) visibleCount += 1;
        });

        documentSearchStatus.textContent = query
            ? `${visibleCount} document${visibleCount > 1 ? 's' : ''} trouvé${visibleCount > 1 ? 's' : ''}`
            : `${documentCards.length} documents disponibles`;
        documentNoResults.hidden = visibleCount !== 0;
        clearDocumentSearch.hidden = !query;
    };

    documentSearchInput.addEventListener('input', filterDocuments);
    clearDocumentSearch.addEventListener('click', () => {
        documentSearchInput.value = '';
        filterDocuments();
        documentSearchInput.focus();
    });
}








// ================================
// GALERIE LIGHTBOX
// ================================


const galleryImages =
document.querySelectorAll(".gallery img");



const lightbox=document.createElement("div");


lightbox.className="lightbox";


lightbox.innerHTML=`

<img src="" alt="image">

<span class="close">
&times;
</span>

`;



document.body.appendChild(lightbox);



const lightboxImage =
lightbox.querySelector("img");

const closeBtn =
lightbox.querySelector(".close");



galleryImages.forEach(image=>{


image.addEventListener("click",()=>{


lightbox.style.display="flex";


lightboxImage.src=image.src;


});


});



closeBtn.onclick=()=>{


lightbox.style.display="none";


};



lightbox.onclick=(e)=>{


if(e.target !== lightboxImage){

lightbox.style.display="none";

}


};







// ================================
// STYLE LIGHTBOX AUTOMATIQUE
// ================================


const style=document.createElement("style");


style.innerHTML=`

.lightbox{

position:fixed;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,.9);

display:none;

justify-content:center;

align-items:center;

z-index:2000;

}


.lightbox img{

max-width:90%;

max-height:85%;

border-radius:20px;

animation:zoom .5s;

}


.close{

position:absolute;

top:30px;

right:50px;

font-size:50px;

color:white;

cursor:pointer;

}



@keyframes zoom{

from{

transform:scale(.5);

opacity:0;

}

to{

transform:scale(1);

opacity:1;

}

}

`;


document.head.appendChild(style);









// ================================
// FORMULAIRE INSCRIPTION
// ================================



const form=document.querySelector(".form");


form.addEventListener("submit",(e)=>{


e.preventDefault();



alert(

"Merci pour votre inscription à la Communauté de Centrafrique du Ghana (CCG). Votre demande sera traitée prochainement."

);



form.reset();



});









// ================================
// WHATSAPP MESSAGE AUTOMATIQUE
// ================================



const whatsapp =
document.querySelector(".whatsapp");



whatsapp.addEventListener("click",()=>{


const message =
"Bonjour, je souhaite rejoindre la Communauté de Centrafrique du Ghana (CCG).";


const number =
"233000000000";



whatsapp.href =
"https://wa.me/"+number+
"?text="+encodeURIComponent(message);



});









// ================================
// ANNEE AUTOMATIQUE FOOTER
// ================================


const year =
new Date().getFullYear();



const footerText =
document.querySelector("footer p");



if(footerText){


footerText.innerHTML =

"© "+year+
" Communauté de Centrafrique du Ghana (CCG). Tous droits réservés.";


}









// ================================
// DARK MODE OPTION
// ================================


const darkButton=document.createElement("button");


darkButton.innerHTML="🌙";


darkButton.className="dark-mode-btn";


document.body.appendChild(darkButton);



darkButton.onclick=()=>{


document.body.classList.toggle("dark");


};


// CARROUSEL DES TÃ‰MOIGNAGES
function setupTestimonials() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll('.testimonial-card'));
  const prev = document.querySelector('#prevTestimonial');
  const next = document.querySelector('#nextTestimonial');
  if (!cards.length || !prev || !next) return;

  let index = Math.max(0, cards.findIndex(card => card.classList.contains('active')));
  let autoplay;

  function showSlide(newIndex) {
    index = (newIndex + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === index);
      card.setAttribute('aria-hidden', String(cardIndex !== index));
    });
  }

  function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(index + 1), 6000);
  }

  prev.addEventListener('click', () => {
    showSlide(index - 1);
    startAutoplay();
  });

  next.addEventListener('click', () => {
    showSlide(index + 1);
    startAutoplay();
  });

  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', () => clearInterval(autoplay));
  slider.addEventListener('focusout', startAutoplay);

  showSlide(index);
  startAutoplay();
}

setupTestimonials();





// DARK MODE STYLE

const darkStyle=document.createElement("style");


darkStyle.innerHTML=`

.dark{

background:#111;

color:white;

}



.dark header{

background:#1c1c1c;

}



.dark .card,

.dark .member,

.dark .values div,

.dark .president-card{

background:#222;

color:white;

}



.dark .title{

color:#FFD700;

}



.dark-mode-btn{

position:fixed;

left:25px;

bottom:25px;

width:50px;

height:50px;

border-radius:50%;

border:none;

cursor:pointer;

font-size:22px;

z-index:999;

}


`;


document.head.appendChild(darkStyle);


