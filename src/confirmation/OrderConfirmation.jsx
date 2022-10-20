import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useOrderDetails } from "../context/OrderDetails";
import axios from "axios";
import AlertBanner from "../pages/common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const { resetOrders } = useOrderDetails();

  useEffect(() => {
    const submitOrderDetails = async () => {
      try {
        const response = await axios.post(`http://localhost:3030/order`);
        const data = await response.data;
        setOrderNumber(data.orderNumber);
      } catch (error) {
        setError(true);
      }
    };

    submitOrderDetails();
  }, []);

  const handleClick = () => {
    resetOrders();
    setOrderPhase("inProgress");
  };

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <p>Your order number is{orderNumber}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default OrderConfirmation;
