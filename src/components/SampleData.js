import moment from 'moment';

export const employeeList = [
  {
    id: '1',
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
      hasInstagram: true,
      hasFacebook: true,
      hasGithub: true
    }

  },
  {
    id: '2',
    redact: false,
    nameFirst: "John",
    nameMiddle: "",
    nameLast: "Doe",
    location: {
      city: 'Wappingers',
      state: 'NY'
    },
    bio: "I don't exist but if I did this is where I would say something!",

    role: "Example Employee",
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
      hasFacebook: true,
      hasGithub: false
    }

  },
  {
    id: '3',
    redact: true,
    nameFirst: "First Name",
    nameMiddle: "Name",
    nameLast: "A - This is an anonymous profile but becaue we are searching the {employeeList.findIndex(x => x.nameLast.charAt(0) === match.params.id} we are pulling the first char at nameLast with no regard to the employee object key redact:true so this needs to be fixed",
    location: {
      city: "Shouldn't",
      state: 'Matter'
    },
    bio: 'This is an example of an employee who chooses to stay anonymous. Records are still tracked that way other employees and the public can use this data how they want and ask questions but we respect the right for an employee to keep this information private.',

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
  {
    id: '4',
    redact: false,
    nameFirst: "Stacey",
    nameMiddle: "",
    nameLast: "Doe",
    location: {
      city: 'Example',
      state: 'NY'
    },
    bio: "Testing the directory to see if it works for multiple people whose last name start with same letter",

    role: "Example",
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
];

export const sales = [
  {
    id: 117,
    date: moment().subtract(1, 'days').format('LLL'),
    name: 'Steven',
    note: 'Wolf Sweatshirt',
    total: 34.50
  },
  {
    id: 42,
    date: moment().subtract(2, 'days').subtract(1, 'hours').subtract(16, 'minutes').format('LLL'),
    name: 'Igor',
    note: 'Sheep Sweatshirt, ...',
    total: 50.00
  },
  {
    id: 7,
    date: moment().subtract(3, 'days').subtract(2, 'hours').subtract(48, 'minutes').format('LLL'),
    name: 'Larry',
    note: 'Wolf Sweatshirt',
    total: 34.50
  }
];

export const donations = [
  {
    id: 1,
    date: moment().subtract(4, 'days').subtract(7, 'hours').subtract(22, 'minutes').format('LLL'),
    name: 'Isaac',
    message: '...',
    amount: 10.00
  },
  {
    id: 2,
    date: moment().subtract(5, 'days').subtract(8, 'hours').subtract(16, 'minutes').format('LLL'),
    name: 'Jennifer',
    message: '...',
    amount: 2.50
  },
  {
    id: 3,
    date: moment().subtract(5, 'days').subtract(32, 'hours').subtract(6, 'minutes').format('LLL'),
    name: 'Dean',
    message: '...',
    amount: 5.00
  },
  {
    id: 4,
    date: moment().subtract(7, 'days').subtract(3, 'hours').subtract(24, 'minutes').format('LLL'),
    name: 'Tyler',
    message: '...',
    amount: 10.00
  },
  {
    id: 5,
    date: moment().subtract(8, 'days').subtract(1, 'hours').subtract(31, 'minutes').format('LLL'),
    name: 'Shelly',
    message: '...',
    amount: 1.00
  }
];

export const expenses = [
  {
    id: 1,
    date: moment().startOf('month').format('LL'),
    name: 'Website Hosting',
    department: 'All',
    total: 0.00
  },
];