import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import getPastOrders from "../api/past-orders";

export const Route = createLazyFileRoute("/past-orders")({
  component: pastOrderRoute,
});

function pastOrderRoute() {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 3000,
  });
  //

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={data.length <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
