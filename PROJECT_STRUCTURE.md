# Bibal Foods Management System - Desktop Version

## Project Overview
Bibal Foods Management System is a comprehensive production and order management application designed for food manufacturing businesses. The desktop version offers all the features of the web version but runs natively on Windows.

## Core Features

### 1. Multi-User Authentication System
- Three distinct access levels:
  - Production
  - Administration
  - Agents
- Secure password-based authentication
- Role-specific permissions and views

### 2. Production Management
- Real-time production calculation
- Ingredient tracking
- Batch management
- Production history
- Statistical analysis

### 3. Order Management
- Order creation and tracking
- Status updates
- Delivery note generation
- Customer management
- Agent-specific order handling

### 4. Inventory Control
- Stock level tracking
- Movement history
- Automatic stock updates
- Low stock alerts

### 5. Agent Management
- Agent portfolio management
- Customer assignment
- Order tracking
- Commission calculation

### 6. Communication System
- Internal chat
- Real-time notifications
- Status updates
- Order alerts

## Technical Stack

### Core Technologies
- Electron.js (Desktop runtime)
- React (UI framework)
- TypeScript (Programming language)
- SQLite (Local database)
- TailwindCSS (Styling)

### Key Libraries
- Framer Motion (Animations)
- Lucide React (Icons)
- React Router (Navigation)
- jsPDF (PDF generation)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Agents Table
```sql
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Customers Table
```sql
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  agent_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  status TEXT NOT NULL,
  total_pallets INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  boxes INTEGER NOT NULL,
  completed INTEGER DEFAULT 0,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### Production Table
```sql
CREATE TABLE production (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  note TEXT,
  total_boxes INTEGER NOT NULL,
  total_batches INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Complaints Table
```sql
CREATE TABLE complaints (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

## Installation Instructions

1. Prerequisites:
   ```bash
   # Install Node.js LTS version
   # Install Git
   ```

2. Clone and Setup:
   ```bash
   # Create new project
   npx create-electron-vite bibal-foods-desktop
   cd bibal-foods-desktop
   
   # Install dependencies
   npm install
   
   # Install additional required packages
   npm install @prisma/client sqlite3 bcryptjs jsonwebtoken
   npm install -D prisma electron-builder
   ```

3. Development:
   ```bash
   # Start development server
   npm run dev
   ```

4. Build:
   ```bash
   # Create production build
   npm run build
   ```

## Project Structure

```
src/
├── main/              # Electron main process
├── preload/           # Electron preload scripts
├── renderer/          # React application
│   ├── components/    # UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Application pages
│   ├── services/      # Business logic
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── shared/            # Shared types and utilities
└── database/          # Database setup and migrations
```

## Security Considerations

1. Data Storage:
   - All data is stored locally in SQLite
   - Passwords are hashed using bcrypt
   - Sensitive data is encrypted

2. Application Security:
   - Input validation
   - SQL injection prevention
   - XSS protection
   - Process isolation

3. Updates:
   - Auto-update mechanism
   - Version control
   - Update notifications

## Deployment

1. Configure electron-builder:
   ```json
   {
     "build": {
       "appId": "com.bibalfoods.desktop",
       "productName": "Bibal Foods Manager",
       "win": {
         "target": ["nsis"],
         "icon": "build/icon.ico"
       },
       "nsis": {
         "oneClick": false,
         "allowToChangeInstallationDirectory": true,
         "createDesktopShortcut": true,
         "createStartMenuShortcut": true
       }
     }
   }
   ```

2. Build installer:
   ```bash
   npm run build
   npm run dist
   ```

## Maintenance

1. Regular Tasks:
   - Database optimization
   - Cache clearing
   - Log rotation
   - Backup creation

2. Updates:
   - Security patches
   - Feature updates
   - Bug fixes
   - Performance improvements