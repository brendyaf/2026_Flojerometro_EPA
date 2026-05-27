function reproducirAudio(){

    const audio =
    document.getElementById("audioPregunta");

    audio.play();

}

async function guardarLocal(idItem, siguiente){

    const opcion = document.querySelector('input[name="respuesta"]:checked');

    if(!opcion){
        alert('Debes responder antes de continuar');
        return;
    }

    localStorage.setItem('item' + idItem, opcion.value);

    window.location.href = siguiente;
}

async function finalizarEvaluacion(){

    const opcion = document.querySelector('input[name="respuesta"]:checked');

    if(!opcion){
        alert('Debes responder antes de finalizar');
        return;
    }

    localStorage.setItem('item12', opcion.value);

    const respuestas = [];

    for(let i = 1; i <= 12; i++){

        const valor = localStorage.getItem('item' + i);

        if(!valor){
        alert('Debes responder las 12 preguntas antes de finalizar');
        return;
        }

        respuestas.push({
            id_item: i,
            valor_respuesta: Number(valor)
        });
    }

    const idEvaluacion =
localStorage.getItem(
'id_evaluacion'
);

if(!idEvaluacion){

alert(
'No se encontró la evaluación. Vuelve a iniciar desde datos personales.'
);

window.location.href =
'datos_personales.html';

return;

}

    const res = await fetch('/finalizar-evaluacion', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
    id_evaluacion: idEvaluacion,
    respuestas: respuestas
    })
    });

    const resultado = await res.json();

    if(resultado.ok){

    for(let i = 1; i <= 12; i++){
        localStorage.removeItem('item' + i);
    }

    window.location.href = 'resultados.html';

    }else{

    alert('Error al guardar');

    }
}

const abrirModalEvaluacion =
document.getElementById('abrirModalEvaluacion');

const cerrarModalEvaluacion =
document.getElementById('cerrarModalEvaluacion');

const modalEvaluacion =
document.getElementById('modalEvaluacion');

if(
abrirModalEvaluacion &&
cerrarModalEvaluacion &&
modalEvaluacion
){

abrirModalEvaluacion.addEventListener('click',(e)=>{

e.preventDefault();

modalEvaluacion.classList.add('active');

});

cerrarModalEvaluacion.addEventListener('click',()=>{

modalEvaluacion.classList.remove('active');

});

modalEvaluacion.addEventListener('click',(e)=>{

    if(e.target === modalEvaluacion){

        modalEvaluacion.classList.remove('active');

    }

});

}