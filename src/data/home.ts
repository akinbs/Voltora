import {
  Cpu, Radio, Zap, Package, Package2, Wrench, Cable, Bot,
  ShieldCheck, Truck, MessageCircle, CheckCircle2,
} from 'lucide-react'
import type { CategoryItem, HomeStat, FeaturedKit, WhyChooseUsItem } from '../types/home'

export const homeCategories: CategoryItem[] = [
  { id: 'dev-boards', label: 'Dev Boards',  description: 'MCUs & single-board computers', icon: Cpu,      productCount: 124, slug: 'dev-boards', href: '/products?cat=dev-boards' },
  { id: 'sensors',    label: 'Sensors',      description: 'Environmental & motion sensing',icon: Radio,    productCount: 87,  slug: 'sensors',   href: '/products?cat=sensors'   },
  { id: 'robotics',   label: 'Robotics',     description: 'Motors, servos & drivers',     icon: Bot,      productCount: 63,  slug: 'robotics',  href: '/products?cat=robotics'  },
  { id: 'power',      label: 'Power',        description: 'Regulators, chargers & UPS',   icon: Zap,      productCount: 45,  slug: 'power',     href: '/products?cat=power'     },
  { id: 'components', label: 'Components',   description: 'ICs, resistors & capacitors',  icon: Package2, productCount: 412, slug: 'components',href: '/products?cat=components'},
  { id: 'cables',     label: 'Cables',       description: 'Jumpers, USB & JST wiring',    icon: Cable,    productCount: 78,  slug: 'cables',    href: '/products?cat=cables'    },
  { id: 'tools',      label: 'Tools',        description: 'Soldering & measurement gear', icon: Wrench,   productCount: 34,  slug: 'tools',     href: '/products?cat=tools'     },
  { id: 'kits',       label: 'Starter Kits', description: 'Curated project bundles',      icon: Package,  productCount: 22,  slug: 'kits',      href: '/products?cat=kits'      },
]

export const homeStats: HomeStat[] = [
  { value: '1,200+', label: 'Components',    icon: Cpu,          description: 'Curated and tested parts',     numericValue: 1200, suffix: '+'  },
  { value: '48h',    label: 'Fast Dispatch', icon: Truck,        description: 'Average order fulfillment',    numericValue: 48,   suffix: 'h'  },
  { value: '98%',    label: 'Stock Accuracy',icon: CheckCircle2, description: 'Real-time inventory tracking', numericValue: 98,   suffix: '%'  },
  { value: '24/7',   label: 'Project Ready', icon: Zap,          description: 'Core parts always in stock',   numericValue: 24,   suffix: '/7' },
]

export const featuredKits: FeaturedKit[] = [
  {
    id: 'arduino-starter',
    name: 'Arduino Starter Lab',
    description: 'Everything you need to start building with Arduino. Sensors, components, wires and a detailed guide included.',
    itemCount: 47,
    startingPrice: 34.90,
    badge: 'Best Seller',
    highlights: ['Arduino Uno R3', '830pt Breadboard', 'Sensor Pack ×4', '40pcs Jumper Set'],
    slug: 'arduino-starter-lab',
  },
  {
    id: 'iot-bundle',
    name: 'IoT Sensor Bundle',
    description: 'Temperature, humidity, air quality and proximity sensors ready for ESP32 or Arduino IoT projects.',
    itemCount: 12,
    startingPrice: 28.50,
    badge: 'Popular',
    highlights: ['DHT22 Sensor', 'BMP280 Barometer', 'MQ135 Air Quality', 'HC-SR04 Distance'],
    slug: 'iot-sensor-bundle',
  },
  {
    id: 'robotics-kit',
    name: 'Robotics Motion Kit',
    description: 'DC motors, servo controllers and H-bridges to power your next robot or automation project.',
    itemCount: 18,
    startingPrice: 42.00,
    badge: 'New',
    highlights: ['L298N Driver ×2', '4× DC Motors', '2× Servo SG90', 'Robot Chassis'],
    slug: 'robotics-motion-kit',
  },
]

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    id: 'curated',
    title: 'Curated Components',
    description: 'Every part is sourced, tested and verified. No fakes, no clones — only components you can trust for real builds.',
    icon: CheckCircle2,
  },
  {
    id: 'dispatch',
    title: 'Fast Dispatch',
    description: 'Most orders ship within 48 hours. Express options available for projects with tight timelines.',
    icon: Truck,
  },
  {
    id: 'secure',
    title: 'Secure Shopping',
    description: 'Your data and payments are protected with industry-standard encryption across the entire platform.',
    icon: ShieldCheck,
  },
  {
    id: 'support',
    title: 'Maker Friendly Support',
    description: "Our team includes engineers who build things. Get help that goes beyond just tracking your order.",
    icon: MessageCircle,
  },
]
