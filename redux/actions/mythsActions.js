import axios from "axios";

export const setMyths = () => dispatch => {
    console.log(`[First Load] Getting Recent Myths`);

    dispatch({
        type: 'SET_MYTHS_LOADING',
        loading: true
    });

    axios.get("/api/news/myths")
    .then( res => {
        // console.log("Got Stories")
        dispatch({
            type: 'SET_MYTHS',
            payload: res.data,
            loading: false
        });
    }
    ) 
    .catch(err =>
        console.log(err.response.data)
    );

};