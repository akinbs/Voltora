import type { Review } from '../../types/review'

export const seedReviews: Review[] = [
  {
    id: 'rev-001', productId: 'esp32-dev', userId: 'usr-demo-customer', userName: 'Demo Customer',
    rating: 5, title: 'Excellent WiFi + BLE combo board',
    comment: 'Worked perfectly out of the box with the Arduino IDE. WiFi and Bluetooth both stable, USB-C is a nice touch. The documentation is good too. Highly recommend for any IoT project.',
    isApproved: true, createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-03-01'),
  },
  {
    id: 'rev-002', productId: 'esp32-dev', userId: 'usr-seed-u2', userName: 'Maker Ahmet',
    rating: 4, title: 'Great board, slightly warm under load',
    comment: 'Very capable board. Runs warm when WiFi and BLE are both active, but nothing alarming. Deep sleep current is impressively low. Perfect for my sensor network.',
    isApproved: true, createdAt: new Date('2025-02-14'), updatedAt: new Date('2025-02-14'),
  },
  {
    id: 'rev-003', productId: 'arduino-uno', userId: 'usr-seed-u3', userName: 'Beginner Hasan',
    rating: 5, title: 'Perfect for learning electronics',
    comment: 'My first development board. Arduino IDE was easy to install and the community support is massive. Completed 5 beginner projects in my first week. Great starting point.',
    isApproved: true, createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'rev-004', productId: 'dht22', userId: 'usr-demo-customer', userName: 'Demo Customer',
    rating: 5, title: 'Accurate readings, very stable',
    comment: 'Running continuously for 3 months without any issues. Temperature readings match my reference thermometer within ±0.3°C. The PCB version with the pull-up resistor is worth getting.',
    isApproved: true, createdAt: new Date('2026-01-10'), updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'rev-005', productId: 'breadboard-830', userId: 'usr-seed-u4', userName: 'Lab Zeynep',
    rating: 5, title: 'Best breadboard at this price',
    comment: 'Solid connections, no loose contacts. The self-adhesive backing holds well on my desk. Bought 3 of these. Highly recommend for anyone doing regular prototyping.',
    isApproved: true, createdAt: new Date('2025-11-30'), updatedAt: new Date('2025-11-30'),
  },
  {
    id: 'rev-006', productId: 'l298n', userId: 'usr-seed-u5', userName: 'RoboBuilder Can',
    rating: 4, title: 'Works well, gets warm with 2A',
    comment: 'Drove two 12V DC motors for my robot chassis without issues. The heat sink helps but it gets warm under heavy load. The onboard 5V regulator saved me an extra component. Good value.',
    isApproved: true, createdAt: new Date('2025-10-18'), updatedAt: new Date('2025-10-18'),
  },
  {
    id: 'rev-007', productId: 'rpi-pico-w', userId: 'usr-seed-u3', userName: 'Beginner Hasan',
    rating: 5, title: 'MicroPython + WiFi in one tiny board',
    comment: 'The Pico W is incredible value. MicroPython makes it accessible for beginners yet it is powerful enough for serious projects. WiFi setup was straightforward with the urequests library.',
    isApproved: true, createdAt: new Date('2025-03-20'), updatedAt: new Date('2025-03-20'),
  },
  {
    id: 'rev-008', productId: 'mpu6050', userId: 'usr-demo-customer', userName: 'Demo Customer',
    rating: 4, title: 'Solid IMU for drone projects',
    comment: 'Used this for a quadcopter stabilization project. The DMP feature removes a lot of the fusion code burden. I2C communication is solid. Slight drift over time but calibration fixes it.',
    isApproved: true, createdAt: new Date('2026-02-05'), updatedAt: new Date('2026-02-05'),
  },
]
