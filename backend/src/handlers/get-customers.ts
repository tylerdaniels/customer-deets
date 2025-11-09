import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CustomerDeetsContext } from "../types";

export const getCustomers = async (
  event: APIGatewayProxyEvent,
  context: CustomerDeetsContext
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(context.repository.getCustomers()),
  };
};
