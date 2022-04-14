import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Menu'
  }, 
  {
    name: 'Members',
    url: '/allusers',
    icon: 'cil-user',
  },
  {
    name: 'Associations',
    url: '/allusers',
    icon: 'cil-building'
  },
  {
    name: 'Subscribers',
    url: '/allusers',
    icon: 'icon-people'
  },
  {
    name: 'Events',
    url: '/allusers',
    icon: 'cil-highlighter',
    children: [
      {
        name: 'Tasks',
        url: '/allusers',
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
    url: '/allusers',
    icon: 'cil-description'
  },
  {
    name: 'Cash flow',
    url: '/allusers',
    icon: 'cil-money'
  },
  {
    name: 'Contact',
    url: '/allusers',
    icon: 'cil-contact'
  }
];
