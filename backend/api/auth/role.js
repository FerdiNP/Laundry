// Untuk Kasir
exports.IsKasir = async (req, res, next) => {
    if (req.user.role === "Kasir") {
       next();
    } else {
       return res.status(401).send("Anda bukan Kasir")
    }
}

// Untuk Admin
exports.IsAdmin = async (req, res, next) => {
    if (req.user.role === "Admin") {
        next();
    } else {
        return res.status(401).send("Anda bukan Admin")
    }
}

// Untuk Owner
exports.IsOwner = async (req, res, next) => {
    if (req.user.role === "Owner") {
        next();
    } else {
        return res.status(401).send("Anda bukan Owner")
    }
}

// Untuk Admin dan Kasir (Jadi satu)
exports.IsAdminKasir = async (req, res, next) => {
    if (req.user.role === "Admin","Kasir") {
        next();
    } else {
        return res.status(401).send("Anda bukan Admin atau Kasir")
    }
}
