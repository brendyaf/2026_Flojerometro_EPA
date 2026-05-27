document.addEventListener('DOMContentLoaded', async () => {

    const loginLink =
    document.getElementById('loginLink');

    const perfilBox =
    document.getElementById('perfilBox');

    const panelAdmin =
    document.getElementById('panelAdmin');

    // ESTADO INICIAL

    if(loginLink){

        loginLink.style.display='inline-block';

    }

    if(perfilBox){

        perfilBox.style.display='none';

    }

    if(panelAdmin){

        panelAdmin.style.display='none';

    }

    try{

        const res =
        await fetch(
            '/usuario',
            {
                cache:'no-store'
            }
        );

        if(res.ok){

            const usuario =
            await res.json();

            // MOSTRAR PERFIL

            if(loginLink){

                loginLink.style.display='none';

            }

            if(perfilBox){

                perfilBox.style.display='block';

            }

            // MOSTRAR PANEL ADMIN

            if(
                usuario.rol === 'admin'
                &&
                panelAdmin
            ){

                panelAdmin.style.display='inline-block';

            }

        }

    }catch(error){

        console.log(
            'Sin sesión'
        );

    }

});