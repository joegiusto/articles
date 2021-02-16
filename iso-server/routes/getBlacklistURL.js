module.exports = (app, db) => {

    var database = [
        {
          uuid: '1',
          urls: ['https://www.amazon.com', 'www.amazon.com'],
          status_icon: 'bad',
          short_response: 'Amazon is doing a lot of good in terms of innovation in the space and climate sectors but has current outstandings for exploiting workers and fighting unions'
        },
        {
          uuid: '2',
          urls: ['https://www.apple.com'],
          status_icon: 'good',
          short_response: 'Ah, apple, good ol Steve Jobs!'
        },
        {
          uuid: '3',
          urls: ['https://robinhood.com'],
          status_icon: 'mixed',
          short_response: 'Robinhood in January 2021 froze accounts from buying a stock that that was causing one of there business partners to lose money.',
          alternatives: [
              {
                  name: 'We Bull',
                  url: 'https://www.moomoo.com/'
              },
              {
                  name: 'Cash App',
                  url: 'https://www.moomoo.com/'
              },
              {
                  name: 'moomoo',
                  url: 'https://www.moomoo.com/'
              },
          ]
        },
        {
            uuid: '4',
            urls: ['https://articles.media'],
            status_icon: 'conflict of interest',
            short_response: 'This extension is made by Articles Media. We feel it would be a conflict of interest if we managed a standing on ourself, therefore we have left one out. Search us online to find what other people are saying.'
        },
        {
            uuid: '5',
            urls: ['https://www.blizzard.com/', 'https://na.leagueoflegends.com', 'https://worldofwarcraft.com', 'worldofwarcraft.com'],
            status_icon: 'bad',
            short_response: 'Blizzard punishes gamer and rescinds prize money for supporting Hong Kong protests'
        }
    ];

    app.get('/api/getBlacklist', function (req, res) {

        console.log(`Call to /api/getBlacklist made at ${new Date()}`);

        console.log(req.query.url)
      
        //   let obj = database.find( o => o.urls === o.urls.includes("https://articles.media") );
        let obj = database.find( o => o.urls.includes(req.query.url) );
        //   let obj = database.find( o => o.uuid === '3' );

        console.log(obj)

        res.send({
            details: obj || 'Nothing'
        }) 
    
    //   db.collection("articles_news").find({news_type: 'issue'}).toArray(function(err, result) {
    //     if (err) throw err;
    //     // db.close();
    //     console.log("Call to /api/getIssues done")
    //     return res.send(result) 
    //   });
    
    });
  
  }
  
  