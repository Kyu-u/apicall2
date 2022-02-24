import { Axios, AxiosError } from "axios";
import { server } from "../mocks/server";
import { loadingUsers, setUsers } from "../redux/actions";
import { makeRequest } from "../services";
describe("Testing API Requests", () => {
  it("should return 10 users", async () => {
    expect(
      await makeRequest("https://jsonplaceholder.typicode.com/users", "get")
    ).toHaveLength(10);
  });
  it("should return 10 posts", async () => {
    expect(
      await makeRequest("https://jsonplaceholder.typicode.com/posts?userId=1", "get")
    ).toHaveLength(10);
  });
  it("should return 10 comments", async () => {
    expect(
      await makeRequest("https://jsonplaceholder.typicode.com/comments?_page=1", "get")
    ).toHaveLength(10);
  });
  it("should return 404 error message", async () => {
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



