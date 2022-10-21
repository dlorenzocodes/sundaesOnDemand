import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants/index";

const OrderDetails = createContext();

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error("useOrderDetails must be within an OrderDetailsProvider");
  }

  return context;
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionTypes) {
    // make copy of the existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy of the existing state
    newOptionCounts[optionTypes][itemName] = newItemCount;

    // update state with new updated copy
    setOptionCounts(newOptionCounts);
  }

  function resetOrders() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // utility function to derive totals ffrom optionCounts state value
  function calculateTotal(optionTypes) {
    // get an array of counts for the option type (ex. [1,2])
    const countsArray = Object.values(optionCounts[optionTypes]);

    // total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    return totalCount * pricePerItem[optionTypes];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrders };
  return <OrderDetails.Provider value={value} {...props} />;
}

export { useOrderDetails, OrderDetailsProvider };
