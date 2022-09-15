import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("initial state of checkbox and button", () => {
  test("checkbox should be unchecked and button disabled", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const orderButton = screen.getByRole("button", { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(orderButton).toBeDisabled();
  });

  test("checkbox enables button on first click and disable on second", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const orderButton = screen.getByRole("button", { name: /confirm order/i });

    userEvent.click(checkbox);
    expect(orderButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(orderButton).toBeDisabled();
  });
});
