import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("scoop subtotal when scoops change", async () => {
  render(<Options optionTypes="scoops" />);

  //   make sure total starts out 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("toppings subtotal when toppings change", async () => {
  render(<Options optionTypes="toppings" />);

  // starts with zero value
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });
  userEvent.click(hotFudgeToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck a topping
  userEvent.click(hotFudgeToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("should update when adding scoops first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");
  });

  test("should update when adding toppings first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");
  });

  test("should update if any items are removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    // add options
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    userEvent.click(cherriesCheckbox);

    // remove an option
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });
});
