const search = 'search/q?'

//action
const searchaction = (searchresult) => ({
    type:search,
    payload:searchresult
})

//thunk
export const searchthunk = (searchterm) => async(dispatch) =>{
    const response = await fetch(`/api/search/top?q=${searchterm}`)
    console.log(response,"this is response from thunk")
    if(response.ok){
        const data = await response.json()
        dispatch(searchaction(data))
        return data
    }
    return
}

const searchreducer = (state = {},action) =>{
    let newState
    switch(action.type){
        case search:
            action.payload.forEach(user => {
                newState[user.id] = user
            })
            return newState
        default:
            return state;
    }
}

export default searchreducer
