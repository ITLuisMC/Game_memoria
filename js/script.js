var cbien = 0;
var cmal = 0;
var botonStart = document.getElementById("start");
var botonReiniciar = document.getElementById("reiniciar");

let iniciarTiempo;
let segundos = 0;
let minutos;

function actualizarContador() {

    let segundosTextos;
    let minutosTextos;

    segundos--;

    if (segundos <= 0) {
        segundos = 59;
        minutos--;
    }

    if (minutos < 0) {
        segundos = 0;
        minutos = 0;
        clearInterval(iniciarTiempo);

        if (confirm("Lo siento...perdiste. ¿Volver a jugar?")) {
            console.log("Diste si");
            recargar();
        } else {
            console.log("Diste no");
            recargar();
        }

    }

    segundosTextos = segundos;
    minutosTextos = minutos;

    if (segundos < 10) {
        segundosTextos = `0${segundos}`;
    }

    if (minutos < 10) {
        minutosTextos = `0${minutos}`;
    }

    document.querySelector("#minutos").innerText = minutosTextos;
    document.querySelector("#segundos").innerText = segundosTextos;

}

function comparar() {

    let aciertos = document.getElementById("aciertos");
    let fallos = document.getElementById("fallos");
    let activos = document.querySelectorAll(".activo");
    let carta1 = localStorage.carta1;
    let carta2 = localStorage.carta2;
    let icono1 = activos[0].firstElementChild.textContent;
    let icono2 = activos[1].firstElementChild.textContent;

    localStorage.setItem('carta1', "vacio");
    localStorage.setItem('carta2', "vacio");

    if ((icono1 === icono2) && (carta1 !== carta2)) {

        let aciertoSonido = cargarSonido("assets/sonidos/acierto.mp3");

        activos.forEach(element => {
            element.classList.remove("activo");
            element.firstElementChild.classList.remove("ocultar");
        });
        cbien = cbien + 1;
        aciertos.innerHTML = `Aciertos ${cbien.toString()}`;

    } else {

        let falloSonido = cargarSonido("assets/sonidos/error.mp3");

        activos.forEach(element => {
            element.classList.remove("activo");
            element.firstElementChild.classList.add("ocultar");
            element.onclick = destapar;
        });
        cmal = cmal + 1;
        fallos.innerHTML = `Fallos ${cmal.toString()}`;

    }

    let tarjetas = document.getElementsByClassName("tarjeta__contenido");
    let contador = 0;

    for (const key in tarjetas) {

        if (tarjetas[key].className === "tarjeta__contenido") {
            contador++;
            console.log(contador);
        }

    }

    if (contador == tarjetas.length && segundos != 0 && minutos != 0) {
        clearInterval(iniciarTiempo);
        if (confirm("Enhorabuena!! Ganaste!! ¿Volver a jugar?")) {
            recargar();
        } else {
            recargar();
        }
    }
}

function destapar(e) {

    let objetivo = e.currentTarget;

    objetivo.classList.add("activo");
    objetivo.firstElementChild.classList.remove("ocultar");

    let destaparSonido = cargarSonido("assets/sonidos/carta.mp3");

    if (localStorage.carta1 === "vacio") {

        localStorage.setItem('carta1', objetivo.firstElementChild.title);
        objetivo.onclick = "";

    } else {

        var timout;

        localStorage.setItem('carta2', objetivo.firstElementChild.title);
        objetivo.onclick = "";
        objetivo.firstElementChild.classList.remove("ocultar");

        timout = setTimeout(function () {
            comparar();
        }, 250, "JavaScript");

    }

}

function reparteTarjetas() {

    minutos = parseInt(document.querySelector("select").value);

    var grupoTarjetas = [{
            "erizo": "🦔"
        },
        {
            "gorila": "🦍"
        },
        {
            "mono": "🦧"
        },
        {
            "zorro": "🦊"
        },
        {
            "mofeta": "🦨"
        },
        {
            "conejo": "🐇"
        },
        {
            "ardilla": "🐿"
        },
        {
            "buho": "🦉"
        },
        {
            "perro": "🐶"
        },
        {
            "koala": "🐨"
        },
        {
            "leon": "🦁"
        },
        {
            "tigre": "🐯"
        }
    ];

    var tarjetas = shuffle(
        grupoTarjetas.concat(grupoTarjetas)
    );

    var mesa = document.querySelector("#mesa");


    mesa.innerHTML = "";

    tarjetas.forEach((element, index) => {
        for (const key in element) {
            var tarjeta = document.createElement("div");
            mesa.appendChild(tarjeta);
            var ultimo = mesa.lastChild;
            ultimo.classList.add("tarjeta");
            ultimo.innerHTML = `<div class="tarjeta__contenido ocultar" title="${key}-${index}">${element[key]}</div>`;
            ultimo.onclick = destapar;
        }
    });

    document.getElementById("panel").classList.remove("oculto");
    document.getElementById("reiniciar").classList.remove("desaparecido")
    document.querySelector("select").remove();
    document.getElementById("start").remove();
    document.querySelector("header").remove();

    iniciarTiempo = setInterval(actualizarContador, 1000)

}

//-BARAJAR NIVEl PRO
function shuffle(array) {

    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;

}

function recargar() {
    window.location.reload();
}

const cargarSonido = (fuente)=> {
    
    const sonido = document.getElementsByTagName("audio")[0];

    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none";

    document.body.appendChild(sonido);

    return sonido;
};



localStorage.clear();
localStorage.setItem('carta1', "vacio");
localStorage.setItem('carta2', "vacio");

botonStart.addEventListener("click", reparteTarjetas);
botonReiniciar.addEventListener("click", recargar);