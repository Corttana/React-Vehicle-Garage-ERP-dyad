import {
  Tags,
  ShoppingCart,
  Factory,
  Calculator,
  Headset,
  Users,
  Contact,
  LayoutDashboard,
  Wrench,
  Truck,
  FileSearch,
  Car,
  LucideIcon
} from 'lucide-react';

export interface NavItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
  active?: boolean;
}

export interface Module {
  name: string;
  icon: LucideIcon;
  module: string;
  active?: boolean;
}

export const mainModules: Module[] = [
  { name: 'Sales', icon: Tags, module: 'sales' },
  { name: 'Purchase', icon: ShoppingCart, module: 'purchase' },
  { name: 'Manufacturing', icon: Factory, module: 'manufacturing' },
  { name: 'Accounting', icon: Calculator, module: 'accounting' },
  { name: 'Service', icon: Headset, module: 'service', active: true },
  { name: 'HR', icon: Users, module: 'hr' },
  { name: 'CRM', icon: Contact, module: 'crm' }
];

export const subMenus: Record<string, NavItem[]> = {
  sales: [
    { name: 'Sales Dashboard', icon: LayoutDashboard, children: [{ name: 'Overview', href: '#' }] }
  ],
  purchase: [
    { name: 'Procurement', icon: Truck, children: [{ name: 'Purchase Orders', href: '#' }] }
  ],
  service: [
    {
      name: 'Service Operations',
      icon: Headset,
      children: [
        { name: 'Dashboard', href: '#' },
        { name: 'Service Reception', href: '/service-reception', active: true },
        {
          name: 'Vehicle Management',
          href: '#',
          children: [
            { name: 'Search Vehicle', href: '#' },
            { name: 'Add New Vehicle', href: '#' }
          ]
        }
      ]
    },
    {
      name: 'Utilities',
      icon: Wrench,
      children: [
        { name: 'Reports', href: '#' },
        { name: 'Settings', href: '#' }
      ]
    }
  ]
};