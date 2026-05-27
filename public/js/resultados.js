if(!localStorage.getItem('id_evaluacion')){
    window.location.href = '/';
}

async function cargarResultados(){

    try{

        const res = await fetch('/obtener-resultados');

        const datos = await res.json();

        document.getElementById('puntajeAutorregulacion').textContent =
        datos.puntaje_autorregulacion ?? '--';

        document.getElementById('puntajePostergacion').textContent =
        datos.puntaje_postergacion ?? '--';

        document.getElementById('puntajeTotal').textContent =
        datos.puntaje_total ?? '--';

        document.getElementById('nivelProcrastinacion').textContent =
        datos.nivel_procrastinacion ?? 'Sin resultado';

        activarSemaforo(datos.nivel_procrastinacion);

const porcentajeAutor =
((datos.puntaje_autorregulacion || 0) / 45) * 100;

const porcentajePost =
((datos.puntaje_postergacion || 0) / 15) * 100;

        document.getElementById('barraAutorregulacion').style.width =
        `${porcentajeAutor}%`;

        document.getElementById('barraPostergacion').style.width =
        `${porcentajePost}%`;

        document.getElementById('valorAutorregulacion').textContent =
        `${datos.puntaje_autorregulacion || 0}/45`;

        document.getElementById('valorPostergacion').textContent =
        `${datos.puntaje_postergacion || 0}/15`;

        let mensaje = '';
        let recomendaciones = [];

        if(datos.nivel_procrastinacion === 'Bajo'){

            mensaje =
            'Presentas una baja tendencia a postergar actividades académicas. Mantienes buenos hábitos de organización y cumplimiento.';

            recomendaciones = [
                'Continúa usando hábitos de estudio constantes.',
                'Mantén un calendario para conservar tu organización.',
                'Monitorea cambios en tu carga académica.',
                'Reserva pequeños espacios de descanso para evitar agotamiento.'
            ];

        }else if(datos.nivel_procrastinacion === 'Moderado'){

            mensaje =
            'Presentas algunas conductas de postergación que pueden mejorar con organización y seguimiento de tus actividades.';

            recomendaciones = [
                'Divide tareas grandes en objetivos pequeños.',
                'Usa recordatorios o una agenda para fechas importantes.',
                'Evita comenzar actividades el mismo día de entrega.',
                'Establece horarios cortos y constantes de estudio.'
            ];

        }else if(datos.nivel_procrastinacion === 'Alto'){

            mensaje =
            'Presentas una tendencia alta a postergar actividades académicas. Es recomendable trabajar en estrategias de organización y manejo del tiempo.';

            recomendaciones = [
                'Organiza bloques diarios de estudio con metas pequeñas.',
                'Reduce distracciones al iniciar actividades académicas.',
                'Comienza por tareas sencillas para generar avance.',
                'Busca apoyo de compañeros o profesores cuando acumules actividades.'
            ];

        }else{

            mensaje =
            'No se encontró una interpretación disponible.';

            recomendaciones = [
                'Revisa que la evaluación haya sido finalizada correctamente.',
                'Vuelve a realizar la evaluación si los datos no aparecen.',
                'Asegúrate de responder todos los enunciados.',
                'Consulta tus resultados nuevamente más tarde.'
            ];

        }

        document.getElementById('interpretacion').textContent = mensaje;

        const lista = document.querySelector('.lista-recomendaciones');

        lista.innerHTML = '';

        recomendaciones.forEach(recomendacion => {

            lista.innerHTML += `
                <div class="recomendacion">
                    <i class="fa-solid fa-check"></i>
                    <span>${recomendacion}</span>
                </div>
            `;

        });

    }catch(error){

        console.log(error);

    }

    document.getElementById('fechaEvaluacion').textContent =
    new Date().toLocaleDateString('es-MX');

}

function activarSemaforo(nivel){

    document.getElementById('circuloBajo').classList.remove('activo');
    document.getElementById('circuloModerado').classList.remove('activo');
    document.getElementById('circuloAlto').classList.remove('activo');

    if(nivel === 'Bajo'){

        document.getElementById('circuloBajo').classList.add('activo');

    }else if(nivel === 'Moderado'){

        document.getElementById('circuloModerado').classList.add('activo');

    }else if(nivel === 'Alto'){

        document.getElementById('circuloAlto').classList.add('activo');

    }

}

document
.getElementById('btnSalir')
.addEventListener('click', () => {

    localStorage.clear();

    window.location.href = '/';

});

cargarResultados();