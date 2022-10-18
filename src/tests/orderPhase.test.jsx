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

  // expect loading to be on the page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // grab text that
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // expect loading not to be on the page
  const notLoading = screen.queryByText(loading);
  expect(notLoading).not.toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppins have been reset
  const scoopTotal = await screen.findByText("Scoops total: $0.00");
  const toppingTotal = await screen.findByText("Toppings total: $0.00");

  expect(scoopTotal).toBeInTheDocument();
  expect(toppingTotal).toBeInTheDocument();
});
