import Button from "react-bootstrap/Button";

function OrderConfirmation({ setOrderPhase }) {
  const handleClick = () => setOrderPhase("inProgress");

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  return (
    <div>
      <h1>Thank you!</h1>
      <p>Your order number is</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      {newOrderButton}
    </div>
  );
}

export default OrderConfirmation;
