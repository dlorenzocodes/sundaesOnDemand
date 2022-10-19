import { render, screen } from "../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

test("confirm loading shows while contacting server", async () => {
  render(<OrderConfirmation />);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeading = await screen.findByText(/thank you/i);
  expect(thankYouHeading).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
});
