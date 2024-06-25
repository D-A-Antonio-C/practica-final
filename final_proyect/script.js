document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map').setView([-12.046374, -77.042793], 6); // Centrar el mapa en Lima, Perú
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Variable para almacenar los marcadores por tipo de evento
  var markers = {};
  
  // Función para agregar marcadores al mapa
  function agregarMarcadores(data) {
    data.forEach(function (item) {
      var tipoEvento = item["tipo_de_evento"]; // Corregido: tipo_de_evento en lugar de tipo de evento
      
      if (!markers[tipoEvento]) {
        markers[tipoEvento] = L.layerGroup().addTo(map);
      }
      
      var marker = L.marker([item.coordenadas[0], item.coordenadas[1]]).bindPopup(item.nombre);
      markers[tipoEvento].addLayer(marker);
    });
  }
  
  // Cargar los datos del JSON y agregar los marcadores
  fetch('evento.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      agregarMarcadores(data);
      generarCheckboxes(data);
    })
    .catch(function (error) {
      console.error('Error al cargar los datos:', error);
    });
  
  // Función para generar dinámicamente los checkboxes
  function generarCheckboxes(data) {
    var eventTypeForm = document.getElementById('eventTypeForm');
    var tiposEventos = obtenerTiposDeEventos(data);
    
    tiposEventos.forEach(function (tipoEvento) {
      var label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" name="${tipoEvento}" checked>${tipoEvento}`;
      
      label.querySelector('input').addEventListener('change', function () {
        if (this.checked) {
          map.addLayer(markers[tipoEvento]);
        } else {
          map.removeLayer(markers[tipoEvento]);
        }
      });
      
      eventTypeForm.appendChild(label);
      eventTypeForm.appendChild(document.createElement('br'));
    });
  }
  
  // Función para obtener tipos de eventos únicos del JSON
  function obtenerTiposDeEventos(data) {
    var tiposEventos = [];
    data.forEach(function (item) {
      var tipoEvento = item["tipo_de_evento"]; // Corregido: tipo_de_evento en lugar de tipo de evento
      if (!tiposEventos.includes(tipoEvento)) {
        tiposEventos.push(tipoEvento);
      }
    });
    return tiposEventos;
  }
});

