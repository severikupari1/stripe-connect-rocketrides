"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayStack = void 0;
const constructs_1 = require("sst/constructs");
function ApiGatewayStack({ stack }) {
    // Add your first construct
    // Create the HTTP API
    const api = new constructs_1.Api(stack, "ApiGateway", {
        defaults: {
            function: {
                // Bind the table name to our API
                environment: {}
            },
        },
        routes: {
            "POST   /notes": "packages/functions/src/create.main"
        }
    });
    // Show the API endpoint in the output
    stack.addOutputs({
        ApiUrl: api.url,
    });
    return {
        api
    };
}
exports.ApiGatewayStack = ApiGatewayStack;
