import usersReducer, {follow, InitialStateType, UserReducerACs} from "./users-reducer";
import  {usersApi} from "../api/usersApi";

jest.mock('../api/usersApi')
const userApiMock = usersApi;

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}




let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Maea',
                status: 'ddd',
                photos: {
                    small: 'dddfff',
                    large: 'sdfsdf'
                },
                followed: false
            },
            {
                id: 1,
                name: 'musa',
                status: 'dfsdfsdfsd',
                photos: {
                    small: '3333',
                    large: 'ssss'
                },
                followed: false
            }, {
                id: 2,
                name: 'kaka',
                status: 'ddd',
                photos: {
                    small: 'dddfff',
                    large: 'sdfsdf'
                },
                followed: true
            },
            {
                id: 3,
                name: 'puka',
                status: 'dfsdfsdfsd',
                photos: {
                    small: '3333',
                    large: 'ssss'
                },
                followed: true
            }

        ],
        currentPage: 22,
        pageCount: 15,
        totalPageCount: 0,
        isFetching: false,
        followingInProgress: [],
    }
})

test("follow makes right state", () => {
    const newState = usersReducer(state, UserReducerACs.followSuccess(1))
    expect(newState.users[1].followed).toBeTruthy();
})

test ("thunk follow dispatches three times", async ()=>{
    // @ts-ignore
    userApiMock.follow.mockReturnValue(result)
    const thunk = follow(0);
    const myDispatch = jest.fn();
    // @ts-ignore
    await thunk(myDispatch);
    expect(myDispatch).toBeCalledTimes(3);

})


