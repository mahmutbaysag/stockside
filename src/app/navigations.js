export const navigations = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Company', type: 'label', auth: ["1", "2"] },
  {
    name: 'Company',
    icon: 'business',
    auth: ["1", "2"],
    children: [
      { name: 'Detail', path: '/company/detail', iconText: 'detail', auth: ["1", "2"] },
      { name: 'Product', path: '/company/product', iconText: 'product', auth: ["1"] },
    ],
  },
  { label: 'Worker', type: 'label', auth: ["1"] },
  {
    name: 'Worker',
    icon: 'people',
    auth: ["1"],
    children: [
      { name: 'List', iconText: 'people', path: '/worker/list', auth: ["1"] },
      { name: 'Add', iconText: 'people', path: '/worker/add', auth: ["1"] },
    ],
  },
  { label: 'Admin', type: 'label', auth: ["0"] },
  { name: 'Message', path: '/message', icon: 'message', auth: ["0"] },
  { name: 'Settings', path: '/settings', icon: 'settings', auth: ["0"] },
];
