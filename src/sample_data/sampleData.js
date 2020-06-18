import moment from 'moment';

export const employeeList = [
  {
    id: '42',
    redact: false,
    nameFirst: "Joey",
    nameMiddle: "Vincent",
    nameLast: "Giusto",
    location: {
      city: 'Fishkill',
      state: 'NY'
    },
    bio: 'Thank you for exploring the site, if you have any feedback, suggestions or ideas feel free to message me above so we can make this platform better.',
    role: "Administration",
    startDate: 1554091200,
    endDate: {
      hasHappened: false,
      reason: '',
      date: 0
    },
    payrole: [

      {
        year: 2019,
        stubs: [
          {week: 27, data: {rate: 0, type:'Hourly', hours: 50, total: 0.00} },
          {week: 28, data: {rate: 0, type:'Hourly', hours: 50, total: 0.00} },
          {week: 29, data: {rate: 0, type:'Hourly', hours: 50, total: 0.00} },
          {week: 30, data: {rate: 0, type:'Hourly', hours: 50, total: 0.00} },
          {week: 31, data: {rate: 0, type:'Hourly', hours: 50, total: 0.00} }
        ]
      },

    ],
    social: {
      hasInstagram: true,
      hasFacebook: true,
      hasGithub: true,

      linkInstagram: '',
      linkFacebook: '',
      linkGithub: 'https://github.com/joegiusto',
    }

  },
  // {
  //   id: '3',
  //   redact: true,
  //   nameFirst: "Secret First Name",
  //   nameMiddle: "Secret Middle Name",
  //   nameLast: "Secret Last Name",
  //   location: {
  //     city: "Hidden Valley",
  //     state: 'Atlantis'
  //   },
  //   bio: 'Top Secret Bio',

  //   // Warning, A Redacted Employees Role is never a secret and will be displayed. This warning will be more useful in the employee crreation page.
  //   role: "Consultant",

  //   startDate: 1554091200,
  //   endDate: {
  //     hasHappened: false,
  //     reason: '',
  //     date: 0
  //   },

  //   payrole: {
  //     total: 203.45,
  //     stubs: [
  //       {
  //         amount: 100
  //       },
  //       {
  //         amount: 100
  //       }
  //     ]

  //   },
  //   social: {
  //     hasInstagram: false,
  //     hasFacebook: false,
  //     hasGithub: false
  //   }

  // }
];

export const sales = [
  {
    id: 0,
    type: 'preorder',
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Joey G.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 0,
    type: 'preorder',
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Tyler W.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 1,
    type: 'preorder',
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Danny R.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 2,
    type: 'preorder',
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Jon P.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 3,
    type: 'preorder',
    date: moment("2019-07-31T12:00").format('LLL'),
    name: 'Elvis H.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 3,
    type: 'preorder',
    date: moment("2019-09-04T12:00").format('LLL'),
    name: 'Miles.',
    note: 'Pre Order',
    total: 30.00
  }
];