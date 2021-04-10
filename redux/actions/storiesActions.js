import axios from "axios";

export const setStories = () => dispatch => {
    console.log(`[First Load] Getting Recent Stories`);

    dispatch({
        type: 'SET_STORIES_LOADING',
        loading: true
    });

    axios.get("/api/news/stories")
    .then( res => {
        // console.log("Got Stories")
        dispatch({
            type: 'SET_STORIES',
            payload: res.data,
            loading: false
        });
    }
    ) 
    .catch(err =>
        console.log(err.response.data)
    );

};