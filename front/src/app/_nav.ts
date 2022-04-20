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
  ],
  "member" :
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
    url: '/main/allassociations',
    icon: 'icon-people'
  },
  {
    name: 'Events',
    url: '/main/allassociations',
    icon: 'cil-highlighter',
    children: [
      {
        name: 'Tasks',
        url: '/main/allassociations',
        icon: 'cil-list-rich',
        /* badge: {
          variant: 'success',
          text: 'NEW'
        } */
      },
    ]
  },
  {
    name: 'Reports',
    url: '/main/allassociations',
    icon: 'cil-description'
  },
  {
    name: 'Cash flow',
    url: '/main/allassociations',
    icon: 'cil-money'
  },
  {
    name: 'Contact',
    url: '/main/allassociations',
    icon: 'cil-contact'
  }]
};
