import swagger_autogen from "swagger-autogen";

const swaggerAutogen = swagger_autogen()


const doc = {
    info: {
        version: "1.0.0",
        title: "Product API",
        description: "Product api to handle product creation"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    import('./app.js')           // Your project's root file
})