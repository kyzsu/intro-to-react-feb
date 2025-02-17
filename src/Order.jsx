import { useState } from "react";

import Pizza from "./Pizza";

export default function Order() {
  const [jenisPizza, aturJenisPizza] = useState("meat_lovers");
  const [ukuranPizza, aturUkuranPizza] = useState("M");

  return (
    <div className="order">
      <h2>Buat Order Baru</h2>
      <form>
        <div>
          <div>
            <select
              name="jenis_pizza"
              value={jenisPizza}
              onChange={(e) => aturJenisPizza(e.target.value)}
            >
              <option value="pepperoni">Pepperoni</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="meat_lovers">Meat lovers</option>
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
        <div className="order-pizza">
          {/* pizza yang kita pilih */}
          <Pizza
            nama_pizza="Pepperoni"
            deskripsi="Keju, Pepperoni, Saus Tomat"
          />
          <p>$6.9</p>
        </div>
      </form>
    </div>
  );
}
