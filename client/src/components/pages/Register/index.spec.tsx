import Register from ".";
import { render, screen } from "@testing-library/react";

describe("Mount Register page", () => {
  render(<Register />);
  it("Should have input fields for name, surname, phone,cpf and send button", () => {
    expect(screen.getByRole("name")).toBeTruthy();
    expect(screen.getByRole("surname")).toBeTruthy();
    expect(screen.getByRole("phone")).toBeTruthy();
    expect(screen.getByRole("cpf")).toBeTruthy();
    expect(screen.getByRole("send")).toBeTruthy();
  });
});
