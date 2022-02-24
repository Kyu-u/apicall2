import { dummyPosts } from "../../../mocks/constants/Posts";
import { loadingPosts, setPosts } from "../../../redux/actions";
import { PostReducer } from "../../../redux/reducers/PostReducer";
import { initialState } from "../../../redux/reducers/PostReducer";
import { PostActions } from "../../../redux/types/PostActionTypes";
describe("Posts Reducer", () => {
  it("Should return initial state", () => {
    expect(PostReducer(undefined, {} as PostActions)).toEqual(initialState);
  });
  it("Should update loading state", () => {
    const nextState = { ...initialState, loading: true };

    expect(PostReducer(initialState, loadingPosts(true))).toEqual(nextState);
  });
  it("Should return state with data", () => {
    const nextState = { ...initialState, posts: dummyPosts };
    expect(PostReducer(initialState, setPosts(dummyPosts))).toEqual(nextState);
  });
});
