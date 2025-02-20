import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("bisa submit form gak?", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "OK" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Your Name");
  const emailInput = screen.getByPlaceholderText("Your Email");
  const messageInput = screen.getByPlaceholderText("Your Message");

  const testData = {
    name: "Will",
    email: "immanuelir@metrodata.co.id",
    message: "contoh kirim email",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageInput.value = testData.message;

  const btn = screen.getByRole("button");

  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("berhasil dikirim!");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalled("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
