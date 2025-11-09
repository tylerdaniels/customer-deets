export type Customer = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
};

export type CustomerResponse = {
  offset: number;
  total: number;
  items: Customer[];
};

export type CustomerParams = {
  offset: number;
  limit: number;
};

export class CustomerApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async customers({
    offset,
    limit,
  }: Partial<CustomerParams>): Promise<CustomerResponse> {
    const offsetToUse = offset ?? 0;
    const limitToUse = limit ?? 50;
    const res = await fetch(
      `${this.baseUrl}/customers?offset=${offsetToUse}&limit=${limitToUse}`
    );
    const data = res.json();
    return data;
  }
}
