import ReactDOM from "react-dom";

// import Pizza from "./Pizza";
import Order from "./Order";

const App = () => {
  return (
    <div>
      <h1>Best Pizza in Jakarta!</h1>
      {/* <Pizza nama_pizza="Pepperoni" deskripsi="Saus Tomat, Pepperoni, Keju" />
      <Pizza nama_pizza="Vegetarian" deskripsi="sawi, jamur, jagung" />
      <Pizza nama_pizza="Meat Lovers" deskripsi="Daging sapi, ayam, sosis" /> */}
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
