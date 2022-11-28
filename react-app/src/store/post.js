//const
const CREATE_POST = 'post/CREATE_POST';
const GET_POSTS = 'post/GET_POSTS';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';

//action
const getPosts = (user) => ({
    type: GET_POSTS,
    payload:user
})

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const editPost = (post) => ({
    type: EDIT_POST,
    payload: post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    payload: post
})

//thunk
export const getPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    // console.log(response, 'this is responsesssss')
    if (response.ok) {
        const data = await response.json()
        // console.log(data, 'this is data from thunk')
        dispatch(getPosts(data))
        return data
    }
    return
}

export const createPostThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    console.log(response, 'this is response from create thunk')
    if(response.ok){
        const data = await response.json()
        console.log(data, 'this is data from createThunk')
        dispatch(createPost(data))
        return data
    }
    return
}

export const editPostThunk = (info,id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    console.log(response,info,id, 'this is response from thunk')
    if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(editPost(data))

        return data
    }
    return
}

export const deletePostThunk = (id) => async (dispatch) => {
    console.log(id,'this is id from thunk')
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const data = await response.json()
        dispatch(deletePost(data))
        return data
    }
}

const initialState = {};
export default function postReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = {...state}
            // console.log(action.payload[0], 'this is action.payload')
            // console.log(action.payload , 'this is before Object.value')
            let array = action.payload.posts
            // console.log(array, 'this is array')
            array.forEach(postx => {
                newState[postx.id] = postx
            })
            console.log(newState, 'this is new state')
            return newState
        case CREATE_POST:
            newState = {...state, [action.payload.id]: action.payload}
            return newState
        case EDIT_POST:
            newState = {...state, [action.payload.id]: action.payload}
            return newState
        case DELETE_POST:
            newState = {...state}
            console.log(action.payload, 'this is action.payload')
            delete newState[action.payload.id]
            return newState
        default:
            return state;
    }
}
