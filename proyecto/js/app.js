import { BarraNavegacion } from './componentes/BarraNavegacion.js';
import { VistaInicio } from './vistas/VistaInicio.js';

document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.getElementById('barra-nav');
    if (navElement) {
        const barraNav = new BarraNavegacion(navElement, { vistaActiva: 'inicio' });
    }

    const contenedorPrincipal = document.getElementById('app-main');
    let vistaActual = null;

    function cambiarVista(nombreVista) {
        if (vistaActual && typeof vistaActual.destruir === 'function') {
            vistaActual.destruir();
        }

        contenedorPrincipal.textContent = '';

        switch (nombreVista) {
            case 'inicio':
                vistaActual = new VistaInicio(contenedorPrincipal);
                break;
            case 'explorar':
                const divExp = document.createElement('div');
                const h2Exp = document.createElement('h2');
                h2Exp.textContent = 'Vista Explorar';
                const pExp = document.createElement('p');
                pExp.textContent = 'Filtros y recetas...';
                divExp.appendChild(h2Exp);
                divExp.appendChild(pExp);
                contenedorPrincipal.appendChild(divExp);
                break;
            case 'categorias':
                const divCat = document.createElement('div');
                const h2Cat = document.createElement('h2');
                h2Cat.textContent = 'Categorías y Orígenes';
                divCat.appendChild(h2Cat);
                contenedorPrincipal.appendChild(divCat);
                break;
            case 'comparador':
                const divComp = document.createElement('div');
                const h2Comp = document.createElement('h2');
                h2Comp.textContent = 'Comparador';
                divComp.appendChild(h2Comp);
                contenedorPrincipal.appendChild(divComp);
                break;
            default:
                const divDef = document.createElement('div');
                const h2Def = document.createElement('h2');
                h2Def.textContent = 'Página no encontrada';
                divDef.appendChild(h2Def);
                contenedorPrincipal.appendChild(divDef);
        }
    }

    cambiarVista('inicio');

    document.addEventListener('cambiarVista', (e) => {
        cambiarVista(e.detail.vista);
    });
});
