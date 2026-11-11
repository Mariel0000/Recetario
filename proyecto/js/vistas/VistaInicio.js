export class VistaInicio {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.elemento = null;
        this.render();
    }

    render() {
        this.elemento = document.createElement('div');
        this.elemento.className = 'vista-inicio';

        const heroSeccion = document.createElement('div');
        heroSeccion.className = 'hero-seccion';

        const titulo = document.createElement('h2');
        titulo.textContent = '¡Bienvenido al Recetario!';
        heroSeccion.appendChild(titulo);

        const parrafo = document.createElement('p');
        parrafo.textContent = 'Explora miles de recetas de todo el mundo';
        heroSeccion.appendChild(parrafo);

        const tarjetaDestacada = document.createElement('div');
        tarjetaDestacada.className = 'tarjeta-destacada';

        const tituloTarjeta = document.createElement('h3');
        tituloTarjeta.textContent = 'Receta Destacada del Día';
        tarjetaDestacada.appendChild(tituloTarjeta);

        this.contenedorReceta = document.createElement('div');
        this.contenedorReceta.id = 'contenido-receta-azar';
        this.contenedorReceta.className = 'cargando-receta';
        
        const textoCargando = document.createElement('p');
        textoCargando.textContent = 'Cargando receta destacada...';
        this.contenedorReceta.appendChild(textoCargando);
        tarjetaDestacada.appendChild(this.contenedorReceta);

        this.btnOtra = document.createElement('button');
        this.btnOtra.id = 'btn-otra-receta';
        this.btnOtra.className = 'btn-principal';
        this.btnOtra.textContent = 'Otra receta';
        tarjetaDestacada.appendChild(this.btnOtra);

        heroSeccion.appendChild(tarjetaDestacada);
        this.elemento.appendChild(heroSeccion);
        
        this.contenedor.appendChild(this.elemento);

        this.cargarRecetaAlAzar();
        this.configurarEventos();
    }

    async cargarRecetaAlAzar() {
        if (!this.contenedorReceta) return;
        
        this.contenedorReceta.className = 'cargando-receta';
        this.contenedorReceta.textContent = '';
        const pCargando = document.createElement('p');
        pCargando.textContent = 'Buscando otra delicia...';
        this.contenedorReceta.appendChild(pCargando);

        try {
            const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await respuesta.json();
            const receta = data.meals[0];

            this.contenedorReceta.className = 'receta-card-info';
            this.contenedorReceta.textContent = '';

            const img = document.createElement('img');
            img.src = receta.strMealThumb;
            img.alt = receta.strMeal;
            img.className = 'img-receta-azar';
            this.contenedorReceta.appendChild(img);

            const infoTexto = document.createElement('div');
            infoTexto.className = 'info-texto';

            const h4 = document.createElement('h4');
            h4.textContent = receta.strMeal;
            infoTexto.appendChild(h4);

            const pMeta = document.createElement('p');
            const strongCat = document.createElement('strong');
            strongCat.textContent = 'Categoría: ';
            pMeta.appendChild(strongCat);
            pMeta.append(receta.strCategory + ' | ');
            const strongArea = document.createElement('strong');
            strongArea.textContent = 'Origen: ';
            pMeta.appendChild(strongArea);
            pMeta.append(receta.strArea);
            infoTexto.appendChild(pMeta);

            const pInstrucciones = document.createElement('p');
            pInstrucciones.className = 'instrucciones-resumen';
            pInstrucciones.textContent = receta.strInstructions;
            infoTexto.appendChild(pInstrucciones);

            this.contenedorReceta.appendChild(infoTexto);
        } catch (error) {
            if (!this.contenedorReceta) return;
            this.contenedorReceta.textContent = '';
            const pError = document.createElement('p');
            pError.className = 'error';
            pError.textContent = 'No se pudo cargar la receta destacada. Intenta de nuevo.';
            this.contenedorReceta.appendChild(pError);
        }
    }

    configurarEventos() {
        this.eventoClickBtn = () => {
            this.cargarRecetaAlAzar();
        };
        this.btnOtra.addEventListener('click', this.eventoClickBtn);
    }

    destruir() {
        if (this.btnOtra && this.eventoClickBtn) {
            this.btnOtra.removeEventListener('click', this.eventoClickBtn);
        }
        if (this.elemento) {
            this.elemento.remove();
            this.elemento = null;
        }
    }
}
