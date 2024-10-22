# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Project Structure

```markdown
/project
│
├── /e2e/ # End-to-End Testing (Protractor or Cypress)
├── /src/ # Application Source Files
│ ├── /app/ # Main Application Code
│ ├── /core/ # Core module for singleton services and global utilities
│ │ ├── /abstracts/ # Abstract classes or interfaces
│ │ │ ├── base-http.service.ts # Abstract base HTTP service
│ │ │ └── base.component.ts # Base component abstract class
│ │ ├── /constants/ # Global constants
│ │ │ ├── api-endpoints.ts # API endpoints constants
│ │ │ └── roles.ts # Roles and permissions constants
│ │ ├── /exceptions/ # Global exception handling
│ │ │ ├── app-exception.ts # Custom application exceptions
│ │ │ └── http-exception.ts # HTTP-related exceptions
│ │ ├── /guards/ # Route guards
│ │ │ └── auth.guard.ts # Authentication guard
│ │ ├── /interceptors/ # HTTP interceptors
│ │ │ ├── auth.interceptor.ts # Interceptor for adding auth headers
│ │ │ └── error-handler.interceptor.ts # Global error handling interceptor
│ │ ├── /services/ # Singleton services
│ │ │ ├── auth.service.ts # Authentication service (singleton)
│ │ │ ├── error-handler.service.ts # Global error handling service
│ │ │ ├── logger.service.ts # Logging service
│ │ └── core.module.ts # Core module setup
│ │ ├── /shared/ # Shared components, directives, and pipes
│ ├── /features/ # Feature modules (Feature modules for different app features) e.g. auth, user, product, order, e.t.c
│ │ ├── /user/  
│ │ │ ├── components/ # feature related components  
│ │ │ ├── user-routing-module.ts # User feature module  
│ │ │ ├── user.module.ts # User feature module
│ ├── /models/ # Models (interfaces or classes)
│ │ ├── user.model.ts # User model interface
│ ├── /services/ # Shared services (non-singleton)
│ │ ├── user.service.ts # User data service
│ │ └── notification.service.ts  
│ │ ├── /assets/ # Static Assets like images, fonts, etc.
│ │ ├── /environments/ # Environment configurations (dev, prod)
│ │ ├── /styles/ # Global styles and theming
│ │ ├── /app-routing.module.ts # Main app routing file
│ │ └── /app.module.ts # Root module for the app
│ ├── /environments/ # Environment settings
│ ├── /index.html # Main HTML file
│ ├── /main.ts # Main entry point of the application
│ ├── /polyfills.ts # Polyfills for older browser support
│ ├── /styles.scss # Global stylesheet (optional SCSS or CSS)
│ └── /test.ts # Test entry point
├── .browserslistrc # Browser compatibility list for build tools
├── .editorconfig # Code style configuration for IDEs
├── .eslintrc.json # ESLint configuration file
├── .gitignore # Git ignore rules
├── angular.json # Angular CLI configuration file
├── karma.conf.js # Karma test runner configuration
├── package.json # Dependencies and scripts
├── README.md # Project documentation
├── tsconfig.app.json # TypeScript config for the application
├── tsconfig.spec.json # TypeScript config for unit tests
└── tslint.json # TSLint configuration (if using TSLint)
```
