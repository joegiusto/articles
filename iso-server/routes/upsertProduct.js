// const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {

  app.post('/api/upsertProduct', (req, res) => {
    console.log(`Call to /api/upsertProduct made at ${new Date()}`);

    // const o_id = new ObjectId(req.body.product);

    const product = req.body.product;

    db.collection("articles_products").updateOne({_id: ObjectId(product._id)}, {
      $set: {
        title: product.title,
        type: product.type,
        price: parseInt(product.price),
        ourCost: product.ourCost,
        material: product.material,
        release: product.release,
        visible: product.visible,
        includesSubscription: product.includesSubscription,
        subscriptionTime: product.subscriptionTime,
        photos: {
          one: product.photos.one,
          two: product.photos.two,
          three: product.photos.three,
          four: product.photos.four,
          five: product.photos.five,
          six: product.photos.six
        }
      }
    },
    {
      upsert: true
    }, 
    function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/upsertProduct done`);
    });

    return res.end();

  });

} 