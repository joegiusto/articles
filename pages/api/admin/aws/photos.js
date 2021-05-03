// This is an example of how to access a session from an API route
import AWS from 'aws-sdk'
import { getSession } from 'next-auth/client'
// import { connectToDatabase } from "../../../util/mongodb";

AWS.config.update({
    'accessKeyId': process.env.ARTICLES_AMAZON_ACCESS_KEY_ID,
    'secretAccessKey': process.env.ARTICLES_AMAZON_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3();

async function listAllObjectsFromS3Bucket(bucket, prefix) {
    let isTruncated = true;
    let marker;
    let photos = [];
    while(isTruncated) {
    let params = { Bucket: bucket };
    if (prefix) params.Prefix = prefix;
    if (marker) params.Marker = marker;
    try {
        const response = await s3.listObjects(params).promise();

        response.Contents.forEach(item => {
        // console.log(item.Key);
        photos.push(item.Key)
        });

        isTruncated = response.IsTruncated;

        if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
        }

        // console.log(photos)
        return(photos);
    } catch(error) {
        // throw error;
        console.log(error);
        isTruncated = false;
    }
    }
}

export default async (req, res) => {
    const session = await getSession({ req })
    // const { db } = await connectToDatabase();

    // console.log(session.user.email)

    // if (!req.body.prefix) {
    //     res.status(403).json(
    //         {
    //             message: 'Please provide a prefix'
    //         }
    //     )
    // }

    if ( session?.user?.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        // listAllDirectories('articles-website', '').then(results => {
        //     console.log("Call to /api/photos/ done");
        //     return res.send(results);
        // })

        listAllObjectsFromS3Bucket('articles-website', req.body.prefix).then(results => {
            console.log("Call to /api/secure/aws/getDirectoryPhotos done");
            return res.send(results);
        })

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

}