import moment from 'moment';

export default {
  
  global: {
    1: 'Socical'
  },

  local: {
    state: {

    },
    town: {

    }
  },

  national: [
    {
      id: 500,
      title: "Socical Security"
    },
    {
      id: 501,
      title: "Gun Laws"
    },
    {
      id: 502, 
      title: "Military"
    },
    {
      id: 503, 
      title: "Voting Rights"
    },
    {
      id: 504, 
      title: "Abortions"
    },
    {
      id: 505, 
      title: "Imigration"
    },
    {
      id: 506, 
      title: "Border Camps"
    },
    {
      id: 507, 
      title: "Flint Michigan"
    }
  ],
}

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
      linkGithub: '',
    }

  },
  // {
  //   id: '2',
  //   redact: false,
  //   nameFirst: "John",
  //   nameMiddle: "",
  //   nameLast: "Doe",
  //   location: {
  //     city: 'Wappingers',
  //     state: 'NY'
  //   },
  //   bio: "I don't exist but if I did this is where I would say something!",

  //   role: "Example Employee",
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
  //     hasFacebook: true,
  //     hasGithub: false
  //   }

  // },
  {
    id: '3',
    redact: true,
    nameFirst: "Secret First",
    nameMiddle: "Secret Middle",
    nameLast: "Secret Last",
    location: {
      city: "Shouldn't",
      state: 'Matter'
    },
    bio: 'Secret Bio',

    // Warning, A Redacted Employees Role is not a secret and will be displayed. This warning will be more useful in the employee crreation page.
    role: "Consultant",
    startDate: 1554091200,
    endDate: {
      hasHappened: false,
      reason: '',
      date: 0
    },

    payrole: {
      total: 203.45,
      stubs: [
        {
          amount: 100
        },
        {
          amount: 100
        }
      ]

    },
    social: {
      hasInstagram: false,
      hasFacebook: false,
      hasGithub: false
    }

  },
  // {
  //   id: '4',
  //   redact: false,
  //   nameFirst: "Stacey",
  //   nameMiddle: "",
  //   nameLast: "Doe",
  //   location: {
  //     city: 'Example',
  //     state: 'NY'
  //   },
  //   bio: "Testing the directory to see if it works for multiple people whose last name start with same letter",

  //   role: "Example",
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

  // },
];

export const sales = [
  {
    id: 0,
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Tyler W.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 1,
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Danny R.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 2,
    date: moment("2019-07-28T12:00").format('LLL'),
    name: 'Jon P.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 2,
    date: moment("2019-07-31T12:00").format('LLL'),
    name: 'Elvis H.',
    note: 'Pre Order',
    total: 30.00
  }
];

export const donations = [
  {
    id: 1,
    date: moment().subtract(4, 'days').subtract(7, 'hours').subtract(22, 'minutes').format('LLL'),
    name: 'Joey G.',
    message: 'Initial Donation',
    amount: 50.00
  }
];

export const expenses = [
  {
    id: 1,
    date: moment().startOf('month').format('LL'),
    name: 'Domain Purchase',
    department: 'All',
    total: 10.60
  },
];