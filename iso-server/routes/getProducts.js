module.exports = (app, db) => {
  app.get('/getProducts', function (req, res) {

    console.log(`Call to /api/getProducts made at ${new Date()}`);

    // db.collection("articles_products").insert(
    //   {
    //     title: 'Sheep Hoodie',
    //     price: 3999,
    //     type: 'original',
    //     photos: ['1', '2', '3', '4', '5', '6']
    //   }
    // )
  
    db.collection("articles_products").find().toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log(`Call to /api/getProducts done`);
      return res.send(result) 
    });

  });

}