# CrowdFreeCommute

A smart commuting solution that helps users find and navigate less crowded routes, providing real-time transit information and crowd analytics to make your daily commute more comfortable and efficient.

🚀 **Live Application**: https://crowdfree-commute.vercel.app/

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Real-time Crowd Analytics**: View live crowd density information on various transit routes
- **Route Optimization**: Discover less crowded alternative routes for your commute
- **Interactive Map Interface**: User-friendly map visualization of routes and crowd levels
- **Time-based Insights**: Peak hour analysis and predictions for better planning
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Comfortable viewing with built-in dark theme option

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality reusable component library
- **React Router** - Client-side routing
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation
- **Recharts** - Data visualization library
- **TanStack React Query** - Data fetching and caching
- **Lucide React** - Icon library

### Styling & UI
- **Radix UI** - Unstyled, accessible component primitives
- **Class Variance Authority** - CSS class composition
- **Next Themes** - Theme management

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/harika300805/CrowdFreeCommute.git
   cd CrowdFreeCommute
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your configuration:
   ```env
   VITE_API_BASE_URL=your_api_url
   VITE_MAP_API_KEY=your_map_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173` to see the application running.

---

## 🚀 Getting Started

### First Time Setup

1. After installation, the application will load with default routes and crowd data
2. Grant location permission when prompted for better route recommendations
3. Select your starting point and destination on the interactive map
4. View alternative routes with real-time crowd density information

### Basic Workflow

1. **Enter your commute details** - Start location and destination
2. **View route options** - Multiple routes with crowd levels displayed
3. **Check peak hours** - See when routes are typically crowded
4. **Select your route** - Choose the least crowded option
5. **Follow navigation** - Real-time turn-by-turn directions with crowd alerts

---

## 📖 Usage

### Finding Less Crowded Routes

1. Open the application and allow location access
2. Enter your destination in the search bar
3. The app displays available routes color-coded by crowd levels:
   - 🟢 **Green** - Low crowd density (recommended)
   - 🟡 **Yellow** - Moderate crowd density
   - 🔴 **Red** - High crowd density (avoid if possible)

### Viewing Crowd Analytics

- **Timeline View** - See crowd patterns throughout the day
- **Peak Hour Analysis** - Identify when specific routes are busiest
- **Historical Data** - Analyze trends to predict future congestion
- **Crowd Alerts** - Receive notifications when crowds exceed threshold

### Dark Mode

Toggle between light and dark themes using the theme switcher in the top-right corner of the application for comfortable viewing in any lighting condition.

---

## 📁 Project Structure

```
CrowdFreeCommute/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── Map/            # Map-related components
│   │   ├── RouteCard/      # Route display components
│   │   └── Analytics/      # Analytics components
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── RouteDetails.tsx
│   │   └── Analytics.tsx
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services and utilities
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Global styles and Tailwind config
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository** on GitHub
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear, descriptive commits
4. **Test your changes** thoroughly
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** with a detailed description of your changes

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation for any new features
- Ensure TypeScript types are properly defined
- Test across different devices and screen sizes

### Bug Reports

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected and actual behavior
- Your environment details

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Check existing issues and discussions
- Visit the live application at https://crowdfree-commute.vercel.app/

---

## 🙏 Acknowledgments

- Thanks to all contributors and users
- Built with React, Tailwind CSS, and modern web technologies
- Special thanks to the open-source community

---

**Last Updated**: July 2026
**Version**: 1.0.0
