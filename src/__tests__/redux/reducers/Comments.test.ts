import { dummyComments } from "../../../mocks/constants/Comments";
import { loadingComments, setComments } from "../../../redux/actions";
import { CommentReducer } from "../../../redux/reducers/CommentReducer";
import { initialState } from "../../../redux/reducers/CommentReducer";
import { CommentActions } from "../../../redux/types/CommentActionTypes";
describe("Comments Reducer", () => {
  it("Should return initial state", () => {
    expect(CommentReducer(undefined, {} as CommentActions)).toEqual(initialState);
  });
  it("Should update loading state", () => {
    const nextState = { ...initialState, loading: true };

    expect(CommentReducer(initialState, loadingComments(true))).toEqual(nextState);
  });
  it("Should return state with data", () => {
    const nextState = { ...initialState, comments: dummyComments };
    expect(CommentReducer(initialState, setComments(dummyComments))).toEqual(nextState);
  });
});
