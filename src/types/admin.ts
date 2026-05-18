import type { FirestoreCurrency } from './firestore'

export interface DashboardMetric {
  id:                  string
  totalRevenue:        number
  totalOrders:         number
  totalProducts:       number
  totalCustomers:      number
  lowStockProducts:    number
  outOfStockProducts:  number
  pendingOrders:       number
  conversionRate:      number
  averageOrderValue:   number
  currency:            FirestoreCurrency
  updatedAt:           unknown
}

export interface ChartDataPoint {
  label: string
  value: number
  date?: string
}

export interface RevenueChartPoint {
  month:   string
  revenue: number
  orders:  number
}

export interface StockHealthPoint {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  count:  number
}

export interface TopProductMetric {
  productId:  string
  name:       string
  salesCount: number
  revenue:    number
}

export interface CategoryDistributionPoint {
  categoryId:   string
  categoryName: string
  count:        number
  revenue:      number
}

export interface AdminDashboardData {
  metrics:              DashboardMetric
  revenueChart:         RevenueChartPoint[]
  ordersChart:          ChartDataPoint[]
  stockHealth:          StockHealthPoint[]
  topProducts:          TopProductMetric[]
  categoryDistribution: CategoryDistributionPoint[]
}
