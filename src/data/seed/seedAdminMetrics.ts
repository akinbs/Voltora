import type {
  DashboardMetric,
  RevenueChartPoint,
  ChartDataPoint,
  StockHealthPoint,
  TopProductMetric,
  CategoryDistributionPoint,
} from '../../types/admin'

export const seedDashboardMetrics: DashboardMetric = {
  id:                 'overview',
  totalRevenue:       4892.50,
  totalOrders:        68,
  totalProducts:      16,
  totalCustomers:     42,
  lowStockProducts:   1,
  outOfStockProducts: 1,
  pendingOrders:      3,
  conversionRate:     3.4,
  averageOrderValue:  71.95,
  currency:           'USD',
  updatedAt:          new Date('2026-05-18'),
}

export const seedRevenueChartData: RevenueChartPoint[] = [
  { month: 'Dec 2024', revenue: 210.50,  orders: 4  },
  { month: 'Jan 2025', revenue: 380.20,  orders: 7  },
  { month: 'Feb 2025', revenue: 520.80,  orders: 9  },
  { month: 'Mar 2025', revenue: 475.60,  orders: 8  },
  { month: 'Apr 2025', revenue: 690.30,  orders: 11 },
  { month: 'May 2025', revenue: 850.00,  orders: 14 },
  { month: 'Jun 2025', revenue: 320.40,  orders: 6  },
  { month: 'Jul 2025', revenue: 410.70,  orders: 7  },
  { month: 'Aug 2025', revenue: 560.90,  orders: 9  },
  { month: 'Sep 2025', revenue: 480.20,  orders: 8  },
  { month: 'Oct 2025', revenue: 620.50,  orders: 10 },
  { month: 'Nov 2025', revenue: 740.80,  orders: 12 },
  { month: 'Dec 2025', revenue: 890.40,  orders: 14 },
  { month: 'Jan 2026', revenue: 530.60,  orders: 9  },
  { month: 'Feb 2026', revenue: 670.90,  orders: 11 },
  { month: 'Mar 2026', revenue: 810.20,  orders: 13 },
  { month: 'Apr 2026', revenue: 950.80,  orders: 15 },
  { month: 'May 2026', revenue: 417.40,  orders: 7  },
]

export const seedOrdersChartData: ChartDataPoint[] = [
  { label: 'Pending',    value: 3  },
  { label: 'Processing', value: 8  },
  { label: 'Shipped',    value: 12 },
  { label: 'Delivered',  value: 40 },
  { label: 'Cancelled',  value: 4  },
  { label: 'Refunded',   value: 1  },
]

export const seedStockHealthData: StockHealthPoint[] = [
  { status: 'in-stock',    count: 14 },
  { status: 'low-stock',   count: 1  },
  { status: 'out-of-stock', count: 1 },
]

export const seedTopProductsData: TopProductMetric[] = [
  { productId: 'breadboard-830',  name: '830 Point Breadboard',     salesCount: 950, revenue: 3040.00 },
  { productId: 'arduino-uno',     name: 'Arduino Uno R3 Compatible', salesCount: 780, revenue: 7722.00 },
  { productId: 'esp32-dev',       name: 'ESP32 Dev Board',           salesCount: 342, revenue: 5094.80 },
  { productId: 'jumper-kit',      name: 'Jumper Wire Kit 120pcs',    salesCount: 610, revenue: 2745.00 },
  { productId: 'hcsr04',          name: 'HC-SR04 Ultrasonic',        salesCount: 540, revenue: 1350.00 },
]

export const seedCategoryDistributionData: CategoryDistributionPoint[] = [
  { categoryId: 'dev-boards',    categoryName: 'Development Boards', count: 4, revenue: 6812.50 },
  { categoryId: 'sensors',       categoryName: 'Sensors',            count: 3, revenue: 3180.00 },
  { categoryId: 'robotics',      categoryName: 'Robotics',           count: 3, revenue: 2890.50 },
  { categoryId: 'components',    categoryName: 'Components',         count: 4, revenue: 4210.00 },
  { categoryId: 'cables',        categoryName: 'Cables',             count: 1, revenue: 2745.00 },
  { categoryId: 'tools',         categoryName: 'Tools',              count: 1, revenue: 1305.30 },
  { categoryId: 'power-modules', categoryName: 'Power Modules',      count: 1, revenue: 693.00  },
  { categoryId: 'kits',          categoryName: 'Kits',               count: 0, revenue: 0       },
]
