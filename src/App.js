import React from "react";
import ReactDOM from "react-dom";

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.nama_pizza),
    React.createElement("p", {}, props.deskripsi),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Best Pizza in Jakarta!"),
    React.createElement(Pizza, {
      nama_pizza: "Meat Lovers",
      deskripsi: "Daging sapi, ayam, sosis.",
    }),
    React.createElement(Pizza, {
      nama_pizza: "vegetarian",
      deskripsi: "sawi, jamur, jagung",
    }),
    React.createElement(Pizza, {
      nama_pizza: "Pepperoni",
      deskripsi: "Saus Tomat, Pepperoni, Keju",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
