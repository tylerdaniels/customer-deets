import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Customer, CustomerDeetsContext } from "../types";
import { PaginationParams } from "../services/customer-repository";

export type CustomerResponse = {
  offset: number;
  total: number;
  items: Customer[];
};

export const getCustomers = async (
  event: APIGatewayProxyEvent,
  context: CustomerDeetsContext
): Promise<APIGatewayProxyResult> => {
  const pagination: PaginationParams = {};
  if (
    event.queryStringParameters &&
    "offset" in event.queryStringParameters &&
    event.queryStringParameters.offset
  ) {
    pagination.offset = parseInt(event.queryStringParameters.offset);
    if (Number.isNaN(pagination.offset)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Query parameter 'offset' must be an integer",
        }),
      };
    }
  }
  if (
    event.queryStringParameters &&
    "limit" in event.queryStringParameters &&
    event.queryStringParameters.limit
  ) {
    pagination.limit = parseInt(event.queryStringParameters.limit);
    if (Number.isNaN(pagination.limit)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Query parameter 'limit' must be an integer",
        }),
      };
    }
  }
  const total = await context.repository.countCustomers();
  const items = await context.repository.getCustomers(pagination);
  const response: CustomerResponse = {
    offset: pagination.offset ?? 0,
    total,
    items,
  };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
