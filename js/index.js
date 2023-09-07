// Canvas
const canvas = document.getElementById("canvas").getContext("2d");

// Tabla de coordenadas
const pointTable = document.getElementById("pointTable"),
  rows = pointTable.getElementsByTagName("tr");

// campos de entrada
const translateX = document.getElementById("translateX"),
  transalateY = document.getElementById("translateY"),
  scaleValue = document.getElementById("scaleValue"),
  rotationValue = document.getElementById("rotationValue"),
  shearX = document.getElementById("shearX"),
  shearY = document.getElementById("shearY");

// Botones
const btnDrawPolygon = document.getElementById("btnDrawPolygon"),
  btnApplyTransformations = document.getElementById("btnApplyTransformations"),
  btnRestart = document.getElementById("btnRestart");

// Checkboxes
const cbTranslation = document.getElementById("cbTranslation"),
  cbScale = document.getElementById("cbScale"),
  cbRotation = document.getElementById("cbRotation"),
  cbShear = document.getElementById("cbShear");

// Variables para las opciones de transformación
let translationOption = false,
  scalingOption = false,
  rotationOption = false,
  shearOption = false;

// Array para guardar las coordenadas del polígono
const polygonArray = [];

// Constantes
const MIN = -10,
  MAX = 10,
  CANVAS_MIDDLE = 300,
  CANVAS_SIZE = 600;

// Funciones para convertir de coordenadas cartesianas a coordenadas de píxeles
const pixelX = (x) => ((x - MIN) / (MAX - MIN)) * CANVAS_SIZE;
const pixelY = (y) => ((y - MAX) / (MIN - MAX)) * CANVAS_SIZE;

// Función para dibujar el Plano Cartesiano
const drawPlane = () => {
  canvas.lineWidth = 2; // Grosor de la línea
  canvas.strokeStyle = "#cfcfcf"; // Color de la línea
  canvas.font = "normal 12px Arial"; // Tipo de fuente
  canvas.fillStyle = "#8b8b8b"; // Color de la fuente

  // Eje X
  canvas.beginPath();
  canvas.moveTo(CANVAS_MIDDLE, 0);
  canvas.lineTo(CANVAS_MIDDLE, CANVAS_SIZE);
  canvas.stroke();
  canvas.closePath();

  // Eje Y
  canvas.beginPath();
  canvas.moveTo(0, CANVAS_MIDDLE);
  canvas.lineTo(CANVAS_SIZE, CANVAS_MIDDLE);
  canvas.stroke();
  canvas.closePath();

  let value = MIN;

  // Etiquetas de escala en el eje X
  for (let x = 0; x <= CANVAS_SIZE; x += 60) {
    if (value !== 0) {
      canvas.fillText(value, x, CANVAS_MIDDLE + 14); // Valor, posición en X, posición en Y
    }
    value += 2;
  }

  value = MAX;

  //Etiquetas de escala en el eje Y
  for (let y = 0; y <= CANVAS_SIZE; y += 60) {
    if (value !== 0) {
      canvas.fillText(value, CANVAS_MIDDLE + 4, y + 5); // Valor, posición en Y, posición en Y
    }
    value -= 2;
  }

  // Etiquetas de los ejes
  canvas.font = "normal 20px Arial";
  canvas.fillStyle = "#cfcfcf";
  canvas.fillText("X", CANVAS_SIZE, CANVAS_MIDDLE - 10);
  canvas.fillText("-X", 0, CANVAS_MIDDLE - 10);
  canvas.fillText("Y", CANVAS_MIDDLE - 20, 20);
  canvas.fillText("-Y", CANVAS_MIDDLE - 25, CANVAS_SIZE);
};

// Limpiar el canvas
const clearCanvas = () => {
  canvas.clearRect(0, 0, CANVAS_SIZE + 15, CANVAS_SIZE + 15);
  drawPlane();
};

// Actualizar el canvas
const updateCanvas = () => {
  clearCanvas();
  drawPlane();
  drawPolygon(canvas, polygonArray);
};

// Función para dibujar el Polígono
const drawPolygon = (canvas, points) => {
  canvas.strokeStyle = "#f00"; // Color de la línea
  canvas.font = "normal 10px Arial"; // Tipo de fuente
  canvas.fillStyle = "#7b7b7b"; // Color de la fuente

  let [X, Y] = points[0];

  canvas.beginPath();
  canvas.moveTo(pixelX(X), pixelY(Y));

  for (let i = 1; i < points.length; i++) {
    let [Xi, Yi] = points[i];
    canvas.lineTo(pixelX(Xi), pixelY(Yi));
  }

  canvas.lineTo(pixelX(X), pixelY(Y)); // Cerrar el polígono
  canvas.stroke();
  canvas.closePath();
};

// Función para validar el input
const validateInput = (value) => value !== "" && !isNaN(value);

// Función para trasladar el polígono
const translatePolygon = (x, y) => {
  if (validateInput(x) && validateInput(y)) {
    for (let i = 0; i < polygonArray.length; i++) {
      polygonArray[i][0] += x; // Trasladar en la dirección X
      polygonArray[i][1] += y; // Trasladar en la dirección Y
    }
  } else {
    alert("Debe ingresar valores válidos para la traslación.");
  }
};

// Función para escalar el polígono
const scalePolygon = (scaleFactor) => {
  if (validateInput(scaleFactor)) {
    for (let i = 0; i < polygonArray.length; i++) {
      polygonArray[i][0] *= scaleFactor; // Escalar en la dirección X
      polygonArray[i][1] *= scaleFactor; // Escalar en la dirección Y
    }
  } else {
    alert("Debe ingresar un valor válido para el escalamiento.");
  }
};

// Función para rotar el polígono en radianes
const rotatePolygon = (angleDegrees) => {
  if (validateInput(angleDegrees)) {
    const radians = (angleDegrees * Math.PI) / 180; // Convertir a radianes

    for (let i = 0; i < polygonArray.length; i++) {
      const [x, y] = polygonArray[i];
      const newX = x * Math.cos(radians) - y * Math.sin(radians);
      const newY = x * Math.sin(radians) + y * Math.cos(radians);
      // Redondear a 2 decimales y convertir a número
      polygonArray[i][0] = parseFloat(newX.toFixed(2));
      polygonArray[i][1] = parseFloat(newY.toFixed(2));
    }    
  } else {
    alert("Debe ingresar un valor válido para la rotación.");
  }
};

// Función para sesgar el polígono en el eje X
const shearInX = (shearFactorX) => {
  if (validateInput(shearFactorX)) {
    for (let i = 0; i < polygonArray.length; i++) {
      const [x, y] = polygonArray[i];
      polygonArray[i][0] = x + shearFactorX * y;
    }
  } else {
    alert("Debe ingresar un valor válido para el sesgo en X.");
  }
};

// Función para sesgar el polígono en el eje Y
const shearInY = (shearFactorY) => {
  if (validateInput(shearFactorY)) {
    for (let i = 0; i < polygonArray.length; i++) {
      const [x, y] = polygonArray[i];
      polygonArray[i][1] = y + shearFactorY * x;
    }
  } else {
    alert("Debe ingresar un valor válido para el sesgo en Y.");
  }
};

// Función para vaciar y actualizar los datos de la tabla
const clearAndRefreshTable = () => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const xInput = cells[1].querySelector("input");
    const yInput = cells[2].querySelector("input");

    // Vaciar los campos de la tabla
    xInput.value = "";
    yInput.value = "";

    if (i < polygonArray.length) {
      // Si hay datos en polygonArray, actualizar la tabla con los valores actuales
      xInput.value = polygonArray[i][0];
      yInput.value = polygonArray[i][1];
    }
  }
};

// Función para dibujar el polígono
btnDrawPolygon.addEventListener("click", () => {
  let isValid = true; // Variable de control para rastrear la validación de todas las unidades

  // Obtener las coordenadas de la tabla
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const xInput = cells[1].querySelector("input");
    const yInput = cells[2].querySelector("input");

    // Si alguno punto está vacío, se omite
    if (xInput.value !== "" && yInput.value !== "") {
      const x = parseInt(xInput.value);
      const y = parseInt(yInput.value);

      // Validar los campos
      if (!validateInput(x) || !validateInput(y)) {
        isValid = false; // Un punto no cumple con la validación
        polygonArray.length = 0; // Vaciar el array
        break; // Salir del bucle
      }

      polygonArray.push([x, y]); // Meter las coordenadas al array
    }
  }

  // Verificar si se han ingresado al menos 3 puntos válidos
  if (polygonArray.length >= 3 && isValid) {
    drawPolygon(canvas, polygonArray);
    btnDrawPolygon.disabled = true;
    btnApplyTransformations.disabled = false;
    btnRestart.disabled = false;
  } else {
    polygonArray.length = 0;
    alert("Debe ingresar al menos 3 puntos válidos para dibujar un polígono.");
  }
});

// Aplicar las transformaciones
btnApplyTransformations.addEventListener("click", () => {
  console.log(polygonArray); // Visualizar el array en la consola

  if (translationOption) {
    const translationX = parseFloat(translateX.value) || 0;
    const translationY = parseFloat(transalateY.value) || 0;
    translatePolygon(translationX, translationY);
  }

  if (scalingOption) {
    const scale = parseFloat(scaleValue.value) || 1;
    scalePolygon(scale);
  }

  if (rotationOption) {
    const rotationDegrees = parseFloat(rotationValue.value) || 0;
    rotatePolygon(rotationDegrees);
  }

  if (shearOption) {
    const shearXValue = parseFloat(shearX.value) || 0;
    const shearYValue = parseFloat(shearY.value) || 0;
    shearInX(shearXValue);
    shearInY(shearYValue);
  }

  updateCanvas();
  clearAndRefreshTable();
});

// Botón para reiniciar
btnRestart.addEventListener("click", () => {
  polygonArray.length = 0;
  btnDrawPolygon.disabled = false;
  btnApplyTransformations.disabled = true;
  btnRestart.disabled = true;
  translateX.value = "";
  transalateY.value = "";
  scaleValue.value = "";
  rotationValue.value = "";
  shearX.value = "";
  shearY.value = "";

  clearCanvas();
  clearAndRefreshTable();
});

// Checkbox de translación
cbTranslation.addEventListener("change", () => {
  if (cbTranslation.checked) {
    translationOption = true;
    translateX.disabled = false;
    transalateY.disabled = false;
  } else {
    translationOption = false;
    translateX.disabled = true;
    transalateY.disabled = true;
    translateX.value = "";
    transalateY.value = "";
  }
});

// Checkbox de escalamiento
cbScale.addEventListener("change", () => {
  if (cbScale.checked) {
    scalingOption = true;
    scaleValue.disabled = false;
  } else {
    scalingOption = false;
    scaleValue.disabled = true;
    scaleValue.value = "";
  }
});

// Checkbox de rotación
cbRotation.addEventListener("change", () => {
  if (cbRotation.checked) {
    rotationOption = true;
    rotationValue.disabled = false;
  } else {
    rotationOption = false;
    rotationValue.disabled = true;
    rotationValue.value = "";
  }
});

// Checkbox de sesgo
cbShear.addEventListener("change", () => {
  if (cbShear.checked) {
    shearOption = true;
    shearX.disabled = false;
    shearY.disabled = false;
  } else {
    shearOption = false;
    shearX.disabled = true;
    shearY.disabled = true;
    shearX.value = "";
    shearY.value = "";
  }
});

drawPlane(); // Dibujar el plano al comienzo
