import { render, renderHook, cleanup, waitFor } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";

afterEach(cleanup);

import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  Category: "Classic",
  description: "Pepperoni, Mushrooms, Green Peppers",
  id: "pep_msh_pep",
  image: "/public/pizzas/pep_msh_pep.webp",
  sizes: { L: 17.5, M: 14.5, S: 11 },
};

// v1
function getPizzaOfTheDay() {
  let pizza;

  function TestComponent() {
    pizza = usePizzaOfTheDay();
    return null;
  }

  render(<TestComponent />);

  return pizza;
}

test("kosong saat pertama kali dipanggil?", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const pizza = getPizzaOfTheDay();
  expect(pizza).toBeNull();
});

// v2
test("null saat pertama kali dipanggil? (v2)", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay(""));
  expect(result.current).toBeNull();
});

test("memastikan API di-call dan mengembalikan nilai (pizza hari ini)", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      Category: "Classic",
      description: "Pepperoni, Mushrooms, Green Peppers",
      id: "pep_msh_pep",
      image: "/public/pizzas/pep_msh_pep.webp",
      sizes: { L: 17.5, M: 14.5, S: 11 },
    }),
  );
  const { result } = renderHook(() => usePizzaOfTheDay(""));
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });

  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
