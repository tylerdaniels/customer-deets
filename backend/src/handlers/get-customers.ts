import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CustomerDeetsContext } from "../types";
import { Customer } from "../services/customer-repository";

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
