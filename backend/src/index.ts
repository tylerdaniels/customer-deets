import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpRouterHandler, { Route } from "@middy/http-router";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getCustomers } from "./handlers/get-customers";
import { CustomerRepository } from "./services/customer-repository";
import { CustomerDeetsContext } from "./types";

const injectCustomerRepository: middy.MiddlewareFn<
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Error,
  CustomerDeetsContext
> = (request) => {
  // This should being dynamically generated from environment variables
  // in a *REAL* application. For this demo it is just a locally created
  // list.
  request.context.repository = new CustomerRepository();
};

const routes: Route<APIGatewayProxyEvent, APIGatewayProxyResult>[] = [
  {
    method: "GET",
    path: "/customers",
    handler: middy(getCustomers),
  },
];

export const handler = middy<
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Error,
  CustomerDeetsContext
>()
  .use(httpHeaderNormalizer())
  .before(injectCustomerRepository)
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes));
