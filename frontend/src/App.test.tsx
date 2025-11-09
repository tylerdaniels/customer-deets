import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render correctly on the first try", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hello, Bootstrap and Vite!")).toBeDefined();
  });
});
