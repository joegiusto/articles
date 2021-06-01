import { MongoClient } from 'mongodb'
import { mongoose } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo
let cachedMongoose = global.mongoose

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

// if (!cachedMongoose) {
//     cachedMongoose = global.mongoose = { conn: null, promise: null }
// }

export async function connectToDatabase() {

  if (cached.conn) {
    return cached.conn
  }

//   if (cachedMongoose.conn) {
//     return cachedMongoose.conn
//   }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }

//   if (!cachedMongoose.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }

//     cachedMongoose.promise = mongoose.connect(MONGODB_URI, opts).then((client) => {
//         // return {
//         //     client,
//         //     db: client.db(MONGODB_DB),
//         // }
//         console.log("Mongoose connected")
//     })
//   }

  cached.conn = await cached.promise
  return cached.conn
}
