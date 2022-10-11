import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurreny } from "../../utilities/index";

function OrderEntry() {
  const { totals } = useOrderDetails();
  return (
    <>
      <Options optionTypes="scoops" />
      <Options optionTypes="toppings" />
      <h2>Grand total: {formatCurreny(totals.scoops + totals.toppings)}</h2>
    </>
  );
}

export default OrderEntry;
