import Options from "./Options";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurreny } from "../../utilities/index";

function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const onClick = () => setOrderPhase("review");
  return (
    <>
      <Options optionTypes="scoops" />
      <Options optionTypes="toppings" />
      <h2>Grand total: {formatCurreny(totals.scoops + totals.toppings)}</h2>
      <Button onClick={onClick}>Order Sundae!</Button>
    </>
  );
}

export default OrderEntry;
