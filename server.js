const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const { Pool } = require('pg');

const app = express();

// ======================
// CONEXION POSTGRESQL
// ======================

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Flojerometro',
    password:'123456',
    port:5432
});

// ======================
// MIDDLEWARES
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
extended:true
}));

app.use(session({

secret:'flojerometro_secreto',

resave:false,

saveUninitialized:false

}));

// ======================
// EJS
// ======================

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/datos_personales.html', (req, res) => {

    if (!req.session.usuario) {
        return res.redirect('/login.html');
    }

    res.render('datos_personales');

});

app.get('/resultados.html', (req, res) => {

    res.render('resultados');

});

app.use(express.static('public'));

// ======================
// SEGURIDAD
// ======================

function requiereLogin(
req,
res,
next
){

if(!req.session.usuario){

return res
.redirect(
'/login.html'
);

}

next();

}

function soloAdmin(
req,
res,
next
){

if(!req.session.usuario){

return res
.status(401)
.json({

mensaje:
'No autorizado'

});

}

if(
req.session.usuario.rol
!==
'admin'
){

return res
.status(403)
.json({

mensaje:
'Acceso denegado'

});

}

next();

}

// ======================
// RUTA INICIO
// ======================

app.get('/',(
	req,
	res
)=>{

	res.render('inicio');

});

// ======================
// REGISTRO
// ======================

app.post(
'/registro',

async(
req,
res
)=>{

const{

nombre,

apellidos,

correo,

contraseña

}=req.body;

if(
!nombre
||
!apellidos
||
!correo
||
!contraseña
){

return res
.status(400)
.json({

mensaje:
'Campos vacíos'

});

}

try{

const existe =
await pool.query(

'SELECT * FROM usuarios WHERE correo=$1',

[
correo
]

);

if(
existe.rows.length
>0
){

return res
.status(400)
.json({

mensaje:
'Correo ya registrado'

});

}

let rol='usuario';

if(
correo
===
'admin@gmail.com'
){

rol='admin';

}

await pool.query(

`
INSERT INTO usuarios
(
nombre,
apellidos,
correo,
password,
rol
)
VALUES
(
$1,
$2,
$3,
$4,
$5
)
`,

[

nombre,

apellidos,

correo,

contraseña,

rol

]

);

res.json({

mensaje:
'Registro correcto'

});

}catch(error){

console.log(error);

res
.status(500)
.json({

mensaje:
'Error'

});

}

});

// ======================
// LOGIN
// ======================

app.post(
'/login',

async(
req,
res
)=>{

const{

correo,

password

}=req.body;

if(
!correo
||
!password
){

return res
.status(400)
.json({

mensaje:
'Campos vacíos'

});

}

try{

const resultado =
await pool.query(

'SELECT * FROM usuarios WHERE correo=$1',

[
correo
]

);

if(
resultado.rows.length
===0
){

return res
.status(401)
.json({

mensaje:
'Usuario no encontrado'

});

}

const usuario =
resultado.rows[0];

if(
usuario.password
!==password
){

return res
.status(401)
.json({

mensaje:
'Contraseña incorrecta'

});

}

req.session.usuario={

id:
usuario.id_usuario,

nombre:
usuario.nombre,

correo:
usuario.correo,

rol:
usuario.rol

};

res.json({

mensaje:
'Login correcto',

usuario:
req.session.usuario

});

}catch(error){

console.log(error);

res
.status(500)
.json({

mensaje:
'Error servidor'

});

}

});

// ======================
// PANEL ADMIN
// ======================

app.get(
'/panelAdmin.html',

requiereLogin,

(
req,
res
)=>{

if(
req.session.usuario.rol
!==
'admin'
){

return res
.redirect(
'/'
);

}

res.render('panelAdmin');

}
);

// ======================
// CRUD
// ======================

app.get(
'/usuarios',

soloAdmin,

async(
req,
res
)=>{

const datos =
await pool.query(

`
SELECT
id_usuario,
nombre,
apellidos,
correo,
rol
FROM usuarios
`

);

res.json(
datos.rows
);

}
);

app.post(
'/usuarios',

soloAdmin,

async(
req,
res
)=>{

const{

nombre,

apellidos,

correo,

password,

rol

}=req.body;

await pool.query(

`
INSERT INTO usuarios
(
nombre,
apellidos,
correo,
password,
rol
)

VALUES

(
$1,
$2,
$3,
$4,
$5
)
`,

[

nombre,

apellidos,

correo,

password,

rol

]

);

res.json({

mensaje:
'Creado'

});

}
);

app.put(
'/usuarios/:id',

soloAdmin,

async(
req,
res
)=>{

const id =
req.params.id;

const{

nombre,

apellidos,

correo,

rol

}=req.body;

await pool.query(

`
UPDATE usuarios
SET
nombre=$1,
apellidos=$2,
correo=$3,
rol=$4
WHERE
id_usuario=$5
`,

[

nombre,

apellidos,

correo,

rol,

id

]

);

res.json({

mensaje:
'Actualizado'

});

}
);

app.delete(
'/usuarios/:id',

soloAdmin,

async(
req,
res
)=>{

const id =
req.params.id;

await pool.query(

`
DELETE
FROM usuarios

WHERE
id_usuario=$1
`,

[
id
]

);

res.json({

mensaje:
'Eliminado'

});

}
);

// ======================
// SESION
// ======================

app.get(
'/usuario',

(
req,
res
)=>{

if(
!req.session.usuario
){

return res
.status(401)
.json({

mensaje:
'Sin sesión'

});

}

res.json(
req.session.usuario
);

}
);

// ======================
// LOGOUT
// ======================

app.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.clearCookie('connect.sid');
        res.redirect('/');

    });

});

app.post('/guardar-datos', async (req, res) => {

    if (!req.session.usuario) {

        return res.status(401).json({
            mensaje:'Debes iniciar sesión'
        });

    }

    const {
        edad,
        escuela,
        carrera,
        grupo
    } = req.body;

    if(!edad){

        return res.status(400).json({
            mensaje:'La edad es obligatoria'
        });

    }

    try{

        const resultado =
        await pool.query(

        `

        INSERT INTO evaluaciones

        (
            id_usuario,
            edad,
            escuela,
            carrera,
            grupo,
            fecha
        )

        VALUES

        (
            $1,
            $2,
            $3,
            $4,
            $5,
            NOW()
        )

        RETURNING id_evaluacion

        `,

        [

            req.session.usuario.id,

            edad,

            escuela || null,

            carrera || null,

            grupo || null

        ]

        );

        res.json({

            mensaje:
            'Datos guardados correctamente',

            id_evaluacion:
            resultado.rows[0]
            .id_evaluacion

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            mensaje:
            'Error al guardar los datos'

        });

    }

});

app.post('/finalizar-evaluacion', async (req, res) => {

    const {
        id_evaluacion,
        respuestas
    } = req.body;

    try{

        await pool.query('BEGIN');

        // Guardar las 12 respuestas
        for(const r of respuestas){

            await pool.query(
                `
                INSERT INTO respuestas_evaluacion
                (
                    id_evaluacion,
                    id_item,
                    valor_respuesta
                )
                VALUES ($1, $2, $3)
                `,
                [
                    id_evaluacion,
                    r.id_item,
                    r.valor_respuesta
                ]
            );

        }

        // Consultar respuestas con factor e inversión
        const datos = await pool.query(
            `
            SELECT
            r.valor_respuesta,
            i.id_factor,
            i.es_invertido
            FROM respuestas_evaluacion r
            INNER JOIN items_epa i
            ON r.id_item = i.id_item
            WHERE r.id_evaluacion = $1
            `,
            [id_evaluacion]
        );

        let puntajeAutorregulacion = 0;
        let puntajePostergacion = 0;

       datos.rows.forEach(r => {

    let valor = r.valor_respuesta;

    // invertir ítems
    if(r.es_invertido){

        valor = 6 - valor;

    }

    // Factor 1
    if(r.id_factor === 1){

        puntajeAutorregulacion += valor;

    }

    // Factor 2
    if(r.id_factor === 2){

        puntajePostergacion += valor;

    }

});
        const puntajeTotal =
        puntajeAutorregulacion + puntajePostergacion;

        let nivel = '';

        if(puntajeTotal <= 24){
            nivel = 'Bajo';
        }else if(puntajeTotal <= 42){
            nivel = 'Moderado';
        }else{
            nivel = 'Alto';
        }

        // Actualizar evaluación
        await pool.query(
            `
            UPDATE evaluaciones
            SET
                puntaje_autorregulacion = $1,
                puntaje_postergacion = $2,
                puntaje_total = $3,
                nivel_procrastinacion = $4
            WHERE id_evaluacion = $5
            `,
            [
                puntajeAutorregulacion,
                puntajePostergacion,
                puntajeTotal,
                nivel,
                id_evaluacion
            ]
        );

        await pool.query('COMMIT');

        res.json({
            ok:true,
            mensaje:'Evaluación finalizada correctamente'
        });

    }catch(error){

        await pool.query('ROLLBACK');

        console.log(error);

        res.status(500).json({
            ok:false,
            mensaje:'Error al finalizar evaluación'
        });

    }

});

app.get('/obtener-resultados', async (req, res) => {

    try{

        const resultado = await pool.query(
            `
            SELECT
                puntaje_autorregulacion,
                puntaje_postergacion,
                puntaje_total,
                nivel_procrastinacion
            FROM evaluaciones
            ORDER BY id_evaluacion DESC
            LIMIT 1
            `
        );

        res.json(resultado.rows[0]);

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al obtener resultados'
        });

    }

});

app.get('/historial-evaluaciones', async (req, res) => {

    if(!req.session.usuario){
        return res.status(401).json({
            mensaje:'Sin sesión'
        });
    }

    try{

        const resultado = await pool.query(
            `
            SELECT
                id_evaluacion,
                fecha,
                nivel_procrastinacion,
                puntaje_total
            FROM evaluaciones
            WHERE id_usuario = $1
            AND nivel_procrastinacion IS NOT NULL
            ORDER BY fecha DESC
            `,
            [req.session.usuario.id]
        );

        res.json(resultado.rows);

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al obtener historial'
        });

    }

});

app.get('/admin/ultimos-resultados', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT
        u.nombre,
        u.apellidos,
        e.carrera,
        e.nivel_procrastinacion,
        e.puntaje_total,
        e.fecha
      FROM evaluaciones e
      INNER JOIN usuarios u ON e.id_usuario = u.id_usuario
      WHERE e.nivel_procrastinacion IS NOT NULL
      AND e.carrera IS NOT NULL
      AND e.carrera <> ''
      ORDER BY e.fecha DESC
      LIMIT 3
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener últimos resultados' });
  }
});

// ======================
// SERVIDOR
// ======================

app.listen(
3000,

()=>{

console.log(
'Servidor iniciado'
);

}
);

app.get('/perfil', async (req, res) => {

if(!req.session.usuario){

return res.status(401).json({

mensaje:
'Sin sesión'

});

}

try {

const id_usuario =
req.session.usuario.id;

const resultado =
await pool.query(

`
SELECT
nombre,
apellidos,
correo,
rol

FROM usuarios

WHERE id_usuario = $1
`,

[
id_usuario
]

);

if(
resultado.rows.length===0
){

return res.status(404).json({

mensaje:
'Usuario no encontrado'

});

}

res.json(
resultado.rows[0]
);

}catch(error){

console.log(error);

res.status(500).json({

mensaje:
'Error al cargar perfil'

});

}

});