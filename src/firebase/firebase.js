import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68",
  authDomain: "articles-1776.firebaseapp.com",
  databaseURL: "https://articles-1776.firebaseio.com",
  projectId: "articles-1776",
  storageBucket: "articles-1776.appspot.com",
  messagingSenderId: "565403139080"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

database.ref('orders')
  .once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  });

database.ref('orders').on('value', (snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });

  console.log(expenses);
});

// database.ref('orders').push({
//   item: 'Shirt',
//   description: '',
//   note: '',
//   amount: 3000,
//   createdAt: 0
// });

// database.ref('expenses').set(null);

// database.ref('notes/-Krll52aVDQ3X6dOtmS7').remove();

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });

// Setup data sub -> Andrew is a Software Developer at Amazon.

// Change the data and make sure it reprints

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref().set({
//   citizens: {
//     one: {

//       name: 'Joey Giusto',
//       age: 894340800,
//       admin: true,
//       location: {
//         city: 'Philadelphia',
//         country: 'United States'
//       },
//       orders: ['0001','0002','0003','0004'],

//       isEmployee: true,
//       job: {
//         title: 'Software developer',
//         company: 'Google'
//       },
//       payroll: {
//         visibile: true,
//         department: 'Software developer'
//       },

//     }
//   },
//   orders: ['0001','0002','0003','0004'],
//   stories: [ 
//     {
//       date:1,
//       title: 'Test 1'
//     },
//     {
//       date:1,
//       title: 'Test 2'
//     },
//     {
//       date:1,
//       title: 'Test 3'
//     },
//     {
//       date:1,
//       title: 'Test 4'
//     } 
//   ]

// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// })

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

// database.ref()
//   .remove()
//   .then(() => {
//     console.log('Data was removed');
//   }).catch((e) => {
//     console.log('Did not remove data', e);
//   });
