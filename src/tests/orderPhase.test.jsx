import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app component
  render(<App />);

  // add scoop to the order
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  //add topping to the order
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order sumarry button
  const reviewOrderButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  await user.click(reviewOrderButton);

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
  await user.click(tcCheckbox);

  //   click confirmation button
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm Order",
  });
  await user.click(confirmOrderButton);

  // grab text that
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check if options are on the screen again
  const scoopHeading = await screen.findByRole("heading", { name: /scoops/i });
  const toppingHeading = await screen.findByRole("heading", {
    name: /toppings/i,
  });

  expect(scoopHeading).toBeInTheDocument();
  expect(toppingHeading).toBeInTheDocument();
});
