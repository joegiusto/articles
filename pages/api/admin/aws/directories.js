// This is an example of how to access a session from an API route
import AWS from 'aws-sdk'
import { getSession } from 'next-auth/client'
// import { connectToDatabase } from "../../../util/mongodb";

AWS.config.update({
    'accessKeyId': process.env.ARTICLES_AMAZON_ACCESS_KEY_ID,
    'secretAccessKey': process.env.ARTICLES_AMAZON_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3();

const listAllDirectories = params => {
    return new Promise ((resolve, reject) => {
        const s3params = {
        Bucket: 'articles-website',
        MaxKeys: 20,
        Delimiter: '/',
        };
        s3.listObjectsV2 (s3params, (err, data) => {
        if (err) {
            reject (err);
        }
        resolve (data);
        });
    });
};

export default async (req, res) => {
    const session = await getSession({ req })
    // const { db } = await connectToDatabase();

    // console.log(session.user.email)

    if ( session?.user?.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        listAllDirectories('articles-website', '').then(results => {
            console.log("Call to /api/photos/ done");
            return res.send(results);
        })

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

}