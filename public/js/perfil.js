const profileBtn =
document.getElementById(
'profileBtn'
);

const modalPerfil =
document.getElementById(
'modalPerfil'
);

const cerrarPerfil =
document.getElementById(
'cerrarPerfil'
);

const logoutBtn =
document.getElementById(
'logoutBtn'
);

if(profileBtn){

profileBtn.addEventListener(

'click',

async()=>{

modalPerfil.classList.add(
'active'
);

try{

const res =
await fetch(
'/perfil'
);

if(!res.ok){

throw new Error();

}

const usuario =
await res.json();

document.getElementById(
'nombrePerfil'
).innerText =

`${usuario.nombre}
${usuario.apellidos}`;

document.getElementById(
'correoPerfil'
).innerText =

usuario.correo;

document.getElementById(
'rolPerfil'
).innerText =

usuario.rol;

}catch(error){

console.log(error);

document.getElementById(
'nombrePerfil'
).innerText =
'Usuario';

document.getElementById(
'correoPerfil'
).innerText =
'Error al cargar';

}

}

);

}

cerrarPerfil?.addEventListener(

'click',

()=>{

modalPerfil.classList.remove(
'active'
);

}

);

modalPerfil?.addEventListener(

'click',

(e)=>{

if(
e.target===modalPerfil
){

modalPerfil.classList.remove(
'active'
);

}

}

);

logoutBtn?.addEventListener(

'click',

async(e)=>{

e.preventDefault();

await fetch(
'/logout'
);

location.href='/';

}

);