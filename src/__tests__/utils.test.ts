import { Axios, AxiosError } from "axios";
import { server } from "../mocks/server";
import { loadingUsers, setUsers } from "../redux/actions";
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

describe('Testing Actions', () => {
  it('Set User Test',() => {
    const action = setUsers([]);
    expect(action.payload).toEqual([]);
  })

  it('Loading Test', () => {
    const action = loadingUsers(false);
    expect(action.payload).toBe(false);
  })
})


