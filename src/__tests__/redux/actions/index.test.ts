import { loadingUsers, setUsers } from "../../../redux/actions";

describe('Testing Actions', () => {
  it('should return empty array',() => {
    const action = setUsers([]);
    expect(action.payload).toEqual([]);
  })
  it('should return payload as false', () => {
    const action = loadingUsers(false);
    expect(action.payload).toBe(false);
  })
})