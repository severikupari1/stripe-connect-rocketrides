import { SSTConfig } from "sst";
import { ApiGatewayStack } from "./stacks/api/ApiGatewayStack";

export default {
  config(_input) {
    return {
      name: process.env.APP_NAME || 'reservation-app',
      region: process.env.AWS_REGION || 'eu-west-1',
    };
  },
  stacks(app) {
    app
      .stack(ApiGatewayStack);
  },
} satisfies SSTConfig;
