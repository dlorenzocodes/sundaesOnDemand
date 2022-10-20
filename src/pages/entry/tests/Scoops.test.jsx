import { render, screen } from "../../../test-utils/testing-library-utils";
import Scoops from "../Scoops";
import userEvent from "@testing-library/user-event";

test("spinbuttons should have red class if incorrect data is entered", async () => {
  const user = userEvent.setup();
  render(<Scoops name="Chocolate" imagePath="images/chocolate.png" />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1.5");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "11");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(chocolateInput).not.toHaveClass("is-invalid");
});
