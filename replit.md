# PDF Generator

## Overview
A React + Vite application with TypeScript and Tailwind CSS, designed to run on Replit.

**Current State:** Initial setup complete with "Hello World" demonstration.

**Created:** November 25, 2025

## Recent Changes
- November 25, 2025: Initial project setup
  - Created React + Vite project with TypeScript
  - Configured Tailwind CSS for styling
  - Set up Replit-specific configuration (port 5000, host 0.0.0.0)
  - Configured deployment for static site build

## Project Architecture

### Tech Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Static site (builds to `dist/`)

### Project Structure
```
/
├── src/              # Source files
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles with Tailwind directives
├── public/           # Static assets
├── dist/             # Production build output (generated)
└── vite.config.ts    # Vite configuration (port 5000, Replit-optimized)
```

### Configuration
- **Development Server:** Runs on port 5000 with host 0.0.0.0
- **HMR:** Configured for Replit proxy (clientPort: 443)
- **Build Output:** Static files in `dist/` directory
- **Deployment:** Configured for static deployment with npm build

## Development Commands
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Replit-Specific Setup
This project is configured to work seamlessly with Replit:
- Server listens on 0.0.0.0:5000 (required for Replit preview)
- HMR configured for Replit's proxy infrastructure
- Static deployment configured to build and serve from `dist/`
