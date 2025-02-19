import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>William's Ristorante</h1>
        <p>Best Pizza in Jakarta</p>
      </div>
      <ul>
        <li>
          <Link to="/order">Order</Link>
        </li>
        <li>
          <Link to="/past-orders">Past Orders</Link>
        </li>
      </ul>
    </div>
  );
}
