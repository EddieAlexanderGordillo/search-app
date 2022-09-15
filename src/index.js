// Variables
const brand = document.querySelector('#brand');
const year = document.querySelector('#year');
const minimum = document.querySelector('#minimum');
const maximum = document.querySelector('#maximum');
const doors = document.querySelector('#doors');
const transmission = document.querySelector('#transmission');
const color = document.querySelector('#color');

const resultado = document.querySelector('#result');

const max = new Date().getFullYear();
const min = max - 12;

// Generar un objeto con la busqueda
const datoBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};
brand.addEventListener('change', (e) => {
  datoBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener('change', (e) => {
  datoBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});
minimum.addEventListener('change', (e) => {
  datoBusqueda.minimo = e.target.value;
  filtrarAuto();
});
maximum.addEventListener('change', (e) => {
  datoBusqueda.maximo = e.target.value;
  filtrarAuto();
});
doors.addEventListener('change', (e) => {
  datoBusqueda.puertas = e.target.value;
  filtrarAuto();
});
transmission.addEventListener('change', (e) => {
  datoBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener('change', (e) => {
  datoBusqueda.color = e.target.value;
  filtrarAuto();
});
// Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //muestra los autos al cargar
  // llena las opciones de años
  llenarselect();
});

// Funciones
function mostrarAutos(autos) {
  limpiarHtml();
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHtml = document.createElement('p');
    autoHtml.className = 'paragraphCar';
    autoHtml.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision}
         - Precio: ${precio} - Color: ${color}
        `;
    resultado.appendChild(autoHtml);
  });
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarselect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  console.log(resultado);
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHtml();
  const noResultado = document.createElement('div');
  noResultado.classList.add('error');
  noResultado.textContent =
    'No Hay Resultados, Intenta con otros términos de búsqueda ';
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  if (datoBusqueda.marca) {
    return auto.marca === datoBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datoBusqueda.year) {
    return auto.year === datoBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  if (datoBusqueda.minimo) {
    return auto.precio >= parseInt(datoBusqueda.minimo);
  }
  return auto;
}

function filtrarMaximo(auto) {
  if (datoBusqueda.maximo) {
    return auto.precio <= datoBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datoBusqueda.puertas) {
    return auto.puertas === parseInt(datoBusqueda.puertas);
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datoBusqueda.transmision) {
    return auto.transmision === datoBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datoBusqueda.color) {
    return auto.color === datoBusqueda.color;
  }
  return auto;
}
