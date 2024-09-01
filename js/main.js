// Variables

let nav = document.getElementById('nav');
let menu = document.getElementById('enlaces');
let abrir = document.getElementById('open');
let botones = document.getElementsByClassName('btn-header');
let cerrado = true;

function menus(){
    let Desplazamiento_Actual = window.pageYOffset;

    if(Desplazamiento_Actual <= 300){
        nav.classList.remove('nav2');
        nav.className = ('nav1');
        nav.style.transition = '1s';
        menu.style.top = '80px';
        abrir.style.color = '#fff';
    }else{
        nav.classList.remove('nav1');
        nav.className = ('nav2');
        nav.style.transition = '1s';
        menu.style.top = '100px';
        abrir.style.color = '#000';
    }
}

function apertura(){
    if(cerrado){
        menu.style.width = '70vw';
        cerrado = false;
    }else{
        menu.style.width = '0%';
        menu.style.overflow = 'hidden';
        cerrado = true;
    }
}

window.addEventListener('load', function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
    menus();
});
window.addEventListener('click',function(e){
    console.log(e.target);
    if(cerrado==false){
        let span = document.querySelector('span');
        if(e.target !== span && e.target !== abrir){
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            cerrado = true;
        }
    }
});
window.addEventListener('scroll', function(){
    console.log(window.pageYOffset);
    menus();
});
window.addEventListener('resize', function(){
    if(screen.width>= 700){
        cerrado = true;
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('width');
    }
});
abrir.addEventListener('click', function(){
    apertura();
}
);
document.addEventListener("DOMContentLoaded", function() {
    const languageSwitch = document.getElementById('language-switch');

    // Cargar el idioma preferido guardado o el predeterminado
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    loadLanguage(savedLang);
    languageSwitch.value = savedLang;

    // Evento para cambiar de idioma
    languageSwitch.addEventListener('change', function() {
        const selectedLang = this.value;
        loadLanguage(selectedLang);
        localStorage.setItem('preferredLanguage', selectedLang);
    });
});

function loadLanguage(lang) {
    fetch("F:/#NUBE/Aplicaciones 2024/TP 9/Prueba 1/en.json")  // Ajusta la ruta según la ubicación del JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.title = data.title;
            document.querySelector('.nav1 #enlace-inicio').textContent = data.header.nav.inicio;
            document.querySelector('.nav1 #enlace-equipo').textContent = data.header.nav.equipo;
            document.querySelector('.nav1 #enlace-servicio').textContent = data.header.nav.servicio;
            document.querySelector('.nav1 #enlace-trabajo').textContent = data.header.nav.trabajo;
            document.querySelector('.nav1 #enlace-contacto').textContent = data.header.nav.contacto;
            document.querySelector('header .textos h1').textContent = data.header.main_text.h1;
            document.querySelector('header .textos h2').textContent = data.header.main_text.h2;
            // Continua con el resto de los textos...
        })
        .catch(error => console.error('Error al cargar el archivo de idioma:', error));
}

