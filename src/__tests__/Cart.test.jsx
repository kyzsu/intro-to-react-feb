import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot dengan keranjang kosong", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot dengan keranjang ada isinya", () => {
  const { asFragment } = render(
    <Cart
      cart={[
        {
          pizza: {
            id: "hawaiian",
            name: "The Hawaiian Pizza",
            category: "Classic",
            description: "Sliced Ham, Pineapple, Mozzarella Cheese",
            image: "/public/pizzas/hawaiian.webp",
            sizes: {
              S: 10.5,
              M: 13.25,
              L: 16.5,
            },
            size: "L",
            price: 16.5,
          },
        },
        {
          pizza: {
            id: "the_greek",
            name: "The Greek Pizza",
            category: "Classic",
            description:
              "Kalamata Olives, Feta Cheese, Tomatoes, Garlic, Beef Chuck Roast, Red Onions",
            image: "/public/pizzas/the_greek.webp",
            sizes: {
              S: 12,
              M: 16,
              L: 20.5,
            },
            size: "M",
            price: 16,
          },
        },
      ]}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
