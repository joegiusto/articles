const COMMUNITY = '/community';
export default {

    // Landing
    LANDING: '/',

    // Access
    SIGN_UP: '/signup',
    SIGN_IN: '/login',
    VERIFY_EMAIL: '/verify-email',
    PASSWORD_FORGET: '/password-reset',

    // Account Creation
    OUTSET: '/outset',

    // Settings
    SETTINGS_ACCOUNT: '/settings/account',
    SETTINGS_MEMBERSHIP: '/settings/membership',
    SETTINGS_NEWSLETTER: '/settings/newsletter',
    SETTINGS_CONNECTIONS: '/settings/connections',
    SETTINGS_BILLING: '/settings/billing',
    SETTINGS_EMPLOYEE: '/settings/employee',
    SETTINGS_PROTECTED: '/settings/protected',

    // Home
    HOME: '/home',

    HOME_OLD: '/home/old',

    MISSION: '/mission',

    // export const REPORTS = '/reports';
    // export const REPORTS_CHARTS = '/reports/charts';
    // export const REPORTS_REPORT = '/reports/report';

    // Transparency
    TRANSPARENCY: '/transparency',
    TRANSPARENCY_REPORTS: '/transparency/reports',
    TRANSPARENCY_CHARTS: '/transparency/charts',
    TRANSPARENCY_FLAG: '/transparency/flag',
    TRANSPARENCY_EMPLOYEES: '/transparency/employees',
    TRANSPARENCY_EMPLOYEES_DETAILS: '/transparency/employees/:id',

    // Employees
    EMPLOYEES: '/reports/employees',
    EMPLOYEES_DETAILS: '/reports/employees/:id',

    // Advertising
    ADVERTISING: '/advertising',
    ADVERTISING_ACCESS:'/advertising/access',
    ADVERTISING_MANAGE:'/advertising/manage',

    // Store
    STORE: '/store',
    STORE_VIEW: '/store/view/:id',

    STORE_PRODUCTS: '/store/products',
    STORE_COLLECTIONS: '/store/collections',

    STORE_ORDERS: '/store/orders',
    STORE_ORDERS_DETAILS: '/store/orders/:id',

    STORE_SAVED: '/store/saved',

    CHECKOUT: '/store/checkout',

    STORE_SUBMISSIONS: '/store/submissions',
    STORE_SUBMISSIONS_SUBMIT: '/store/submissions/submit/',

    STORE_MANAGE: '/store/manage',
    STORE_MANAGE_DETAILS: '/store/manage/:id',

    // News
    NEWS: '/news',
    NEWS_SEARCH: '/news/search',
    NEWS_TAG: '/news/tag',
    NEWS_TAG_DETAILS: '/news/tag/:id',

    // News Extras
    NEWS_LOCAL: '/news/local',
    RESOURCES: '/news/resources',
    NEWS_STOCKS: '/news/stocks',
    NEWS_CRYPTO: '/news/crypto',

    // News Extended, Trying to get rid of this and maybe everything can be a resource?
    EXTENDED: '/news/extended',
    EXTEND: '/news/extended/:id',

    // News Stories
    STORIES: '/news/stories',
    STORY: '/news/stories/:id',

    // News Issues
    ISSUES: '/news/issues',
    ISSUE: '/news/issues/:id',

    // News Myths
    MYTHS: '/news/myths',
    MYTH: '/news/myths/:id',

    // News Resources
    RESOURCES_PRESIDENTS: '/news/resources/presidents',
    RESOURCES_PRESIDENT: '/news/resources/presidents/:id',
    RESOURCES_CORONAVIRUS: '/news/resources/coronavirus',

    RESOURCES_POLITICIANS: '/news/resources/politicians',
    RESOURCES_POLITICIANS_HOUSE: '/news/resources/politicians/house',
    RESOURCES_POLITICIANS_SENATE: '/news/resources/politicians/senate',

    // Party
    PARTY: '/party',
    POLICY: '/party/policy',
    TOWN_HALL: '/party/town-hall',
    PROPOSALS: '/party/proposals',
    PROPOSAL: '/party/proposals/:id',

    // Mesh
    MESH: '/mesh',

    // Support
    COMMUNITY: `${COMMUNITY}`,

    // export const SUPPORT ='/support'
    // export const BLOG ='/support/blog'

    FAQ: `${COMMUNITY}/faqs`,
    PRIVACY: `${COMMUNITY}/privacy`,

    UPDATES: `${COMMUNITY}/updates`,
    UPDATE: `${COMMUNITY}/updates/:id`,

    JOBS: `${COMMUNITY}/jobs`,
    PRESS: `${COMMUNITY}/press`,
    TRANSLATIONS: `${COMMUNITY}/translations`,
    ROADMAP: `${COMMUNITY}/roadmap`,
    FORUM: `${COMMUNITY}/forum`,
    BETA: `${COMMUNITY}/beta`,
    FORUM_THREAD: `${COMMUNITY}/forum/:id`,
    OPEN_SOURCE: `${COMMUNITY}/open-source`,

    // Account
    ACCOUNT: '/account',

    // Admin
    ADMIN: '/admin',

    ADMIN_USERS: '/admin/users',
    ADMIN_USER_DETAILS: '/admin/users/:id',

    ADMIN_NEWS: '/admin/news',
    ADMIN_NEWS_DETAILS: '/admin/news/:id',

    ADMIN_PROPOSALS: '/admin/proposals',

    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_PRODUCT_DETAILS: '/admin/products/:id',

    ADMIN_SUBMISSIONS: '/admin/submissions',
    ADMIN_SUBMISSION_DETAILS: '/admin/submissions/:id',

    ADMIN_DONATIONS: '/admin/donations',
    ADMIN_EXPENSES: '/admin/expenses',
    ADMIN_SOCKET: '/admin/socket',
    ADMIN_AWS: '/admin/aws',
    ADMIN_COMMENTS: '/admin/comments',
    ADMIN_REPORTS: '/admin/reports',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_ADS: '/admin/ads',
    ADMIN_MESSAGES: '/admin/messages',
    ADMIN_PROJECTS: '/admin/projects',
    ADMIN_NEWSLETTER: '/admin/newsletter',

    ADMIN_PRESIDENTS: '/admin/presidents',
    ADMIN_PRESIDENTS_DETAILS: '/admin/presidents/:id',

    // Donate
    DONATE: '/donate',
    DONATE_DETAILS: '/donate/:id',

    SUBSCRIBE: '/subscribe',

    // Messages
    MESSAGES: '/messages',

    // Playground
    PLAYGROUND: '/playground',
    CHAT: '/chat',

}