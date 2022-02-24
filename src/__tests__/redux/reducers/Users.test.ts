import { IUserData, IUserState } from "../../../interfaces";
import { dummyUsers } from "../../../mocks/constants/Users";
import { loadingUsers, setUsers } from "../../../redux/actions";
import { UserReducer } from "../../../redux/reducers/UserReducer";
import { initialState } from "../../../redux/reducers/UserReducer";
import { UserActions } from "../../../redux/types/UserActionTypes";
describe("Users Reducer", () => {
  it("Should return initial state", () => {
    expect(UserReducer(undefined, {} as UserActions)).toEqual(initialState);
  });
  it("Should update loading state", () => {
    const nextState = { ...initialState, loading: true };

    expect(UserReducer(initialState, loadingUsers(true))).toEqual(nextState);
  });
  it("Should return state with data", () => {
    const nextState = { ...initialState, users: dummyUsers };
    expect(UserReducer(initialState, setUsers(dummyUsers))).toEqual(nextState);
  });
});
