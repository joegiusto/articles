import formidable from 'formidable';
import { ObjectId } from 'mongodb';
// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

import moment from 'moment'

import { connectToDatabase } from "../../../util/mongodb";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    if (session) {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;

        var GeneratedObjectId = ObjectId();

        form.parse(req, (err, fields, files) => {

            console.log(fields);
            console.log(session.user._id)
            console.log(fields.chat_id)

            db.collection("articles_messages").updateOne( 
                {_id: ObjectId(fields.chat_id) }, 
                {
                  $push: {
                    messages: {
                      _id: GeneratedObjectId,
                      sender: session.user._id,
                      message: fields.message,
                      date: moment()._d
                    }
                  }
                },
                function(err, response) {
                    if (err) throw err;
                    console.log(`Call to /api/chatMessage done`);
        
                    // io.in('game').emit('big-announcement', 'the game will start soon');
        
                    //   io.in(fields.chat_id).emit('message', {
                    //     chat_id: fields.chat_id,
                    //     _id: GeneratedObjectId,
                    //     date: moment()._d,
                    //     message: fields.message,
                    //     sender: session.user._id
                    //   });
        
                    // return res.send('Message Saved');
                    //   console.log(respone)
                    console.log(GeneratedObjectId)
                    return res.send(response);
                  
                }
            );

        });

    } else {
        res.send({ error: 'You must be signed in to send messages.' })
    }

}