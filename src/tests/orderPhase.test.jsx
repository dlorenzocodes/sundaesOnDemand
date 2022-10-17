import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app component
  render(<App />);

  // add scoop to the order
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1");

  //add topping to the order
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // find and click order sumarry button
  const reviewOrderButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  userEvent.click(reviewOrderButton);

  // check summary subtotals
  const orderSummaryHeading = screen.getByText("Order Summary");
  expect(orderSummaryHeading).toBeInTheDocument();

  const scoopSubTotal = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopSubTotal).toBeInTheDocument();

  const toppingSubTotal = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingSubTotal).toBeInTheDocument();

  const listItems = screen.getAllByRole("listitem");
  const itemsArray = listItems.map((item) => item.textContent);
  expect(itemsArray).toEqual(["1 Chocolate", "Cherries"]);

  //check terms and conditions
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  //   click confirmation button
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm Order",
  });
  userEvent.click(confirmOrderButton);

  const thankYouHeading = screen.getByRole("heading", {
    name: /thank you for your order/i,
  });
  expect(thankYouHeading).toBeInTheDocument();
});
