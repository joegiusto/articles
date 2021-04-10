import axios from "axios";

export const setIssues = () => dispatch => {
    console.log(`[First Load] Getting Recent Issues`);

    dispatch({
        type: 'SET_ISSUES_LOADING',
        loading: true
    });

    axios.get("/api/news/myths")
    .then( res => {
        // console.log("Got Stories")
        dispatch({
            type: 'SET_ISSUES',
            payload: res.data,
            loading: false
        });
    }
    ) 
    .catch(err =>
        console.log(err.response.data)
    );

};