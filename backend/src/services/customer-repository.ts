import { Customer } from "../types";

export type CustomerRepository = {
  getCustomers: () => Promise<Customer[]>;
};

export class MemoryCustomerRepository implements CustomerRepository {
  constructor(private allCustomers: Customer[]) {}
  async getCustomers(): Promise<Customer[]> {
    return this.allCustomers;
  }
}
