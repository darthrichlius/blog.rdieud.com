# README

A application system that supports [blog.rdieud.com]().

## OVERVIEW

The application system is designed to offer a solution for publishing and managing posts within the context of a blog. It consists of 4 primary services:

- **Web**: Presentation Service
- **Admin**: Content Management Service
- **API**: Business Service
- **AI**: Helper

The application takes into account additional features such as **authentication**, **error handling**, **logging**, **push notifications**, and **security** across all services.

## CONTEXT / PURPOSE

Building such a solution is not an existential necessity, as there are well-established and affordable alternatives available for this purpose.

The primary interest in developing this product lies in being part of a broader ecosystem, creating a continuity of systems working together or sharing data seamlessly while utilizing specific technologies. This approach allows for a more cohesive and integrated experience across various platforms and services.

## FUNCTIONAL REQUIREMENTS

- **Presentation layer**

  - Access to posts and pages
  - User experience (pagination, performance, recommendations, etc.)
  - Minimal secure post management (editing, deletion)
  - Engagement features (comments, etc.)
  - Newsletter and RSS subscription management

- **Content management layer**

  - Dashboard (analytics, events, observability, etc.)
  - Content management service (posts, comments, etc.)
  - Automation and workflow management
  - AI companion (editorial assistance, SEO optimization, etc.)
  - User management and role-based access control
  - Querying and search functionality
  - Newsletter management and distribution
  - Configuration and customization options

- **API layer**

  - Business logic and data processing
  - Authentication and user identity management
  - Authorization and access control enforcement
  - Logging and auditing capabilities
  - Caching and performance optimization

- **Persistence layer**

  - Object storage for media assets and file management
  - Data storage (stateful and stateless) and database management
  - Backup and recovery capabilities
  - Scalability and performance optimization

## TECHNICAL CONTRAINTS

<table>
    <caption></caption>
    <tr>
        <th scope="row">GENERAL</th>
        <td>
            <ul>
                <li>ES6</li>
                <li>Typescript</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th scope="row">FRONT</th>
        <td>
            <ul>
                <li>React 18+</li>
                <li>Bootstrap 5 (then Daisy UI)</li>
                <li>ViteJS</li>
                <li>React Query</li>
                <li>React Router</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th scope="row">BACK</th>
        <td>
            <ul>
                <li>ExpressJS 4</li>
                <li>NodeJS</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th scope="row">QAULITY</th>
        <td>
            <ul>
               <li>Jest (Unit Testing)</li>
                <li>Cypress (E-2-E testing)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th scope="row">DATA</th>
        <td>
            <ul>
                <li>SQLite3 (then PostgreSQL)</li>
                <li>MinIO (Object Storage)</li>
                <li>Sequelize</li>
            </ul>
        </td>
    </tr>
</table>
