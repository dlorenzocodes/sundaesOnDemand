import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurreny } from "../../utilities/index";

function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = totals.toppings > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts.toppings);
    const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurreny(totals.toppings)}</h2>
        <ul>{toppingsList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurreny(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
