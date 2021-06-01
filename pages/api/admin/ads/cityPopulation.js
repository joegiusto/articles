// This is an example of how to access a session from an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

import axios from 'axios'

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session.user.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        const users = await db.collection("articles_users").find( {}, { projection: { 'address.zip': 1 } } ).toArray();

        let processed_users = []

        users.map( (user, i) => {

            if (  processed_users.findIndex( obj => obj.zip === user.address.zip ) === -1  ) {
            // console.log('not')

            // console.log(user.address.zip)

            // Do not process users with no address zip information
            if (user.address.zip !== undefined && user.address.zip !== null) {
                processed_users.push({
                zip: user.address.zip,
                amount: 1
                })
            }

            } else {
            const index = processed_users.findIndex( obj => obj.zip === user.address.zip )
            console.log(index)
            processed_users[index].amount = processed_users[index].amount + 1

            }

        } )

        processArray();

        async function processArray() {
            const output = []
            
            // Keep this around a little bit
            // const promises = users.map( async(item, i) => {

            //   const it = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            //     params: {
            //       address: item.address.zip,
            //       key: process.env.GOOGLE_MAPS_KEY
            //     }
            //   })
            //   .then(function (response) {
            //     console.log(response.data.results[0].geometry.location)
            //     return response.data.results[0]
            //   })
            //   .catch(function (error) {
            //     return error
            //   });

            //   item = {...it.geometry.location}
            //   item.name = it.address_components[1].short_name
            //   item.zip = users[i].address.zip
            //   item.amount = 1
            //   output.push(item)
            // })

            console.log(processed_users)

            const promises = processed_users.map( async(item, i) => {

            const it = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                address: item.zip,
                key: process.env.GOOGLE_MAPS_KEY
                }
            })
            .then(function (response) {
                console.log(response.data.results[0].geometry.location)
                return response.data.results[0]
            })
            .catch(function (error) {
                return error
            });

            item = {...it.geometry.location}
            item.name = it.address_components[1].short_name
            item.zip = processed_users[i].zip
            item.amount = processed_users[i].amount
            output.push(item)
            })

            await Promise.all(promises)
            return res.json({ data: output })
        }

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

}