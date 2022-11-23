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
    const response = await fetch('/api/posts')
    if (response.ok) {
        const data = await response.json()
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
    if(response.ok){
        const data = await response.json()
        dispatch(createPost(data))
        return data
    }
    return
}

export const editPostThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editPost(data))
        return data
    }
    return
}

export const deletePostThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deletePost(data))
        return data
    }
}

const initialState = {};
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            action.payload.forEach(post => {
                newState[post.id] = post
            })
            return newState
        case CREATE_POST:
            newState = {...state, [action.payload.id]: action.payload}
            return newState
        case EDIT_POST:
            newState = {...state, [action.payload.id]: action.payload}
            return newState
        case DELETE_POST:
            newState = {...state}
            delete newState[action.payload.id]
            return newState
        default:
            return state;
    }
}
