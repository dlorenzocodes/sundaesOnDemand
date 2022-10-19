import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles errors for scoops and topping routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", {
      name: /unexpected error/i,
    });
    expect(alerts).toHaveLength(2);
  });
});

describe("order button", () => {
  test("should be disabled if no scoops are selected", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const cherryTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherryTopping);

    const orderButton = screen.getByRole("button", { name: /order sundae/i });
    expect(orderButton).toBeDisabled();

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(orderButton).toBeEnabled();

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
