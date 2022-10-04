const inputLangostelvis = document.getElementById('langostelvis')
const inputTucapalma = document.getElementById('tucapalma')
const inputPydos = document.getElementById('pydos')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')    
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')  
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')   
const botonSeleccionar = document.getElementById('boton-seleccionar')
const botonReiniciar = document.getElementById('boton-reiniciar') 
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque') 
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota') 
const contenedorTarjetas = document.getElementById('contenedor-tarjetas') 
const contenedorAtaques = document.getElementById('contenedor-ataques') 
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const tituloMapa = document.getElementById('titulo-mapa')
const botonesMapa = document.getElementById('botones-mapa')


let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let botonFuego 
let botonAgua 
let botonTierra 
let ataqueJugador 
let ataqueEnemigo 
let resutado_combate 
let ataquesMokepon
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let seleccionJugador
let mascotaJugadorObjeto


let mokepones = []
let botones = []
let ataquesJugador = []
let ataquesEnemigo = []

let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground=new Image()
mapaBackground.src='./assets/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa=window.innerWidth-20
const anchoMaximoDelMapa=480

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}
//mapa.width = 700
    //mapa.height = 480
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width= anchoDelMapa
mapa.height= alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x= aleatorio(0,mapa.width-this.ancho)
        this.y= aleatorio(0,mapa.height-this.alto)    
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')


hipodoge.ataques.push(
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'fuego 🔥',id:'boton-fuego'}
)

capipepo.ataques.push(
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'fuego 🔥',id:'boton-fuego'}
)

ratigueya.ataques.push(
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'agua 💧',id:'boton-agua'}
)



hipodogeEnemigo.ataques.push(
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'fuego 🔥',id:'boton-fuego'}
)

capipepoEnemigo.ataques.push(
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'agua 💧',id:'boton-agua'},
    {nombre:'fuego 🔥',id:'boton-fuego'}
)

ratigueyaEnemigo.ataques.push(
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'fuego 🔥',id:'boton-fuego'},
    {nombre:'tierra 🌱',id:'boton-tierra'},
    {nombre:'agua 💧',id:'boton-agua'}
)


mokepones.push(hipodoge,capipepo,ratigueya)


//INCIIA EL JUEGO
window.addEventListener('load', ()=>{
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    botonReiniciar.style.display = 'none'
    cargaMokepones()
 
})

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//FUNCIONES
function cargaMokepones(){
    mokepones.forEach((mokepon => {
        opcionDeMokepones = `
            <input type="radio" id=${mokepon.nombre} name="mascota"> 
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}> 
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>                
            </label>        
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    }))
}

botonSeleccionar.addEventListener('click',()=>{
    seleccionarMascotaJugador()
    if(seleccionJugador == "No Mascota"){
        alert("Elige a tu mascota")
    }else{        
        sectionSeleccionarMascota.style.display = 'none'
        pintarCanvas()  
    }
   
})

function pintarCanvas(){
    //mapa.width = 700
    //mapa.height = 480
    sectionVerMapa.style.display = 'flex'      
    mascotaJugadorObjeto=obtenerObjetoMascota(seleccionJugador)  
    intervalo = setInterval(pintarCanvas, 5)
    window.addEventListener('keydown',sePresionoUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)

    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x+mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y+mascotaJugadorObjeto.velocidadY
   
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if(mascotaJugadorObjeto.velocidadX!==0 || mascotaJugadorObjeto.velocidadY!==0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX=1
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX=-1
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY=1
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY=-1
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':moverArriba()
        break
    case 'ArrowDown':moverAbajo()
        break
    case 'ArrowLeft':moverIzquierda()
        break
    case 'ArrowRight':moverDerecha()
        break
    default:
        break
    }
}

function obtenerObjetoMascota(){
    for(let i=0;i<mokepones.length;i++){
        if(seleccionJugador===mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y+enemigo.alto
    const derechaEnemigo=enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x
    const arribaMascota=mascotaJugadorObjeto.y
    const abajoMascota=mascotaJugadorObjeto.y+mascotaJugadorObjeto.alto
    const derechaMascota=mascotaJugadorObjeto.x+mascotaJugadorObjeto.ancho
    const izquierdaMascota=mascotaJugadorObjeto.x
    if(abajoMascota<arribaEnemigo || arribaMascota>abajoEnemigo || derechaMascota<izquierdaEnemigo || izquierdaMascota>derechaEnemigo){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    alert("Inicia la batalla "+  mascotaJugadorObjeto.nombre + " vs " + enemigo.nombre)    
    sectionSeleccionarAtaque.style.display = 'flex'    
    sectionVerMapa.style.display = 'none'   
    sectionVerMapa
    mapa.style.display = 'none'   
    tituloMapa.style.display = 'none' 
    botonesMapa.style.display = 'none' 
    seleccionarMascotaEnemigo(enemigo.nombre, enemigo.ataques)
  
             
}


function seleccionarMascotaJugador(){
 
    if(inputHipodoge.checked){        
        seleccionJugador = inputHipodoge.id        
    }else if(inputCapipepo.checked){
        seleccionJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        seleccionJugador = inputRatigueya.id
    }else{
        seleccionJugador = "No Mascota"        
    }  
    
    if(seleccionJugador != "No Mascota"){
        spanMascotaJugador.innerHTML = seleccionJugador
    extraerAtaques(seleccionJugador) 
    }
    
}

function extraerAtaques(seleccionJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(seleccionJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }        
    }    
    mostrarAtques(ataques)
}

function mostrarAtques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon =  `
            <button class="boton-de-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}


function seleccionarMascotaEnemigo(enemigo,ataques){   
    let seleccionEnemigo = enemigo
    spanMascotaEnemigo.innerHTML = seleccionEnemigo   
    ataquesMokeponEnemigo = ataques
    secuenciaAtaque()
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'fuego 🔥') {
                ataquesJugador.push('FUEGO')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'   
                boton.disabled = true
            } else if (e.target.textContent === 'agua 💧') {
                ataquesJugador.push('AGUA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataquesJugador.push('TIERRA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
            combate() 
        })
    })   
}

function ataqueAleatorioEnemigo(){ 
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataquesEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataquesEnemigo.push('AGUA')
    } else {
        ataquesEnemigo.push('TIERRA')
    }
    console.log(ataquesEnemigo)
}


function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataquesEnemigo[enemigo]
}

function combate() {        
    if (ataquesJugador.length === 5) {
        for (let index = 0; index < ataquesJugador.length; index++) {
            if(ataquesJugador[index] === ataquesEnemigo[index]) {
                indexAmbosOponente(index, index)
                crearMensaje("EMPATE")
            } else if (ataquesJugador[index] === 'FUEGO' && ataquesEnemigo[index] === 'TIERRA') {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            } else if (ataquesJugador[index] ==='AGUA' && ataquesEnemigo[index] === 'FUEGO') {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            } else if (ataquesJugador[index] === 'TIERRA' && ataquesEnemigo[index] === 'AGUA') {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            } else {
                indexAmbosOponente(index, index)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
        }
        revisarVidas()
    }
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('SE TERMINÓ EL JUEGO, EMPATE 👍')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('SE TERMINÓ EL JUEGO, GANASTE 😀')
    } else {
        crearMensajeFinal('SE TERMINÓ EL JUEGO, PERDISTE 😢')
    }
}

function crearMensaje(resultadoDelComabte) {
    let notificacion = document.createElement('p')    
    let nuevoAtaqueDelJugador = document.createElement('p')    
    let nuevoAtaqueDelEnemigo = document.createElement('p')    

    sectionMensajes.innerHTML = resultadoDelComabte
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoDelComabte) {  
    sectionMensajes.innerHTML = resultadoDelComabte    
    botonReiniciar.style.display = 'block'
}

botonReiniciar.addEventListener('click',()=>{
    location.reload()     
 })
 
 
 