import { render, screen } from "../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { server } from "../../mocks/server";
import { rest } from "msw";

test("confirm loading shows while contacting server", async () => {
  render(<OrderConfirmation />);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeading = await screen.findByText(/thank you/i);
  expect(thankYouHeading).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
});

test("show alert for error when submitting order", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderConfirmation />);

  const alert = await screen.findByRole("alert", {
    name: /unexpected error/i,
  });
  expect(alert).toBeInTheDocument();
});
