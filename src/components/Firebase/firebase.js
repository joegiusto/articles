import * as firebase from 'firebase';

// Your web app's Firebase configuration
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
// firebase.initializeApp(config);

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.database = firebase.database();
    this.functions = firebase.functions();

    /* Helper */
    this.serverValue = firebase.database.ServerValue;
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url:  process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

        // default empty roles
        if (!dbUser.roles) {
          dbUser.roles = {};
        }

        // merge auth and db user
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          meta: authUser.metadata,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
          ...dbUser,
        };
        next(authUser);
        });
      } else {
        fallback();
      }
    });

  // Submisison API
  submission = number => this.database.ref(`submissions/${number}`)
  submissions = () => this.database.ref('submissions')

  // User API
  user = uid => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');

  issue = uid => this.database.ref(`issues/${uid}`);
  issues = () => this.database.ref('issues');

  // *** Message API ***
  message = uid => this.database.ref(`messages/${uid}`);
  messages = () => this.database.ref('messages');

  // *** Donation API ***
  donation = uid => this.database.ref(`donations/${uid}`);
  donations = () => this.database.ref('donations');

  onlineList = () => this.database.ref(`online/`);
  online = uid => this.database.ref(`users/${uid}/online`);

  // functions = this.functions;

  resetUserOutset = uid => this.database.ref(`users/${uid}`).update({
    outset: 0
  });

  incrementUserOutset = uid => this.database.ref(`users/${uid}`).update({
    outset: 5
  });

}

export default Firebase
// export { Firebase, firebase, auth, database };
