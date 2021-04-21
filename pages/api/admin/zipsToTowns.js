// This is an example of how to access a session from an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session.user.email == "joeygiusto@gmail.com" ) {

        console.log("Joey made this call")

        console.log(`Call to /api/secure/zipToTown made at ${new Date()}`);

        let converted = {}

        console.log(req.body)

        if (req.body.format === 'tally') {

            let cleanZips = Object.keys(req.body.zips).filter(zip => zip !== 'None');

            promises();

            async function promises() {
                const output = {}
                const promises = cleanZips.map( async(item, i) => {

                const promise = await db.collection("zips").findOne( { zip_code: parseInt(cleanZips[i]) }, { projection: {   } } )
                .then((response) => {
                    return response
                })
                .catch((error) => {
                    return error
                })

                console.log(item)
                console.log(promise)

                item = {[item]: promise}
                
                output[ cleanZips[i] ] = promise

                })
                await Promise.all(promises)
                console.log("THIS")
                console.log(output)
                return res.send(output)
            }

        } else {

            return res.status(400).send({
                message: 'Format not supported'
            });

        }

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    

}