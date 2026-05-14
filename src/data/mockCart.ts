import type { CartItem } from '../types/cart'
import { mockProducts } from './mockProducts'

const find = (id: string) => mockProducts.find(p => p.id === id)!

export const mockCartItems: CartItem[] = [
  { product: find('esp32-dev'),  quantity: 2 },
  { product: find('dht22'),      quantity: 1 },
  { product: find('jumper-kit'), quantity: 1 },
]
