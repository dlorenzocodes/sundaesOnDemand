import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

// Scoop
test("should display image for each scoop from server", async () => {
  render(<Options optionTypes="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((elem) => elem.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

// Topping
test("should display images for each topping from server", async () => {
  render(<Options optionTypes="toppings" />);

  const toppingImages = await screen.findAllByRole("img", { name: /topping/i });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((elem) => elem.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("dont update scoops totals if option is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionTypes="scoops" />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
});
