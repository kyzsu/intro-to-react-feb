import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
afterEach(cleanup);

import Pizza from "../Pizza";

test("alt in image?", async () => {
  const name = "Hawaiian Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza nama_pizza={name} deskripsi="piza dari hawaii" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("apakah punya image default?", async () => {
  const screen = render(
    <Pizza nama_pizza="hawaiian pizza" deskripsi="piza dari hawaii" />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});

test("apakah deskripsi sudah sesuai?", async () => {
  const deskripsi = "ikan hiu ikan lele";
  const screen = render(
    <Pizza nama_pizza="hawaiian pizza" deskripsi={deskripsi} />,
  );

  const p = screen.getByRole("paragraph");
  expect(p.innerText).toBe(deskripsi);
});
