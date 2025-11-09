import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Customer, CustomerDeetsContext } from "../types";

export type CustomerResponse = {
  page: number;
  total: number;
  items: Customer[];
};

export const getCustomers = async (
  event: APIGatewayProxyEvent,
  context: CustomerDeetsContext
): Promise<APIGatewayProxyResult> => {
  const items = await context.repository.getCustomers();
  const response: CustomerResponse = {
    page: 1,
    total: items.length,
    items,
  };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
