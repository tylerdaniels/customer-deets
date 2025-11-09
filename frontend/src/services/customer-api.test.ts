import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import { CustomerApi, type CustomerResponse } from "./customer-api";

describe("CustomerApi", () => {
  let mockFetch: Mock<typeof window.fetch>;
  beforeEach(() => {
    mockFetch = vi.spyOn(window, "fetch");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should fetch the customers using default values", async () => {
    const api = new CustomerApi("/api");
    const apiResponse: CustomerResponse = {
      total: 1,
      items: [],
      offset: 0,
    };
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponse),
      } as unknown as Response)
    );
    const response = await api.customers({});
    expect(mockFetch).toBeCalled();
    const url = mockFetch.mock.calls[0][0] as string;
    const [path, query] = url.split("?", 2);
    expect(path).toBe("/api/customers");
    const searchParams = new URLSearchParams(query);
    expect(searchParams.has("offset")).toBeTruthy();
    expect(searchParams.get("offset")).toBe("0");
    expect(searchParams.has("limit")).toBeTruthy();
    expect(searchParams.get("limit")).toBe("50");
    expect(response).toBe(apiResponse);
  });
});
