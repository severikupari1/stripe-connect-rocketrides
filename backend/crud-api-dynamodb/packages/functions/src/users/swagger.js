import swagger_autogen from "swagger-autogen";

const swaggerAutogen = swagger_autogen()


const doc = {
    info: {
        version: "1.0.0",
        title: "Users API",
        description: "Users api to handle user creation and signup"
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "api_key",  // name of the header, query parameter or cookie
            description: "Api key for endpoints"
        }
    },
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    import('./app.js')           // Your project's root file
})