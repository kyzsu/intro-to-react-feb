import { useState, useEffect } from "react";

import Cart from "./Cart";
import Pizza from "./Pizza";

// format kurs --> intl menerima sebuah angka dan kemudian dia akan nge-format berdasarkan kurs yang dipilih.
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [ukuranPizza, aturUkuranPizza] = useState("M");
  const [jenisPizza, aturJenisPizza] = useState("pepperoni"); // nilai default -> pepperoni
  const [jenis2Pizza, aturJenis2Pizza] = useState([]); // menyimpan jenis-jenis pizza yang diterima dari API.
  const [loading, aturLoading] = useState(true); // menyimpan state dari pada fetching.
  const [cart, aturCart] = useState([]);

  let price, selectedPizza;
  if (!loading) {
    // jika loading bukan true
    selectedPizza = jenis2Pizza.find((pizza) => jenisPizza === pizza.id); // pepperoni bakal di set sebagai default, kemudian jika pengguna select berikut-berikutnya, maka dia akan di set ke pizza yang baru dipilih.
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[ukuranPizza] : "",
    ); // ngeformat harga berdasarkan pizza yang dipilih.
  }

  async function checkout() {
    aturLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    aturCart([]);
    aturLoading(false);
  }

  async function fetchPizzaTypes() {
    await new Promise((res) => setTimeout(res, 3000)); // loading state hardcode --> timeout 3s, kemudian baru dilanjutkan dengan fetching.

    const pizzaRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzaRes.json();
    aturJenis2Pizza(pizzasJson);
    aturLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []); // arg pertama adl callback, arg 2 adl dependency list. jika dep listnya kosong / [], dia akan menjalankan fungsi callbacknya diawal saja. tapi jika ada dep listnya, maka dia akan menjalankan callback setiap dep list mengalami perubahan nilai.

  return (
    <div className="order">
      <h2>Buat Order Baru</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          aturCart([
            ...cart,
            { pizza: selectedPizza, size: ukuranPizza, price },
          ]);
        }}
      >
        <div>
          <div>
            <select
              name="jenis_pizza"
              value={jenisPizza}
              onChange={(e) => aturJenisPizza(e.target.value)}
            >
              {/* <option value="pepperoni">Pepperoni</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="meat_lovers">Meat lovers</option> */}
              {jenis2Pizza.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>
              <span>
                <input
                  type="radio"
                  name="ukuran_pizza"
                  value="S"
                  id="small"
                  checked={ukuranPizza === "S"}
                  onChange={(e) => aturUkuranPizza(e.target.value)}
                />
                <label htmlFor="small">Small</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="ukuran_pizza"
                  value="M"
                  id="medium"
                  checked={ukuranPizza === "M"}
                  onChange={(e) => aturUkuranPizza(e.target.value)}
                />
                <label htmlFor="medium">Medium</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="ukuran_pizza"
                  value="L"
                  id="large"
                  checked={ukuranPizza === "L"}
                  onChange={(e) => aturUkuranPizza(e.target.value)}
                />
                <label htmlFor="large">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Tambahkan ke Keranjang</button>
        </div>
        {/* pizza yang kita pilih */}
        {loading ? (
          <h3>loading ...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              nama_pizza={selectedPizza.name}
              deskripsi={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
