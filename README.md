# Angular E-Commerce Project

An Angular e-commerce application built with Angular CLI version 20.0.5, featuring product catalog, shopping cart, user authentication, and modern UI with Tailwind CSS.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 👤 User authentication system
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components
- 📊 Sample data for products, users, and orders

## Tech Stack

- **Frontend**: Angular 20.0.5
- **Styling**: Tailwind CSS, SCSS
- **Build Tool**: Angular CLI
- **Testing**: Jasmine, Karma

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project-1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200/`

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/
│   │   ├── product-card/
│   │   ├── category-card/
│   │   └── category-sidebar/
│   ├── pages/              # Page components
│   │   ├── home/
│   │   ├── products/
│   │   ├── product-detail/
│   │   ├── cart/
│   │   └── login/
│   ├── services/           # Angular services
│   ├── models/             # TypeScript interfaces
│   └── assets/             # Static assets and sample data
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
