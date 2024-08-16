import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API Documentation",
        description: "Autodocumentación de los endpoints de la API",
    },
    host: "localhost:3001",
    schemes: ["http"],
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["../app.js", "../routes/*.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    import("../app.js");
});
