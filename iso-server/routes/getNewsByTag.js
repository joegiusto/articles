module.exports = (app, db) => {
  app.post('/api/getNewsByTag', (req, res) => {

    console.log("Call to /api/getNewsByTag at" + new Date());
    console.log(req.body.tag);

    let data = {};

    db.collection("articles_news")
    .find( {'news_tags.tag_name': { $in: [req.body.tag] } } )
    .toArray(function(err, result) {
      if (err) throw err;
      data.tags = result;
      return res.send(data);
    });

    // db.collection("articles_donations").insertOne(
    //   {
    //     amount: 5000,
    //     date: 1574187988687,
    //     name: 'Joey Giusto',
    //     message: "Another deposit",
    //     createdBy: "5e90cc96579a17440c5d7d52",
    //     wasMatched: false,
    //     matchedBy: null,
    //   }
    // )

    // db.collection("articles_proposals").remove({});

    // db.collection("articles_proposals").insertMany(
    //   [
    //     {
    //       type: 'social',
    //       title: 'Revise The Pledge Of Alligence',
    //       url: 'revise-the-pledge-of-alligence',
    //       description: "Revert the pledge back to its creators vision",
    //       content: ""
    //     },
    //     {
    //       type: 'social',
    //       title: 'Legalize Marijuana',
    //       url: 'legalize-marijuana',
    //       description: "Mariuana and alcohol equal availability"
    //     },
    //     {
    //       type: 'social',
    //       title: 'Expand Psychedelic Studys',
    //       url: 'expand-psychedelic-studys',
    //       description: "Expand psychedelic studys and trials"
    //     },
    //     {
    //       type: 'social',
    //       title: 'Lower Charges For Psychedelic Possession',
    //       url: 'legalize-marijuana',
    //       description: "Study is still needed, jail is not"
    //     },
    //     {
    //       type: 'social',
    //       title: 'Universal Emergency Number',
    //       url: 'universal-emergency-number',
    //       description: "One number for everyone, anywhere"
    //     },
    //     {
    //       type: 'eduacation',
    //       title: 'Class Size Reduction',
    //       url: 'class-size-reduction',
    //       description: 'Limit of 1-20 teacher/student for core subjects'
    //     },
    //     {
    //       type: 'eduacation',
    //       title: 'Public School Lunch Reform',
    //       url: 'school-lunch-reform',
    //       description: 'Better lunch, for all'
    //     },
    //     {
    //       type: 'financial',
    //       title: 'NASA Funding',
    //       url: 'nasa-funding',
    //       description: 'Set NASA budget to 2% (min) of Budget',
    //       cut: "Federal Budeget"
    //     },
    //     {
    //       type: 'financial',
    //       title: 'Tidy Up Tax Loopholes',
    //       url: 'tax-loopholes',
    //       description: 'Provide patches to common abused loopholes'
    //     },
    //     {
    //       type: 'fundemental',
    //       title: 'Mental Health Equality In Healthcare',
    //       url: 'mental-health-equality',
    //       description: 'Fair treatment of mental issues'
    //     },
    //     {
    //       type: 'fundemental',
    //       title: 'Federal Gun Laws',
    //       url: 'federal-gun-laws',
    //       description: 'Standard to protect people and gun owners'
    //     },
    //     {
    //       type: 'fundemental',
    //       title: 'Purto Rico Statehood',
    //       url: 'purto-rico-statehood',
    //       description: 'Allow Purto Rico to join the union'
    //     }
    //   ]
    // )
    
  });
}