// ELEMENTOS

const nivelEducativo =
document.getElementById('nivelEducativo');

const gradoContainer =
document.getElementById('gradoContainer');

const gradoSelect =
document.getElementById('gradoSelect');

const gradoLabel =
document.getElementById('gradoLabel');

const carreraContainer =
document.getElementById('carreraContainer');

const carreraSelect =
document.getElementById('carreraSelect');

const otraCarreraContainer =
document.getElementById('otraCarreraContainer');

const otraLabel =
document.getElementById('otraLabel');

const inputOtro =
document.getElementById('inputOtro');


// CAMBIO NIVEL EDUCATIVO

nivelEducativo.addEventListener('change', () => {

    const valor =
    nivelEducativo.value;

    gradoContainer.classList.add('hidden');
    carreraContainer.classList.add('hidden');
    otraCarreraContainer.classList.add('hidden');

    gradoSelect.innerHTML = '';
    carreraSelect.value = '';

    if(inputOtro){
        inputOtro.value = '';
    }

    if(valor === 'primaria'){

        gradoLabel.textContent =
        'Grado';

        gradoContainer.classList.remove('hidden');

        gradoSelect.innerHTML = `
            <option value="">Selecciona un grado</option>
            <option>1°</option>
            <option>2°</option>
            <option>3°</option>
            <option>4°</option>
            <option>5°</option>
            <option>6°</option>
        `;

    }

    if(valor === 'secundaria'){

        gradoLabel.textContent =
        'Grado';

        gradoContainer.classList.remove('hidden');

        gradoSelect.innerHTML = `
            <option value="">Selecciona un grado</option>
            <option>1°</option>
            <option>2°</option>
            <option>3°</option>
        `;

    }

    if(valor === 'preparatoria'){

        gradoLabel.textContent =
        'Semestre';

        gradoContainer.classList.remove('hidden');

        gradoSelect.innerHTML = `
            <option value="">Selecciona un semestre</option>
            <option>1° Semestre</option>
            <option>2° Semestre</option>
            <option>3° Semestre</option>
            <option>4° Semestre</option>
            <option>5° Semestre</option>
            <option>6° Semestre</option>
        `;

    }

    if(valor === 'universidad'){

        carreraContainer.classList.remove('hidden');

    }

    if(valor === 'otro'){

        otraLabel.textContent =
        'Escribe tu nivel educativo';

        inputOtro.placeholder =
        'Ejemplo: Posgrado, Técnico, Curso, etc.';

        otraCarreraContainer.classList.remove('hidden');

    }

});


// CAMBIO CARRERA

carreraSelect.addEventListener('change', () => {

    if(carreraSelect.value === 'otro'){

        otraLabel.textContent =
        'Escribe tu carrera';

        inputOtro.placeholder =
        'Ingresa tu carrera';

        inputOtro.value = '';

        otraCarreraContainer.classList.remove('hidden');

    }else{

        otraCarreraContainer.classList.add('hidden');

        inputOtro.value = '';

    }

});


// GUARDAR DATOS

const formDatos =
document.querySelector('form');

formDatos.addEventListener('submit', async (e) => {

    e.preventDefault();

    const edad =
    document.querySelector('input[type="number"]').value;

    let escuela = null;
    let carrera = null;
    let grupo = null;

    if(
        nivelEducativo.value === 'primaria' ||
        nivelEducativo.value === 'secundaria' ||
        nivelEducativo.value === 'preparatoria'
    ){

        escuela =
        nivelEducativo.value;

        grupo =
        gradoSelect.value;

    }

    if(nivelEducativo.value === 'universidad'){

        escuela =
        nivelEducativo.value;

        carrera =
        carreraSelect.value;

        if(carrera === 'otro'){

            carrera =
            inputOtro.value;

        }

    }

    if(nivelEducativo.value === 'otro'){

        escuela =
        inputOtro.value;

        carrera =
        null;

        grupo =
        null;

    }

    const res =
    await fetch('/guardar-datos', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            edad,
            escuela,
            carrera,
            grupo
        })
    });

    const data =
    await res.json();

    if(res.ok){

        localStorage.setItem(
            'id_evaluacion',
            data.id_evaluacion
        );

        window.location.href =
        'evaluacion.html';

    }else{

        alert(data.mensaje);

    }

});

