import axios from "axios";
import { useEffect, useState } from "react";
import Scoops from "./Scoops";
import Row from "react-bootstrap/Row";
import Topping from "./Topping";
import AlertBanner from "../common/AlertBanner";

function Options({ optionTypes }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (error) return <AlertBanner />;

  return <Row>{optionItems}</Row>;
}

export default Options;
