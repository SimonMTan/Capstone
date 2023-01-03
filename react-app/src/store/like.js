// thunk

export const presslike = (id) => async () => {
    await fetch(`/api/likes/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    })
}

// export const getLikesThunk = () => async (dispatch) => {
//     const response = await fetch(`/api/likes/${id}/total`)
//     if (response.ok) {
//         const data = await response.json()
//         // dispatch(getLikes(data))
//         return data
//     }
//     return
// }
