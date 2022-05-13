const api = {
    key : '95d73da37de64357bd7ebec01a42f88c',
    url : 'https://api.openweathermap.org/data/2.5/weather'
} 

const card = document.getElementById('card');

const ciudad = document.getElementById('ciudad');
const fecha = document.getElementById('fecha');
const tempmid = document.getElementById('tempmid');
const temp = document.getElementById('temp');
const clima = document.getElementById('clima');
const rango = document.getElementById('rango');

function actualizarimagen(data) {
    const temp = toCelsius(data.main.temp);
    console.log(temp);
    let src = `images/temp-mid.png`;
    if (temp > 26 ) {
        src = `images/temp-high.png`;
    } else if ( temp < 20 ){
        src = `images/temp-low.png`;
    }
    tempmid.src = src;

}


async function buscar(query) {
    
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
    
    const data = await response.json();
    console.log(response);
    if(response.ok) {
        card.style.display = 'block';
        ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
        fecha.innerHTML = new Date().toLocaleDateString();
        temp.innerHTML = toCelsius(data.main.temp); 
        clima.innerHTML = data.weather[0].description;
        rango.innerHTML = `${toCelsius(data.main.temp_min)} / ${toCelsius(data.main.temp_max)}`
        actualizarimagen(data);
    } else {
        alert("Su ciudad no ha sido encontrada ):")
    }
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273,15)
}

function onsubmit(event) {

    event.preventDefault();
    
    buscar(buscarciudad.value);
}

const form = document.getElementById('busqueda');
const buscarciudad = document.getElementById('search');


buscarciudad.addEventListener('change', (event) => {
    console.log(event.target.value);
});

form.addEventListener('submit', onsubmit, true)