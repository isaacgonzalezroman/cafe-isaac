const jwt = require('jsonwebtoken');

// ============================
//  Verifica Token
// ============================
let verificaToken = (req, resp, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return resp.status(401).json({
                ok: false,
                err: 'Token no válido'
            })
        }

        req.usuario = decoded.usuario;
        next();

    })

};

// ============================
//  Verifica AdminRole
// ============================
let verificaAdminRole = (req, resp, next) => {

    let usuario = req.usuario;
    console.log(usuario)

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return resp.status(401).json({
            ok: false,
            err: 'Usuario sin roles de administrador'
        })
    }


};

module.exports = {
    verificaToken,
    verificaAdminRole
};