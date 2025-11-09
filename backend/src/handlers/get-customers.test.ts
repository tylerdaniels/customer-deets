import { APIGatewayProxyEvent, Context as LambdaContext } from "aws-lambda";

import { CustomerResponse, getCustomers } from "./get-customers";
import { CustomerDeetsContext } from "../types";
import { CustomerRepository } from "../services/customer-repository";

const emptyCustomerRepository: CustomerRepository = {
  getCustomers: async () => [],
};

describe("handler tests", () => {
  it("should return 200 for empty event", async () => {
    const result = await getCustomers(
      {} as unknown as APIGatewayProxyEvent,
      { repository: emptyCustomerRepository } as unknown as CustomerDeetsContext
    );
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeTruthy();
    const body: CustomerResponse = JSON.parse(result.body);
    expect(body.page).toBe(1);
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
  });
});
