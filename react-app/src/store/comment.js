//const
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const GET_COMMENTS = 'comment/GET_COMMENTS';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

//action
const getComments = (user) => ({
    type: GET_COMMENTS,
    payload:user
})

const createComment = (data) => ({
    type: CREATE_COMMENT,
    payload: data
})

const editComment = (data) => ({
    type: EDIT_COMMENT,
    payload: data
})

const deleteComment = (data) => ({
    type: DELETE_COMMENT,
    payload: data
})

//thunk
export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments')
    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data))
        return data
    }
    return
}

export const createCommentThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createComment(data))
        return data
    }
    return
}

export const editCommentThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editComment(data))
        return data
    }
    return
}

export const deleteCommentThunk = (info) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteComment(data))
        return data
    }
}

const initialState = {};

const commentreducer = (state = initialState, action) => {
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
export default commentreducer
