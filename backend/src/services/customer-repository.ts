export type Customer = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
};

export class CustomerRepository {
  async getCustomers(): Promise<Customer[]> {
    return [
      {
        id: "1",
        name: "Simon",
        email: "simon@hotmail.com",
        registrationDate: "2020-01-05",
      },
      {
        id: "2",
        name: "Alice Holmes",
        email: "alive@gmail.com",
        registrationDate: "2022-09-17",
      },
    ];
  }
}
