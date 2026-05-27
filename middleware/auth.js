function requiereLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login.html');
    }
    next();
}

function soloAdmin(req, res, next) {
    if (!req.session.usuario) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }
    if (req.session.usuario.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
}

module.exports = { requiereLogin, soloAdmin };
