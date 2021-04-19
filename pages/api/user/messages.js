var ObjectId = require('mongodb').ObjectId; 

// This is an example of to protect an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    if (session) {

        const results = await db
        .collection("articles_messages")
        // .find( { users: { $in: [`${req.query.user._id}`] } } )
        .find( { users: { $in: ["5e90cc96579a17440c5d7d52"] } } )
        .toArray( async (err, response) => {

            // console.log("Made it here");

            let fetchedThreads = []

            // var fetchedThreadsPromiseArray = response.map( chat => {
            const anAsyncFunctionTop = chat => {

                return new Promise( async (resolve, reject) => {
                
                    let fetchedUsers = []

                    const anAsyncFunction = user => {
                        return new Promise( async (resolve, reject) => {
                            await db.collection("articles_users").findOne( { _id: ObjectId( user ) }, { projection: {first_name: 1, last_name: 1 } }, function(subErr, subResult) {
                                if (err) throw subErr;
                
                                // console.log(subResult)
                
                                let fetchedName = ''
                
                                if (subResult === null) {
                                    fetchedName = "Deleted User"
                                } else {
                                    fetchedName = subResult.first_name + ' ' + subResult.last_name
                                }
                                
                                fetchedUsers.push({id: user, name: fetchedName});
                                fetchedName = ''
                                // return Promise.resolve('ok')
                                // return functionWithPromise(subResult)
                                resolve(user)
                            });
                        })

                    }

                    const getData = async () => {
                        return Promise.all( chat.users.map(user => anAsyncFunction(user)) )
                    }

                    getData().then(data => {
                        // console.log(data)
                        // console.log("fetchedUsers added")
                        chat.fetchedUsers = fetchedUsers
                        resolve(chat)
                    })

                })

            }

            const getData = async () => {
                return Promise.all( response.map(chat => anAsyncFunctionTop(chat)) )
            }

            getData().then(data => {
                // console.log("All are done");
                // console.log(data)
                res.json(data);
            })
            
        })

    } else {
        res.send({ error: 'You must be signed in to send messages.' })
    }
}