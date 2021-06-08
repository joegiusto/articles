import axios from "axios";

export const setMessages = () => dispatch => {
    console.log(`[First Load] Getting Recent Myths`);

    dispatch({
        type: 'SET_MESSAGES_LOADING',
        loading: true
    });

    axios.get("/api/user/messages", {
        type: 'toolbar'
    })
    .then( res => {
        // console.log("Got Stories")
        dispatch({
            type: 'SET_MESSAGES',
            payload: res.data,
            loading: false
        });
    }
    ) 
    .catch(err =>
        console.log(err.response.data)
    );

};