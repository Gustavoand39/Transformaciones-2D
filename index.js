const pCartesiano = document.getElementById("pCartesiano").getContext("2d");

// Convertir las unidades a coordenadas en píxeles
const pixelX = (x) => {
  return ((x - -10) / (10 - -10)) * 600;
};

const pixelY = (y) => {
  return ((y - 10) / (-10 - 10)) * 600;
};

// Función para dibujar el Plano Cartesiano
const dibujarPlano = () => {
  pCartesiano.lineWidth = 1; // Grosor de la línea
  pCartesiano.strokeStyle = "#999"; // Color de la línea
  pCartesiano.font = "normal 12px Arial"; // Tipo de fuente
  pCartesiano.fillStyle = "#777"; // Color de la fuente

  // Eje X
  pCartesiano.beginPath();
  pCartesiano.moveTo(300, 0);
  pCartesiano.lineTo(300, 600);
  pCartesiano.stroke();
  pCartesiano.closePath();

  // Eje Y
  pCartesiano.beginPath();
  pCartesiano.moveTo(0, 300);
  pCartesiano.lineTo(600, 300);
  pCartesiano.stroke();
  pCartesiano.closePath();

  let valor = -10;

  // Etiquetas de escala en el eje X
  for (let x = 0; x <= 600; x += 60) {
    pCartesiano.fillText(valor, x, 300); // Valor, Posición en X, posición en Y
    valor += 2;
  }

  valor = 10;

  //Etiquertas de escala en el eje Y
  for (let y = 0; y <= 600; y += 60) {
    pCartesiano.fillText(valor, 300, y); // Valor, Posición en X, posición en Y
    valor -= 2;
  }
};

// Función para dibujar el Polígono en el plano
const dibujarPoligono = (pCartesiano, coordenadas) => {
  pCartesiano.strokeStyle = "#f00"; // Color de la línea

  pCartesiano.beginPath();
  pCartesiano.moveTo(pixelX(coordenadas[0][0]), pixelY(coordenadas[0][1]));

  for (let i = 1; i < coordenadas.length; i++) {
    pCartesiano.lineTo(pixelX(coordenadas[i][0]), pixelY(coordenadas[i][1]));
  }

  pCartesiano.stroke();
  pCartesiano.closePath();
};

const poligono = [
  [4, 10],
  [6, 10],
  [6, 8],
  [4, 8],
  [4, 10],
];

dibujarPlano();

dibujarPoligono(pCartesiano, poligono);
