# PIMT Website - Replit Project

## Overview

This is a static educational website for Principle Institute of Management and Technology (PIMT). The site showcases the institute's programs, courses, university partnerships, and the Apprenticeship Embedded Degree Program (AEDP). Built with modern web technologies and responsive design principles, it serves as the primary digital presence for the educational institution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Framework**: Bootstrap 5.3.0 for responsive grid system and components
- **Styling Approach**: Custom CSS with CSS variables for consistent theming
- **JavaScript Pattern**: Modular vanilla JavaScript with IIFE (Immediately Invoked Function Expression) structure
- **Font Integration**: Google Fonts (Inter and Poppins) for typography
- **Icon System**: Font Awesome 6.4.0 for scalable vector icons

### File Structure
```
/
├── index.html          # Homepage
├── about.html          # About page
├── courses.html        # Courses listing
├── aedp.html          # AEDP program details
├── universities.html   # University partnerships
├── contact.html        # Contact information
└── assets/
    ├── css/
    │   ├── style.css      # Main stylesheet
    │   └── responsive.css # Media queries
    └── js/
        └── main.js        # Interactive functionality
```

## Key Components

### Navigation System
- Fixed-top responsive navbar with Bootstrap collapse functionality
- Consistent branding with custom logo text styling
- Active state management for current page indication
- Mobile-first hamburger menu implementation

### Styling System
- **CSS Variables**: Comprehensive design token system for colors, spacing, and typography
- **Color Palette**: Primary blue (#2563eb), secondary orange (#f97316), with systematic gray scale
- **Typography**: Dual font system using Inter for body text and Poppins for headings
- **Responsive Design**: Mobile-first approach with breakpoints at 768px, 992px, and 1200px

### Interactive Features
- Smooth scrolling navigation
- Form handling with success messaging
- Scroll-based navbar behavior changes
- Animation initialization system
- Back-to-top functionality

## Data Flow

### Static Content Delivery
1. **HTML Structure**: Semantic HTML5 with proper meta tags for SEO
2. **CSS Loading**: External CDN resources loaded first, followed by custom stylesheets
3. **JavaScript Execution**: DOM-ready initialization of interactive features
4. **Progressive Enhancement**: Core content accessible without JavaScript

### Form Processing
- Client-side form validation and handling
- Google Sheets integration for data collection
- Success/error message display system
- Email notifications for admissions team
- Timestamp and source tracking for all submissions

## External Dependencies

### CDN Resources
- **Bootstrap 5.3.0**: Layout and component framework
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts**: Typography (Inter and Poppins families)

### Third-party Integrations
- **Google Sheets Integration**: All application forms submit to Google Sheets automatically
- **Google Apps Script**: Server-side form processing and email notifications
- **Email Notifications**: Automatic alerts to admissions@principleinstitute.org
- CDN dependencies for performance optimization

## Deployment Strategy

### Static Site Architecture
- **Hosting Requirements**: Any static web hosting service
- **Build Process**: No build step required - direct file serving
- **Performance**: Optimized through CDN usage and efficient CSS/JS structure
- **SEO**: Meta tags and semantic HTML for search engine optimization

### Browser Compatibility
- Modern browser support through Bootstrap 5 compatibility
- Progressive enhancement for older browsers
- Responsive design across all device types

### Maintenance Approach
- Modular CSS architecture for easy customization
- Semantic HTML structure for content updates
- Centralized styling through CSS variables
- Clear separation of concerns between structure, styling, and behavior

## Recent Changes: Latest modifications with dates

### Google Sheets Integration (July 28, 2025)
- Added complete Google Sheets integration for all application forms
- Created Google Apps Script handler for form submissions  
- Integrated automatic email notifications for new applications
- Added professional photos of leadership team (Mr. Askar Ali M K and Mr. Savan Devanand)
- Replaced all university partnership images with authentic campus photos
- Forms now automatically capture: student info, course interest, qualifications, timestamps, and source tracking
- Created comprehensive setup documentation (GOOGLE_SHEETS_SETUP.md)