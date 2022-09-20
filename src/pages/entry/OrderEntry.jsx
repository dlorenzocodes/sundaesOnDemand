import Options from "./Options";

function OrderEntry() {
  return (
    <>
      <Options optionTypes="scoops" />
      <Options optionTypes="toppings" />
    </>
  );
}

export default OrderEntry;
