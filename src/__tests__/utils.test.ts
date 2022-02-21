import { server } from "../mocks/server";
import { makeRequest } from "../services";

describe("Testing API Requests", () => {
  it("get user test", async () => {
    expect(await makeRequest("https://jsonplaceholder.typicode.com/users", "get")).toHaveLength(10);
  });

  it("get user test wrong url", async () => {
    expect(await makeRequest("https://jsonplaceholder.typicode.com/usersssss", "get")).toThrow("404");
  });
});

