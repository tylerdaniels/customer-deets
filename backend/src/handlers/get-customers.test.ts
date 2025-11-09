import { APIGatewayProxyEvent } from "aws-lambda";

import { CustomerResponse, getCustomers } from "./get-customers";
import { CustomerDeetsContext } from "../types";
import { CustomerRepository } from "../services/customer-repository";

const emptyCustomerRepository: CustomerRepository = {
  countCustomers: async () => 0,
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
    expect(body.offset).toBe(0);
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
  });
  it("should pass in pagination parameters to customer repository", async () => {
    const mockGetCustomers = jest.fn<
      ReturnType<CustomerRepository["getCustomers"]>,
      Parameters<CustomerRepository["getCustomers"]>
    >(() => Promise.resolve([]));
    const spyRepo: CustomerRepository = {
      ...emptyCustomerRepository,
      getCustomers: mockGetCustomers,
    };
    const offset = 27;
    const limit = 33;
    const result = await getCustomers(
      {
        queryStringParameters: {
          offset: offset.toString(),
          limit: limit.toString(),
        },
      } as unknown as APIGatewayProxyEvent,
      { repository: spyRepo } as unknown as CustomerDeetsContext
    );
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeTruthy();
    const body: CustomerResponse = JSON.parse(result.body);
    expect(body.offset).toBe(offset);
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
    expect(mockGetCustomers).toHaveBeenCalled();
    const pagination = mockGetCustomers.mock.calls[0]![0];
    expect(pagination?.offset).toBe(offset);
    expect(pagination?.limit).toBe(limit);
  });

  it("should return bad request for non-integer offset", async () => {
    const result = await getCustomers(
      {
        queryStringParameters: {
          offset: "is a string",
        },
      } as unknown as APIGatewayProxyEvent,
      { repository: emptyCustomerRepository } as unknown as CustomerDeetsContext
    );
    expect(result.statusCode).toBe(400);
  });
  it("should return bad request for non-integer limit", async () => {
    const result = await getCustomers(
      {
        queryStringParameters: {
          limit: "is a string",
        },
      } as unknown as APIGatewayProxyEvent,
      { repository: emptyCustomerRepository } as unknown as CustomerDeetsContext
    );
    expect(result.statusCode).toBe(400);
  });
});
