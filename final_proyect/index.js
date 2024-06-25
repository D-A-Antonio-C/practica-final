function eventos_info(){
    fetch('evento.json')
    .then( response => response.json())
    .then(data =>{
        data.forEach(punto =>{
            // Crear el elemento div con la clase "card"
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.style.width = '18rem';

            // Crear la imagen dentro de la tarjeta
            let img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = `img/${punto.codigo}.jpg`;  // URL de la imagen
            img.alt = '';

            // Crear el primer div con clase "card-body"
            let cardBody1Div = document.createElement('div');
            cardBody1Div.className = 'card-body';

            // Crear el título dentro del primer div "card-body"
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = punto.nombre;  // título dinámico

            // Crear el párrafo con clase "card-text" dentro del primer div "card-body"
            let cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.textContent = punto.descripcion_corta;  // descripción dinámica

            // Añadir el título y el párrafo al primer div "card-body"
            cardBody1Div.appendChild(cardTitle);
            cardBody1Div.appendChild(cardText);

            // Crear el segundo div con clase "card-body"
            let cardBody2Div = document.createElement('div');
            cardBody2Div.className = 'card-body';

            // Crear el botón "Mas info"
            let masInfoButton = document.createElement('button');
            masInfoButton.className = 'btn btn-primary';
            masInfoButton.textContent = 'Mas info';  // el texto del botón dinámico
            masInfoButton.setAttribute('type', 'button');

            function handleClick() {
                moreInfo(punto.codigo)
            }

            masInfoButton.onclick = handleClick;

            // Añadir los atributos necesarios para el modal de Bootstrap
            masInfoButton.setAttribute('data-bs-toggle', 'modal');
            masInfoButton.setAttribute('data-bs-target', '#exampleModal');

            // Crear el botón "Comprar"
            let comprarButton = document.createElement('button');
            comprarButton.className = 'btn btn-success';
            comprarButton.textContent = 'Comprar';  // texto del botón dinámico

            // Añadir los botones al segundo div "card-body"
            cardBody2Div.appendChild(masInfoButton);
            cardBody2Div.appendChild(comprarButton);

            // Agregar la imagen, los divs de "card-body" y sus contenidos al div principal "card"
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody1Div);
            cardDiv.appendChild(cardBody2Div);

            // Obtener el contenedor donde quieres añadir la tarjeta
            let container = document.getElementById('micontenedor');  // id del contenedor

            // Añadir la tarjeta al contenedor
            container.appendChild(cardDiv);

            //la extension del codigo es debido al bootstrap :c
            /*
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">title</h1>
                    <p class="card-text">description</p>
                </div>
                <div class="card-body">
                    <button href="#">Mas info</button>
                    <button href="#">comprar</button>
                </div>
            </div>
            */
        });
    }
    )
}

function moreInfo(codigo){
    let x=codigo-1
    fetch('evento.json')
    .then(response => response.json())
    .then(data =>{
        // Obtener el elemento h1 por su ID
        let miTitulo = document.getElementById('modal-title');

        // Cambiar el contenido del h1
        miTitulo.textContent = data[x].nombre;

        // Obtener el elemento img por su ID
        let miImagen = document.getElementById('modal-img');

        // Cambiar la imagen
        miImagen.src = `img/${data[x].codigo}.jpg`; // Ruta de la nueva imagen que deseas mostrar

        // Obtener el elemento h1 por su ID
        let mitexto = document.getElementById('modal-p');

        // Cambiar el contenido del h1
        mitexto.textContent = data[x].descripcion_larga;

        console.log(data[x].coordenadas[0])
        console.log(data[x].coordenadas[1])

        

        map1.setView([data[x].coordenadas[0],data[x].coordenadas[1]], 15);
        L.marker([data[x].coordenadas[0],data[x].coordenadas[1]]).addTo(map1);


    })
}

function abrirModal() {
    modalContent.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    modalContent.style.display = 'none';
}

function mapa(x,y){
    map.setView([x,y], 10);
}
