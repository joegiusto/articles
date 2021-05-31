import cache from 'memory-cache';
import axios from 'axios'
import colors from 'colors'

import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {

    // const { db } = await connectToDatabase();

    if (cache.get('githubCommits') === null) {

        axios.get('https://api.github.com/repos/joegiusto/articles/commits', {
            headers: {
                Authorization: process.env.GITHUB_API_KEY,
                'User-Agent': 'joegiusto'
            }
        })
        .then(function (response) {

            cache.put('githubCommits', response.data, 60000);

            res.send({
                commits: response.data,
                cached: false
            });

        })
        .catch(function (error) {
            console.log(error);
            return res.status(400).send({
                message: 'There was an error in getting the commits'
            });
        });

        console.log('[Cache Engine] githubCommits is not stored in cache'.yellow);

    } else {
        res.send({
            commits: cache.get('githubCommits'),
            cached: true
        })

        console.log('[Cache Engine] githubCommits was stored in cache'.yellow);
    }

};