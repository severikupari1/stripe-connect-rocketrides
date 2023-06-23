import { Api, StackContext } from "sst/constructs";

export function ApiGatewayStack({ stack }: StackContext) {
  // Add your first construct
  // Create the HTTP API
  const api = new Api(stack, "ApiGateway", {
    defaults: {
      function: {
        // Bind the table name to our API
        environment: {

        }
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
  }
}
