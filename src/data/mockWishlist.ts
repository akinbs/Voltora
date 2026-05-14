import type { Product } from '../types/product'
import { mockProducts } from './mockProducts'

const find = (id: string) => mockProducts.find(p => p.id === id)!

export const mockWishlistProducts: Product[] = [
  find('arduino-uno'),
  find('l298n'),
  find('mpu6050'),
  find('breadboard-830'),
]
