import { generateCustomers } from "./customer-generator";

describe("customer generator", () => {
  it("should return number of customers equal to value", () => {
    const numExpected = 50;
    expect(generateCustomers(numExpected)).toHaveLength(numExpected);
  });
  it("should always contain truthy values", () => {
    const numExpected = 50;
    generateCustomers(numExpected).forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.email).toBeTruthy();
      expect(c.registrationDate).toBeTruthy();
    });
  });
  it("should always contain dates in the correct format", () => {
    const numExpected = 50;
    generateCustomers(numExpected).forEach((c) => {
      // Should always be in YYYY-MM-DD format
      expect(/\d{4}-\d{2}-\d{2}/.test(c.registrationDate)).toBeTruthy();
    });
  });
});
