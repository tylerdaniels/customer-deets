import { Customer } from "../types";

export type CustomerRepository = {
  countCustomers: () => Promise<number>;
  getCustomers: (pagination?: PaginationParams) => Promise<Customer[]>;
};

export type PaginationParams = Partial<{
  offset: number;
  limit: number;
}>;

export class MemoryCustomerRepository implements CustomerRepository {
  constructor(private allCustomers: Customer[]) {}

  async countCustomers(): Promise<number> {
    return this.allCustomers.length;
  }

  async getCustomers(pagination?: PaginationParams): Promise<Customer[]> {
    const offset = pagination?.offset ?? 0;
    if (offset < 0) {
      throw new Error("Offset cannot be below 0");
    }
    const limit = pagination?.limit ?? 10;
    if (limit < 0) {
      throw new Error("Limit cannot be below 0");
    }
    if (limit > 100) {
      throw new Error("Limit cannot be above 100");
    }
    if (offset >= this.allCustomers.length) {
      return [];
    }
    const upperLimit = Math.min(offset + limit, this.allCustomers.length);
    return this.allCustomers.slice(offset, upperLimit);
  }
}
