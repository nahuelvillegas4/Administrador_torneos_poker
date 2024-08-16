import jwt from "jsonwebtoken";

export default function extraerToken(req, res, next) {
    const authorization = req.get("authorization");
    console.log(authorization);
    let token = "";

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
        console.log(token);
    }

    console.log(process.env.SECRET);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "el token no existe o es inválido" });
    }

    const { id: idUsuario, revisor } = decodedToken;

    req.idUsuario = idUsuario;
    req.admin = revisor;

    next();
    return true;
}
