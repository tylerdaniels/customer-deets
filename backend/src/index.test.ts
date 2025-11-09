import { APIGatewayProxyEvent } from "aws-lambda";

import { handler } from ".";

describe("handler tests", () => {
  it("should return 200 for empty event", async () => {
    const result = await handler({} as unknown as APIGatewayProxyEvent);
    expect(result.statusCode).toBe(200);
  });
});
