import { Customer } from './customer';

export class CustomerData {
  static customers: Customer[] = [
    {
        id: 1,
        firstName: 'Deborah',
        lastName: 'Kurata',
        email: 'debora@email.com',
        sendCatalog: false,
        addressType: 'Office',
        street1: '101 Mellon St',
        street2: '',
        city: 'Arkansas',
        state:'AK',
    }
  ];
}
