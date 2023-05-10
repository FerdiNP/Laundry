// const jwt = require('jsonwebtoken');
// const { secret } = require('./secret.json');
//
// const auth = (req, res, next) => {
//     const token = req.headers.auth;
//     if (token) {
//         let verifiedUser = jwt.verify(token, secret);
//         if(!verifiedUser) return res.status(401).send('Error Unauthorized')
//         req.user = verifiedUser;
//         next()
//     } else {
//         return res.status(401).json({ message: 'Error'});
//         }
//     }
//
// //export module
// module.exports = auth;
//
const jwt = require('jsonwebtoken');
const { secret } = require('./secret.json');
const auth = (request, response, next) => {
    // kita dapatkan data authorization
    let header = request.headers.authorization
    // header = Bearer hofihdsofhfifhsdklfhisdgh

    // kita ambil data token nya
    let token = header && header.split(" ")[1]

    if(token == null){
        // jika token nya kosong
        return response.status(401).json({
            message: `Unauthorized`
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        // verifikasi token yang diberikan
        jwt.verify(token, secret, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid Token`
                })
            }else{
                next()
            }
        })
    }
}
//export module
module.exports = auth;
