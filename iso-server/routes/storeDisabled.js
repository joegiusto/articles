module.exports = (app, db) => {
  app.get('/api/storeDisabled', function (req, res) {

    console.log(`Call to storeDisabled`)

    return res.send(app.get('mongoConfig').store.enabled)

  });

}