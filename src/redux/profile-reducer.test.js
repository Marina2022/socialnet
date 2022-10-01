import profileReducer, {addPostActionCreator, deletePostAC} from "./profile-reducer";

const state = {
  posts: [
    {id: 1, message: "Life is beautiful!", likesCount: 15},
    {id: 2, message: "go to school", likesCount: 20},
    {id: 3, message: "What's going on?", likesCount: 5}
  ]
}

it ('adds a post', ()=>{
  const action = addPostActionCreator('trulala');
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
})

it ('adds a post-text', ()=>{
  const action = addPostActionCreator('trulala');
  const newState = profileReducer(state, action);
  expect(newState.posts[3].message).toBe("trulala");
})

it ('delete a post', ()=>{
  const action = deletePostAC(1);
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
})