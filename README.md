# Project

This Angular project is a scalable and well-structured enterprise-level application designed to handle various features and functionalities efficiently. The architecture follows best practices to promote modularity, reusability, and maintainability. It is built with core Angular concepts like modules, services, interceptors, and routing, with an emphasis on scalability for large applications.



## Key Features

1. Supabase Database - a Postgres database for storing your user data and Row Level Security so data is protected and users can only access their own information.
2. Supabase Auth - allow users to sign up and log in.
3. Supabase Storage - users can upload a profile photo.

<!-- - **Core Module**: Contains essential services and utilities that should be instantiated only once during the lifetime of the app, such as authentication, global error handling, and logging services.
- **Shared Module**: Houses reusable components, directives, and pipes that can be shared across different features of the application, minimizing redundancy.
- **Feature Modules**: Each feature of the application (e.g., User Management, Product Management) has its own dedicated module, complete with its routing, components, and services. This modular approach ensures the app is easy to scale and maintain.
- **Models**: Interfaces or classes representing data models (e.g., User, Product) used consistently throughout the application.
- **Services**: Singleton services located in the core module and shared services used across multiple features, ensuring separation of concerns and code reuse. -->

## Project Structure

The project has been organized into clearly defined folders:
- `/core/`: Contains singleton services, guards, interceptors, exception handling, constants, and abstract base classes.
- `/shared/`: Contains reusable components, pipes, and directives.
- `/features/`: Contains the application’s feature modules (e.g., user, product).
- `/models/`: Houses data models or interfaces.
- `/services/`: Includes shared services that are not singleton services.
- `/assets/`: Static assets like images, fonts, and icons.
- `/styles/`: Global styles and themes for the application.
- `/environments/`: Environment-specific configurations (development, production).

## Installed Dependencies and Tools
Several tools and packages have been added to streamline development, enforce code quality, and automate the workflow. Here's an overview:

1. **Husky**: Ensures that git hooks are enforced to automatically run checks before pushing commits. This helps prevent bad code from being committed and enforces consistency across the team.
   - Installed with: `npm install husky --save-dev`
   - Set up to run hooks for Prettier, ESLint, and CommitLint checks before pushing code.

2. **Commitizen**: Standardizes commit messages, ensuring that they follow a consistent and conventional style. This helps when generating automated changelogs and keeping a uniform git history.
   - Installed with: `npm install commitizen --save-dev`
   - Configured to use the conventional commit format (`cz-conventional-changelog`).

3. **Pretty-Quick**: Ensures code is formatted with Prettier before committing, avoiding inconsistent formatting in the codebase.
   - Installed with: `npm install pretty-quick --save-dev`
   - Integrated into Husky hooks to run `pretty-quick --staged` on staged files.

4. **Prettier**: Enforces consistent code formatting rules across the codebase. Prettier ensures that the code style is maintained and keeps it readable and clean.
   - Installed with: `npm install prettier --save-dev`
   - Configured with a `.prettierrc` file.

5. **ESLint**: A linting tool for JavaScript and TypeScript that ensures code quality by enforcing coding standards and catching potential bugs before they become an issue.
   - Installed with: `npm install eslint --save-dev`
   - Configured with an `.eslintrc.json` file for strict linting rules.

6. **CommitLint**: Validates commit messages to ensure they follow the conventional commit standard.
   - Installed with: `npm install @commitlint/cli @commitlint/config-conventional --save-dev`
   - Integrated with Husky to lint commit messages during the commit process.

7. **TypeScript**: Used for writing typed JavaScript, providing compile-time type checking, which improves code reliability and reduces runtime errors.
   - Installed with: `npm install typescript`

8. **Karma & Jasmine**: Testing frameworks used to run unit tests in the Angular environment.
   - Configured in the `karma.conf.js` file and `tsconfig.spec.json`.

## Additional Features
- **HTTP Interceptors**: Auth and error handling interceptors to automatically attach tokens to API requests and globally handle API errors.
- **Route Guards**: Guards to protect routes based on user authentication or roles.
- **Global Exception Handling**: Centralized handling of custom and HTTP exceptions for a better user experience and debugging.
- **Environment Configurations**: Separate files for different environments (dev and prod) to manage environment-specific variables easily.

## Example Use Case
- When a developer commits code, Husky ensures that Prettier formats the code, ESLint checks for code quality, and CommitLint verifies that the commit message follows the conventional format. This automated workflow ensures that the codebase maintains high standards without additional manual effort.

## Conclusion
This project is a robust foundation for a scalable Angular application, designed to handle complex features while maintaining high code quality and consistency. With automated git hooks, code formatting, and linting tools, the development process becomes more efficient, allowing developers to focus on building features rather than worrying about formatting or linting issues.

## 🚧 Documentation Status

This documentation is a **work in progress**. 📝 I am continuously updating it to provide more details, improve clarity, and ensure it stays current with any changes in the project. Developers are encouraged to contribute by adding missing information or refining the existing content as the project evolves. 🚀

If you encounter any discrepancies or need additional information, feel free to reach out or submit a pull request with documentation updates. 🙌

Thank you for your understanding and patience! 💡
