import { Product } from './product';

export class ProductData {

  static products: Product[] = [
    {
      id: 1,
      productName: 'Vassoura de jardinagem',
      productCode: 'GDN-0011',
      description: 'Vassoura para recolher folhas',
      price: 19.95,
      categoryId: 1,
      quantityInStock: 15,
      supplierIds: [1, 2]
    },
    {
      id: 2,
      productName: 'Carrinho de jardinagem',
      productCode: 'GDN-0023',
      description: 'Capacidade para 15 litros',
      price: 32.99,
      categoryId: 1,
      quantityInStock: 2,
      supplierIds: [3, 4]
    },
    {
      id: 5,
      productName: 'Martelo',
      productCode: 'TBX-0048',
      description: 'Martelo de aço inox',
      price: 8.9,
      categoryId: 3,
      quantityInStock: 8,
      supplierIds: [5, 6]
    },
    {
      id: 8,
      productName: 'Pá',
      productCode: 'TBX-0022',
      description: 'Pá de aço inox',
      price: 11.55,
      categoryId: 3,
      quantityInStock: 6,
      supplierIds: [7, 8]
    },
    {
      id: 10,
      productName: 'Controle de Video Game',
      productCode: 'GMG-0042',
      description: 'Controle de video game para todos os jogos',
      price: 35.95,
      categoryId: 5,
      quantityInStock: 12,
      supplierIds: [9, 10]
    }
  ];
}
