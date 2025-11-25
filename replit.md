# AutoPDF Library - Automated PDF Generation System

## Overview
A full-stack automated SaaS application that generates fresh PDF digital products daily across 20+ categories. Built with React + Vite frontend, Express.js backend, and PDFKit for PDF generation.

**Current State:** Fully functional with automated daily PDF generation, web dashboard, and category management.

**Created:** November 25, 2025

## Recent Changes
- November 25, 2025: Complete AutoPDF Library system implemented
  - Built Express.js backend with REST API (port 3000)
  - Created professional PDF generation engine with PDFKit
  - Implemented 20+ content templates for different categories
  - Added automated daily scheduler using node-cron
  - Built React dashboard with Home, Categories, All PDFs, and Logs pages
  - Configured Vite proxy for API communication
  - Implemented search and download functionality
  - Set up date-organized file storage system
  - **Enhanced PDF generation with:**
    - Professional fonts and styling (Helvetica, multi-size typography)
    - Headers and footers on every page with page numbers
    - Minimum 11 images per PDF (cover icons, charts, diagrams)
    - 8-20 pages of structured content per PDF
    - Comprehensive page structure (cover, exec summary, TOC, 6 sections, worksheets, summary, final page)
  - **Comprehensive metadata tracking:**
    - Accurate page count (from PDFKit bufferedPageRange)
    - Word count tracking (~1,500-3,200 words per PDF)
    - Image count tracking (11+ images guaranteed)
    - Section count, tags, descriptions
  - **Generation logs system:**
    - Tracks all PDF generation events
    - Displays history with timestamps
    - Shows success/failure status
    - Logs page accessible via dashboard navigation

## Features

### Automated PDF Generation
- **Daily Automation:** Generates 10+ new PDFs every day at midnight
- **Manual Generation:** On-demand generation via "Generate Now" button
- **20 Categories:** Business, Finance, Self-Help, Health, Fitness, Recipes, Study Guides, Workbooks, Templates, Planners, Personal Development, Marketing, Tech & Programming, Motivation, Journals, Mindset, Parenting, Productivity, Real Estate, Trading & Investing
- **Content Quality:** Each PDF includes 8-12 pages with structured sections, table of contents, and professional formatting

### Web Dashboard
- **Home Page:** Shows statistics (total PDFs, today's count, categories) with "Generate Now" button, displays today's PDFs with metadata
- **Categories Page:** Browse PDFs by category with filtering
- **All PDFs Page:** View all PDFs with search functionality
- **Logs Page:** View generation history with timestamps, success/failure status, and event tracking
- **Download System:** Direct PDF downloads from organized folder structure

### PDF Structure
Each generated PDF includes:
- **Cover Page:** Professional gradient background with title, type, category, description, decorative icon
- **Executive Summary:** 5 comprehensive paragraphs with chart/diagram
- **Table of Contents:** All sections listed with page numbers
- **6 Content Sections:** Rich content with headings, bullets, quotes, charts (1-2 pages each)
- **Worksheets & Activities:** Goal-setting exercises with fillable lines and charts
- **Summary Page:** Key takeaways, next steps, progress charts
- **Final Page:** Thank you page with branding and decorative icon
- **Headers & Footers:** Every page includes title header and page numbers
- **Professional Styling:** Multi-size typography, proper spacing, gradients, decorative elements
- **Images:** Minimum 11 images per PDF (icons, charts, diagrams)
- **Metadata:** Tracked page count, word count, image count, section count, tags

## Project Architecture

### Tech Stack
- **Frontend:** React 18 + TypeScript + Tailwind CSS + Vite
- **Backend:** Express.js (Node.js) + ES Modules
- **PDF Generation:** PDFKit
- **Automation:** node-cron (daily scheduler)
- **Storage:** File system (organized by date) + JSON metadata

### Project Structure
```
/
├── src/                          # React frontend
│   ├── components/
│   │   ├── HomePage.tsx          # Dashboard with stats and generation
│   │   ├── CategoriesPage.tsx    # Category browsing and filtering
│   │   ├── PDFsPage.tsx          # All PDFs with search
│   │   └── Navigation.tsx        # Main navigation
│   ├── App.tsx                   # Main app component with routing
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
├── server/                       # Express backend
│   ├── index.js                  # Main Express server + API routes
│   ├── pdf-generator.js          # Professional PDF creation engine (PDFKit)
│   ├── pdf-service.js            # PDF generation service
│   ├── content-templates.js      # 20 category templates
│   ├── scheduler.js              # Cron job scheduler
│   ├── generation-logs.js        # Generation history tracking
│   ├── utils.js                  # Utility functions + metadata
│   └── start-dev.js              # Development server launcher
├── pdfs/                         # Generated PDFs (organized by date)
│   └── YYYY-MM-DD/               # Daily folders
│       └── *.pdf                 # Generated PDF files
├── data.json                     # PDF metadata database
└── vite.config.ts                # Vite config with API proxy
```

### API Endpoints
- `GET /api/health` - Server health check
- `GET /api/stats` - Get statistics (total, today, by category)
- `GET /api/categories` - Get all categories
- `GET /api/pdfs` - Get all PDFs (supports filtering by date, category, search)
- `GET /api/pdfs/today` - Get today's PDFs with metadata
- `GET /api/pdfs/:id` - Get specific PDF details
- `POST /api/generate` - Generate new PDFs (supports single category or bulk generation)
- `GET /api/download/:date/:filename` - Download PDF file
- `GET /api/logs` - Get generation history logs (limit parameter supported)

### Configuration
- **Frontend Server:** Vite on port 5000 (0.0.0.0)
- **Backend Server:** Express on port 3000
- **Proxy:** Vite proxies `/api` and `/pdfs` to backend
- **Scheduler:** Daily cron job at midnight (00:00)
- **Storage:** PDFs organized in `/pdfs/YYYY-MM-DD/` folders
- **Metadata:** JSON database in `data.json`

## Development Commands
- `npm run dev` - Start both frontend and backend servers
- `npm run server` - Start backend server only
- `npm run client` - Start frontend only
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Content Templates
Each category has predefined templates with:
- 5 title variations per category
- 6 structured sections (Executive Summary, Market Analysis, Strategy, Implementation, Financial, Action Items)
- Category-specific content types (Workbooks, Guides, Trackers, Planners, Journals, etc.)
- Unique descriptions and metadata

## Automation
- **Daily Schedule:** Runs at midnight (00:00) every day
- **Batch Generation:** Creates 10-20 PDFs per run (at least 1 per category)
- **File Organization:** Automatically creates date folders
- **Metadata Tracking:** Updates data.json with all PDF information
- **Error Handling:** Logs errors without stopping generation

## Replit-Specific Setup
This project is configured to work seamlessly with Replit:
- Frontend on port 5000 with host 0.0.0.0 (required for Replit preview)
- Backend on port 3000 (internal, proxied through Vite)
- HMR configured for Replit's proxy infrastructure (clientPort: 443)
- Both servers start together with single `npm run dev` command
- Static files served through Express for PDF downloads
