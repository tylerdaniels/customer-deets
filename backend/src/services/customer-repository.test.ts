import { generateCustomers } from "./customer-generator";
import { MemoryCustomerRepository } from "./customer-repository";

describe("customer repository", () => {
  it("should return correct values for empty repository", async () => {
    const repository = new MemoryCustomerRepository([]);
    await expect(repository.countCustomers()).resolves.toBe(0);
    await expect(repository.getCustomers()).resolves.toEqual([]);
  });
  it("should count all customers with no filter value", async () => {
    const customers = generateCustomers(50);
    const repository = new MemoryCustomerRepository(customers);
    await expect(repository.countCustomers()).resolves.toBe(customers.length);
  });
  function testPagination(
    description: string,
    offset: number,
    limit: number,
    expectedLength: number
  ): void {
    it(`${description}: should return length ${expectedLength} for offset ${offset} and limit ${limit}`, async () => {
      const customers = generateCustomers(50);
      const repository = new MemoryCustomerRepository(customers);
      const page = await repository.getCustomers({ offset, limit });
      expect(page).toHaveLength(expectedLength);
    });
  }
  testPagination("zero limit", 0, 0, 0);
  testPagination("full array", 0, 50, 50);
  testPagination("past end of array", 100, 50, 0);
  testPagination("limit would overflow array", 49, 50, 1);
});
