import type { MockUser } from '../types/user'

export const mockUser: MockUser = {
  id:                'usr-001',
  fullName:          'Akın Baş',
  email:             'akinbas2002@gmail.com',
  role:              'customer',
  avatarInitials:    'AB',
  createdAt:         '2024-09-01',
  phone:             '+90 555 123 4567',
  company:           'Voltora Maker Lab',
  location:          'Istanbul, Türkiye',
  preferredCurrency: 'USD',
  savedAddresses: [
    {
      id:         'addr-001',
      title:      'Home',
      fullName:   'Akın Baş',
      address:    'Bağcılar Mah. İnönü Cad. No:12 Kat:3',
      city:       'Istanbul',
      country:    'Turkey',
      postalCode: '34200',
      isDefault:  true,
    },
    {
      id:         'addr-002',
      title:      'Lab Office',
      fullName:   'Voltora Maker Lab',
      address:    'Maslak Teknopark, Blok B No:42',
      city:       'Istanbul',
      country:    'Turkey',
      postalCode: '34467',
      isDefault:  false,
    },
  ],
}
