import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

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
