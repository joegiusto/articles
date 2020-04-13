// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("articles_data");
//   var myobj = { 
//     first_name: "Joey",
//     last_name: "Giusto",
//     address: {
//       state: 'New York',
//       zip: '12524',
//       city: 'Fishkill'
//     },
//     legal: {
//       terms: false,
//       cookies: false,
//       privacy: false
//     },
//     sign_up_date: 1586544138,
//     birth_date: 1586544138,
//     last_online_date: 1586544138,

//     subscriptions: [
//       {
//         news_id: 20,
//         last_viewed: 1586544138
//       },
//       {
//         news_id: 21,
//         last_viewed: 1586504138
//       }
//     ],
//     orders: [1, 7, 80],
//     submissions: [23, 67, 98, 1023]
//   };
//   dbo.collection("articles_users").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });