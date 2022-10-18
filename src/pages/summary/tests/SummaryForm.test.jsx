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

  test("checkbox enables button on first click and disable on second", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const orderButton = screen.getByRole("button", { name: /confirm order/i });

    await user.click(checkbox);
    expect(orderButton).toBeEnabled();

    await user.click(checkbox);
    expect(orderButton).toBeDisabled();
  });
});

describe("testing popover", () => {
  test("popover should be hidden when page loads", () => {
    render(<SummaryForm />);

    const popOver = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popOver).not.toBeInTheDocument();
  });

  test("popover should be visible when hovered and hidden when not hovered", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const label = screen.getByText(/terms and conditions/i);
    await user.hover(label);

    const popOver = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popOver).toBeInTheDocument();

    await user.unhover(label);
    expect(popOver).not.toBeInTheDocument();
  });
});
