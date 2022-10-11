import axios from "axios";
import { useEffect, useState } from "react";
import Scoops from "./Scoops";
import Row from "react-bootstrap/Row";
import Topping from "./Topping";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurreny } from "../../utilities/index";

function Options({ optionTypes }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/${optionTypes}`
        );
        const data = await response.data;
        setItems(data);
      } catch (err) {
        setError(true);
      }
    };

    getItems();
  }, [optionTypes]);

  const ItemComponent = optionTypes === "scoops" ? Scoops : Topping;
  const title =
    optionTypes[0].toUpperCase() + optionTypes.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (error) return <AlertBanner />;

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurreny(pricePerItem[optionTypes])} each</p>
      <p>
        {title} total: {formatCurreny(totals[optionTypes])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
