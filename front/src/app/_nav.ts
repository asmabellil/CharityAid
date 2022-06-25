import { INavData } from '@coreui/angular';

export const navItems = {
  "superadmin" :
  [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Users',
    url: '/main/allusers',
    icon: 'cil-user',
  },
  {
    name: 'Associations',
    url: 'main/allassociations',
    icon: 'cil-building'
  },
  {
    name: 'Statistics',
    url: 'main/allassociations',
    icon: 'cil-chart'
  },
  {
    name: 'Requests',
    url: 'main/requests',
    icon: 'cil-user'
  },
  ],
  "Chair" :
  [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Users',
    url: '/main/allusers',
    icon: 'cil-user',
  },
  {
    name: 'Subscribers',
    url: '/members/allsubscribers',
    icon: 'icon-people'
  },
  {
    name: 'Events',
    url: '/members/allevents',
    icon: 'cil-highlighter'
  },
  {
    name: 'Tasks',
    url: '/members/calander',
    icon: 'cil-list-rich',
    /* badge: {
      variant: 'success',
      text: 'NEW'
    } */
  },
  {
    name: 'Reports',
    url: '/members/reports',
    icon: 'cil-description'
  },
  {
    name: 'Cash flow',
    url: '/members/caisses',
    icon: 'cil-money'
  },
  {
    name: 'Contact',
    url: '/members/allcontacts',
    icon: 'cil-contact'
  },
  ],
  "Vice Chair" :
  [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Subscribers',
    url: '/members/allsubscribers',
    icon: 'icon-people'
  },
  {
    name: 'Tasks',
    url: '/members/calander',
    icon: 'cil-list-rich',
    /* badge: {
      variant: 'success',
      text: 'NEW'
    } */
  },
  {
    name: 'Reports',
    url: '/members/reports',
    icon: 'cil-description'
  },
  {
    name: 'Contact',
    url: '/members/allcontacts',
    icon: 'cil-contact'
  }],
  "Treasurer" :
  [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Subscribers',
    url: '/members/allsubscribers',
    icon: 'icon-people'
  },
  {
    name: 'Tasks',
    url: '/members/calander',
    icon: 'cil-list-rich',
    /* badge: {
      variant: 'success',
      text: 'NEW'
    } */
  },
  {
    name: 'Reports',
    url: '/members/reports',
    icon: 'cil-description'
  },
  {
    name: 'Cash flow',
    url: '/members/caisses',
    icon: 'cil-money'
  },
  {
    name: 'Contact',
    url: '/members/allcontacts',
    icon: 'cil-contact'
  }],
  "General Secretary" :
  [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Subscribers',
    url: '/members/allsubscribers',
    icon: 'icon-people'
  },
  {
    name: 'Tasks',
    url: '/members/calander',
    icon: 'cil-list-rich',
    /* badge: {
      variant: 'success',
      text: 'NEW'
    } */
  },
  {
    name: 'Reports',
    url: '/members/reports',
    icon: 'cil-description'
  },
  {
    name: 'Contact',
    url: '/members/allcontacts',
    icon: 'cil-contact'
  }]
};
