export type Customer = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
};

export type CustomerResponse = {
  page: number;
  total: number;
  items: Customer[];
};

export type CustomerParams = {
  page: number;
  limit: number;
};

export class CustomerApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async customers({
    page,
    limit,
  }: Partial<CustomerParams>): Promise<CustomerResponse> {
    const pageToUse = page ?? 1;
    const limitToUse = limit ?? 50;
    const res = await fetch(
      `${this.baseUrl}/customers?page=${pageToUse}&limit=${limitToUse}`
    );
    const data = res.json();
    return data;
  }
}
