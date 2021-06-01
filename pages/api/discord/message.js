import { getSession } from 'next-auth/client'

import axios from 'axios';

export default async (req, res) => {
    const session = await getSession({ req })

    if ( session.user.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        axios.post(process.env.DISCORD_HOOK, {
            username: "Articles Hook",
            avatar_url: "https://cdn.articles.media/email/logo.jpg",
            content: `Test!`
            },
            {
                'Content-type': 'application/json'
            }
        )
        .then(function (response) {
            res.json({
                message: 'Success'
            });
        })
        .catch(function (error) {
            return res.status(400).json({ 
                message: 'Discord rejected the message',
            })
        });

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

};