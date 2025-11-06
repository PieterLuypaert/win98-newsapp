# Windows 98 News Application

A nostalgic Windows 98-styled news application built with React, featuring a retro user interface and modern web development practices.

## Live Demo

- [News Application](https://web5-pieter.onrender.com)
- [Storybook Documentation](https://opdracht-2-news-application.onrender.com)

## Source Code

- [GitHub Repository](https://github.com/pgm-2526-web-5/opdracht-2-news-application-PieterLuypaert)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Component Documentation](#component-documentation)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Styling Approach](#styling-approach)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [License](#license)

## Project Overview

This project is a modern news application wrapped in a nostalgic Windows 98 interface. It demonstrates advanced React development patterns, including component composition, custom hooks, state management with React Query, and form handling with React Hook Form.

The application features:

- Authentic Windows 98 UI components (windows, buttons, taskbar)
- Real-time news browsing with category filtering
- Article bookmarking system
- User authentication (login/register)
- Reading progress tracking
- Responsive design with mobile support
- Animated boot screen with sound effects
- Interactive Clippy assistant

## Features

### Core Features

- **News Browsing**: Browse articles with headline sections and regular news
- **Category Filtering**: Filter news by categories (Tech, World, Sports, etc.)
- **Article Search**: Real-time search across titles, content, tags, and categories
- **Detailed Article View**: Full article content with images, quotes, and callouts
- **Bookmarking System**: Save articles for later reading (requires authentication)
- **User Authentication**: Login and registration with form validation
- **Reading Progress**: Visual progress bar showing article reading completion
- **Related Articles**: Discover similar content
- **Comments System**: View and add comments on articles
- **Author Cards**: Detailed author information with social links

### UI/UX Features

- **Windows 98 Aesthetics**: Pixel-perfect recreation of Windows 98 UI elements
- **Draggable Desktop Icons**: Persistent icon positioning
- **Window Management**: Resizable, draggable windows
- **Taskbar**: Functional taskbar with start menu and credits
- **Boot Screen**: Animated startup sequence with audio
- **Clippy AI Assistant**: Interactive AI-powered help character using OpenRouter
- **Responsive Design**: Mobile-optimized layouts
- **Loading States**: Windows 98-styled loading dialogs
- **Error Handling**: User-friendly error messages

## Technology Stack

### Frontend Framework

- **React 18**: Modern React with hooks and concurrent features
- **React Router 6**: Client-side routing
- **Vite**: Fast build tool and development server

### State Management

- **TanStack Query (React Query)**: Server state management, caching, and synchronization
- **React Context**: Authentication state management

### Form Handling

- **React Hook Form**: Performant form validation
- **Zod**: Schema validation for forms

### Animations

- **Framer Motion**: Smooth animations and transitions

### Styling

- **CSS Modules**: Scoped component styling
- **PostCSS**: CSS processing
- **Custom CSS Variables**: Theme management

### Development Tools

- **Storybook**: Component development and documentation
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Deployment

- **Render**: Cloud hosting platform

### AI Integration

- **OpenRouter**: AI API gateway for Clippy assistant
- **GPT-3.5 Turbo**: Language model for conversational AI

## Architecture

### Component Structure

The application follows a clear separation between presentational (design) and container (functional) components:

```
src/
├── components/
│   ├── design/          # Presentational components
│   │   ├── Button/
│   │   ├── Window/
│   │   ├── ArticleCard/
│   │   └── ...
│   └── functional/      # Container components with logic
│       ├── Auth/
│       ├── Article/
│       └── ...
├── pages/               # Route-level components
├── core/                # Business logic and API
│   ├── modules/
│   │   ├── news/
│   │   └── auth/
│   └── storage/
├── styles/              # Global styles and variables
└── main.jsx            # Application entry point
```

### Design Patterns

1. **Container/Presentational Pattern**: Separation of UI and logic
2. **Custom Hooks**: Reusable logic (useAuth, useBookmarks, useArticle)
3. **Compound Components**: Complex UI components (Window, Modal)
4. **Render Props**: Flexible component composition
5. **Higher-Order Components**: Authentication guards

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenRouter API key (for Clippy AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pgm-2526-web-5/opdracht-2-news-application-PieterLuypaert.git
cd opdracht-2-news-application-PieterLuypaert
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables:

```env
VITE_BASE_API_URL=https://www.pgm.gent/data
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Getting an OpenRouter API Key:**

- Visit [OpenRouter](https://openrouter.ai/keys)
- Sign up or log in
- Create a new API key
- Add credits to your account (pay-as-you-go pricing)
- Copy the key to your `.env.local` file

### Running the Application

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Storybook:

```bash
npm run storybook
```

## Project Structure

```
opdracht-2-news-application-PieterLuypaert/
├── .storybook/              # Storybook configuration
├── public/
│   └── assets/              # Static assets (images, sounds)
├── src/
│   ├── components/
│   │   ├── design/          # UI components
│   │   │   ├── ArticleBody/
│   │   │   ├── ArticleCard/
│   │   │   ├── ArticleHeader/
│   │   │   ├── ArticleSidebar/
│   │   │   ├── AuthorCard/
│   │   │   ├── BookmarkButton/
│   │   │   ├── BookmarksContent/
│   │   │   ├── Button/
│   │   │   ├── CategoryCard/
│   │   │   ├── Clippy/
│   │   │   ├── Comments/
│   │   │   ├── FormCheckbox/
│   │   │   ├── FormInput/
│   │   │   ├── FormSelect/
│   │   │   ├── HeadlineCard/
│   │   │   ├── HomeContent/
│   │   │   ├── LoadingDialog/
│   │   │   ├── LoginModal/
│   │   │   ├── ProgressBar/
│   │   │   ├── RelatedArticles/
│   │   │   ├── TaskbarCredits/
│   │   │   ├── Textarea/
│   │   │   └── Window/
│   │   └── functional/      # Logic components
│   │       ├── Article/
│   │       ├── Auth/
│   │       ├── DesktopIcon/
│   │       └── Taskbar/
│   ├── core/
│   │   ├── auth/            # Authentication logic
│   │   ├── modules/
│   │   │   ├── bookmarks/
│   │   │   └── news/
│   │   └── storage/         # LocalStorage utilities
│   ├── pages/               # Route components
│   │   ├── Article.jsx
│   │   ├── Bookmarks.jsx
│   │   ├── Category.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── styles/              # Global styles
│   ├── App.jsx              # Root component
│   └── main.jsx             # Application entry
├── .env.local               # Environment variables
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── readme.md                # Documentation
```

## Available Scripts

### Development

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run storybook` - Start Storybook server (http://localhost:6006)

### Build

- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

### Storybook

- `npm run build-storybook` - Build static Storybook site

### Deployment

- Automatically deployed via Render on push to main branch

## Component Documentation

### Design Components

All design components are documented in Storybook with interactive examples:

- **Button**: Win98-styled buttons with variants
- **Window**: Draggable, resizable window component
- **ArticleCard**: News article preview card
- **HeadlineCard**: Featured article display
- **CategoryCard**: Category filter button
- **FormInput**: Styled input fields
- **FormSelect**: Dropdown select component
- **FormCheckbox**: Checkbox with label
- **Textarea**: Multi-line text input
- **LoadingDialog**: Windows 98 loading indicator
- **Comments**: Comment list and form
- **BookmarkButton**: Toggle bookmark state
- **ProgressBar**: Reading progress indicator
- **Clippy**: AI-powered assistant with chat interface

### Functional Components

Container components that handle business logic:

- **ArticleContainer**: Article page logic and data fetching
- **BookmarksContainer**: Bookmark management
- **LoginFormContainer**: Login form with validation
- **RegisterFormContainer**: Registration form with validation
- **TaskbarContainer**: Taskbar state and actions
- **DesktopIconContainer**: Icon positioning and interactions

### Custom Hooks

Reusable React hooks:

- `useAuth()`: Authentication state and methods
- `useBookmarks()`: Bookmark CRUD operations
- `useArticle(slug)`: Single article data and operations
- `useHomeLogic()`: Homepage filtering and search
- `useScrollProgress()`: Reading progress tracking

## API Integration

### News API

The application fetches data from the PGM News API:

```javascript
// Base URL
VITE_BASE_API_URL=https://www.pgm.gent/data

// Endpoints
GET /news.json                    # All news articles
GET /news/{id}.json               # Single article
GET /profiles/{id}.json           # Author profile
```

### OpenRouter AI API

Clippy uses OpenRouter for AI-powered conversations:

```javascript
// API Configuration
VITE_OPENROUTER_API_KEY=your_api_key

// Features
- Contextual help about the news app
- Article summaries and explanations
- Navigation assistance
- General Q&A about news topics

// Models Used
- openai/gpt-3.5-turbo (default)
```

**Privacy & Security:**

- Conversations are not stored by the application
- Chat history stored locally in browser localStorage
- API calls made directly from browser to OpenRouter
- No server-side logging of conversations

## Authentication

### Mock Authentication

The application uses a simulated authentication system:

```javascript
// Login
fakeLogin({ email, password }) => Promise<User>

// Register
fakeRegister({ email, password, firstname, lastname }) => Promise<User>

// Session persistence
- Stored in localStorage
- Auto-restored on page load
- Cleared on logout
```

### Protected Features

- Bookmarking articles
- Adding comments
- Viewing saved articles

## State Management

### Server State (React Query)

```javascript
// Query keys
["news"][("article", slug)][("author", id)]; // All articles // Single article // Author profile

// Mutations
addBookmark(slug);
removeBookmark(slug);
addComment(postId, data);
```

### Client State (Context)

```javascript
// Auth Context
{
  user: User | null,
  isAuthenticated: boolean,
  login: (credentials) => Promise<void>,
  register: (data) => Promise<void>,
  logout: () => void
}

// Bookmarks Context
{
  bookmarks: string[],
  addBookmark: (slug) => void,
  removeBookmark: (slug) => void,
  isBookmarked: (slug) => boolean
}
```

## Styling Approach

### CSS Architecture

1. **Global Styles**: Reset, typography, CSS variables
2. **Component Styles**: Scoped to components
3. **Layout Styles**: Grid and flexbox utilities
4. **Theme Variables**: Windows 98 color palette

### CSS Variables

```css
:root {
  --color-navy: #000080;
  --color-teal: #008080;
  --color-window-bg: #c0c0c0;
  --color-window-border-light: #ffffff;
  --color-window-border-dark: #808080;
  --font-family-primary: "MS Sans Serif", sans-serif;
}
```

### Responsive Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile */
}
@media (max-width: 1024px) {
  /* Tablet */
}
@media (min-width: 1025px) {
  /* Desktop */
}
```

## Performance Optimizations

### Code Splitting

- Route-based code splitting
- Lazy loading of components
- Dynamic imports for heavy features

### Caching

- React Query automatic caching
- LocalStorage for bookmarks
- Service worker for offline support (future)

### Image Optimization

- Lazy loading images
- Responsive images with srcset
- WebP format with fallbacks

## Deployment

### Render Configuration

**Main Application**

- Build Command: `npm run build`
- Publish Directory: `dist`
- Environment Variables: `VITE_BASE_API_URL`

**Storybook**

- Build Command: `npm run build-storybook`
- Publish Directory: `storybook-static`

### Deployment Steps

1. Push to main branch
2. Render automatically builds
3. Application deploys to production URL
4. Storybook deploys to documentation URL

## Contributing

This project was developed as part of the Web 5 course at Artevelde University of Applied Sciences.

## License

This project is created for educational purposes as part of the PGM curriculum.

## Author

**Pieter Luypaert**

- GitHub: [PieterLuypaert](https://github.com/pgm-2526-web-5)
- Project: Web 5 - Advanced Web Development

---

Built with nostalgia and modern web technologies.
