// Variables
function loadLanguage(lang) {
    fetch(`${lang}.json`)
        .then(response => response.json())
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
    fetch(`${lang}.json`)
        .then(response => response.json())
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
function loadLanguage(lang) {
    fetch(lang + '.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Título de la página
            document.title = data.title;

            // Navegación
            document.getElementById('enlace-inicio').textContent = data.header.nav.inicio;
            document.getElementById('enlace-equipo').textContent = data.header.nav.equipo;
            document.getElementById('enlace-servicio').textContent = data.header.nav.servicio;
            document.getElementById('enlace-trabajo').textContent = data.header.nav.trabajo;
            document.getElementById('enlace-contacto').textContent = data.header.nav.contacto;

            // Textos principales en el header
            document.querySelector('header .textos h1').textContent = data.header.main_text.h1;
            document.querySelector('header .textos h2').textContent = data.header.main_text.h2;

            // Sección "Mi equipo de trabajo"
            document.querySelector('#equipo h3').textContent = data.sections.equipo.title;
            document.querySelector('#equipo p.after').textContent = data.sections.equipo.description;

            // Sección "Mis servicios"
            document.querySelector('#servicio h3').textContent = data.sections.servicios.title;
            document.querySelector('#servicio p.after').textContent = data.sections.servicios.description;

            // Sección "Mis trabajos"
            document.querySelector('#trabajo h3').textContent = data.sections.trabajos.title;
            document.querySelector('#trabajo p.after').textContent = data.sections.trabajos.description;

            // Traducción de los elementos dentro de "Mi equipo de trabajo"
            const teamMembers = data.sections.equipo.team_members;
            document.querySelectorAll('.texto-team h4').forEach((element, index) => {
                element.textContent = teamMembers[index].name;
            });
            document.querySelectorAll('.texto-team p').forEach((element, index) => {
                element.textContent = teamMembers[index].description;
            });

            // Traducción de los elementos dentro de "Mis servicios"
            const services = data.sections.servicios.services;
            document.querySelectorAll('.servicios .caja-servicios h4').forEach((element, index) => {
                element.textContent = services[index].name;
            });
            document.querySelectorAll('.servicios .caja-servicios p').forEach((element, index) => {
                element.textContent = services[index].description;
            });

            // Traducción de los trabajos en la sección "Mis trabajos"
            const trabajos = data.sections.trabajos.works;
            document.querySelectorAll('.galeria-work .textos-work h4').forEach((element, index) => {
                element.textContent = trabajos[index].name;
            });

            // Traducción del texto en el footer
            document.querySelector('footer p').textContent = data.footer.brand;
            // Traducción de "Mis trabajos"
            document.querySelector('#trabajo h3').textContent = data.sections.trabajos.title;
            document.querySelector('#trabajo p.after').textContent = data.sections.trabajos.description;
            
            // Traducción de categorías de trabajo
            const categories = document.querySelectorAll('.botones-work ul li');
            categories.forEach((category, index) => {
                category.textContent = data.sections.trabajos.categories[index];
            });
            
            // Traducción de los nombres de los trabajos
            const works = document.querySelectorAll('.galeria-work .textos-work h4');
            works.forEach((work, index) => {
                work.textContent = data.sections.trabajos.works[index].name;
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo de idioma:', error);
        });
        
            
        
                    
                
                
                    
                
        
}


