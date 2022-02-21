import { Axios, AxiosError } from "axios";
import { server } from "../mocks/server";
import { makeRequest } from "../services";

describe("Testing API Requests", () => {
  it("get user test", async () => {
    expect(
      await makeRequest("https://jsonplaceholder.typicode.com/users", "get")
    ).toHaveLength(10);
  });

  it("get user test wrong url", async () => {
    try {
      await makeRequest(
        "https://jsonplaceholder.typicode.com/usersssss",
        "get"
      );
    } catch (e) {
      const err = e as AxiosError
      expect(err.message).toEqual("Request failed with status code 404");
    }
  });
});
