import Home from ".";
import { render, screen } from "@testing-library/react";

describe("Mount Register page", () => {
  render(<Home />);
  it("Should have input fields cpf and search button", () => {
    expect(screen.getByRole("cpf")).toBeTruthy();
    expect(screen.getByRole("search")).toBeTruthy();
  });
});
