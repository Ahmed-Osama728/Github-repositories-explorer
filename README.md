# GitHub Repository Explorer

A React application that allows users to search for GitHub repositories by keyword, view repository details, and star/unstar repositories directly from the app. Built with React, TypeScript, and Zustand for state management.

## Features

- **Search Repositories**: Search for GitHub repositories by keyword.
- **Repository Details**: View repository name, owner's username, description, star count, and fork count.
- **Star/Unstar Repositories**: Star or unstar repositories directly from the app.
- **Responsive UI**: User-friendly and visually appealing interface.
- **State Management**: Zustand is used to manage search results and starred repositories.

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ahmed-Osama728/Github-repositories-explorer
cd github-repository-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Set up your GitHub API token:
   Create a .env file in the root directory.
   Add your GitHub API token to the .env file according to .env.example file.

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Project Structure

```
src/
  ├── assets/            # Static assets such as images and icons
  ├── components/        # Reusable React components
  │   ├── layout/        # Layout-related components (e.g., Header)
  │   ├── repository/    # Components for repository display (e.g., RepositoryCard, RepositoryList)
  │   ├── search/        # Components for search functionality (e.g., SearchBar)
  │   └── ui/            # UI-specific components (e.g., ErrorMessage, LoadingSpinner)
  ├── services/          # API service logic and utilities
  │   ├── githubRepos.ts # GitHub API-related logic
  │   └── utils.ts       # Utility functions
  ├── store/             # Global state management
  │   └── store.ts       # Zustand store configuration
  ├── App.tsx            # Main application component
  ├── index.css          # Global CSS styles
  ├── main.tsx           # Application entry point
  ├── vite-env.d.ts      # Vite environment type definitions
  └── types.ts           # TypeScript type definitions

.env                     # Environment variables (ignored by Git)
.env.example             # Example environment file for reference
.gitignore               # Git ignore file
eslint.config.js         # ESLint configuration file
index.html               # Main HTML file
package-lock.json        # NPM lock file for dependencies
package.json             # NPM package configuration

```
