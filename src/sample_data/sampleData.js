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
      // Fund that forever and mean it, stop worrying Americans already please.
    },
    {
      id: 499,
      title: "Pollution",
      aspects: ["Cost of Free Trade ( Link with Free trade vs Fair trade issue)", "Lobbiest", "Immediate Action Scares and need for transition times"]
      // Like shootings and video games at the end of the day the average American is not the problem, that is a scapegoat. The issue is large coportaions.
      // Companies need to do soething about it but we need to give them time,calls for imediate action will hurt but that dosn't mean we ignore the problem.
    },
    {
      id: 501,
      title: "Gun Laws",
      aspects: ["Mental Health", "Video Games", "Responsibility", "Background Checks"]
      // Effects of mental health. Percent of mass shooters who had mental health issues, percent who were on meds, percent who sought help, percent of americans that can even recieve help, more... . Video gmaes... no, good try walmart. Show graphs explaining why this is not the case. Responsibilty, ownership and insurance of mainting a vehicle vs guns especially with children in household. Close background Check loopholes, like the military spedning, limiting gun ownership and se in this country should be the lase thing we try A few bad eggs should not ruin it for everyone.
      // https://www.vox.com/policy-and-politics/2019/8/5/20755092/gun-shooting-video-game-chart
      // Backup of above is stored on laptop and CDN in case of anything.
    },
    {
      id: 502, 
      title: "Military",
      aspects: ["American Values Vs World", "Perspective Spending"]
      // We live a very diffrent life then most of the world and we are a minority of the world (Stress this) at the same time of protecting our people we must keep in mind we are protecting an ideology of freedom and that is slowly losing its place in the global landscape.
      // Take away from military to fund other things? Take away from rich to fund other things. We must first Gain money from every other source we can before we even think about defunding our troops and military.
    },
    {
      id: 503, 
      title: "Voting Rights"
      // Prisnor voting rights should be somthing we talk about on a federal level and when you are out of prison you should get rights back instantly
    },
    {
      id: 504, 
      title: "Abortions",
      aspects: ["Freedom", "Sentience", "Ambiguity of Law"]
      // Freedom for an american to do whatever they want
      // Sentience and destiny vs broken households and destroyed foster care/early life programs in america... better off dead, also what is (if any) period when baby can achieve sentience in any capacity
      // Can we really trust the goverment to make laws about special cases? No, countless examples. Then we get into if it was technically rape or not or if they are just saying that. It is more humane and easier to leave those questions out of the equation
    },
    {
      id: 505, 
      title: "Imigration"
      // http://teacher.scholastic.com/activities/immigration/immigration_data/index.htm
      // We need more people, we are being challenged by big coporations who do not care about our values, th more people to share in the American dream the stronger we become. We must teach them and encourage them and show them what it means to be an Amerian.

    },
    {
      id: 506, 
      title: "Border Camps"
      // Education/ Transition Centers. Employee teacher, jobs, turn evil into good
    },
    {
      id: 507, 
      title: "Flint Michigan"
      // Bills for funding public disaster quicker, relief plans by the goverment
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
      linkGithub: 'https://github.com/joegiusto',
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
    nameFirst: "Secret First Name",
    nameMiddle: "Secret Middle Name",
    nameLast: "Secret Last Name",
    location: {
      city: "Hidden Valley",
      state: 'Atlantis'
    },
    bio: 'Top Secret Bio',

    // Warning, A Redacted Employees Role is never a secret and will be displayed. This warning will be more useful in the employee crreation page.
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
    name: 'Joey G.',
    note: 'Pre Order',
    total: 30.00
  },
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
    id: 3,
    date: moment("2019-07-31T12:00").format('LLL'),
    name: 'Elvis H.',
    note: 'Pre Order',
    total: 30.00
  },
  {
    id: 3,
    date: moment("2019-09-04T12:00").format('LLL'),
    name: 'Miles.',
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
    date: 'June 26th 2019',
    name: 'Domain Purchase',
    file: 'https://cdn.articles.media/documents/namecheap-order-46041111.pdf',
    note: '',
    department: 'All',
    total: 10.60
  },
  {
    id: 2,
    date: 'August 9, 2019',
    name: 'Mail Account',
    file: 'https://cdn.articles.media/documents/65123027.pdf',
    note: 'Mailing account is one of two users on an admin account. Only paying for one of the users which is half the total and rounding down on the dollar to ensure money split is fair',
    department: 'All',
    total: 12.97
  }
];