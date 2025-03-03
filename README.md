# Money Transfer Application

![Money Transfer](public/images/logo.svg)

A NextJS application for international money transfers, catering to different user personas and featuring a comprehensive design system based on Atomic Design methodology.

## Overview

This application facilitates international money transfers for three distinct user personas:

1. **Payment Initiator**: Creates and manages payment requests across multiple payment methods and countries.
2. **Payment Approver**: Reviews, modifies, and approves/rejects payment requests.
3. **Payment Receiver**: Tracks incoming payments and monitors their status in real-time.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Material UI
- **Design System**: Storybook with Atomic Design methodology
- **Authentication**: Mocked authentication with NextJS middleware
- **Styling**: MUI styled components with Vitesse design language

## Key Features

- **Multi-persona Interface**: Tailored dashboards for each user role
- **Atomic Design System**: Component library with atoms, molecules, and organisms
- **Transaction Wizard**: Step-by-step payment creation process with specialized payment method forms
- **Real-time Tracking**: Visual timeline for payment status monitoring
- **Dynamic Payment Methods**: Support for multiple payment types with country-specific fields
- **Role-based Access Control**: Protected routes with middleware-based authentication

## Future Improvements

### Micro-Frontends Architecture

A logical next step for scaling development across multiple teams would be to implement a micro-frontends architecture:

- **Shell Application**: Core navigation and authentication
- **Team-Owned Micro-Frontends**: 
  - Payment Methods Team: Bank Transfer, Credit Card, PayPal modules each of these methods can be a separate team if needed. These modules can also bo micro-frontends with module federation if needed.
  - Approver Team: Review and approval interfaces
  - Receiver Team: Payment tracking and notification interfaces

Benefits of this approach:
- **Independent Deployment**: Teams can release features independently
- **Technology Flexibility**: Teams can use different frameworks if needed
- **Scaled Development**: Multiple teams can work in parallel with minimal coordination
- **Improved Build Performance**: Smaller codebases with faster build times

This could be implemented using Module Federation (Webpack) or a similar approach to compose the application at runtime.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/michalmalinowski87/money-transfer-ui
   cd money-transfer-ui
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running Storybook

1. Start the Storybook server
   ```bash
   npm run storybook
   # or
   yarn storybook
   ```

2. Open [http://localhost:6006](http://localhost:6006) in your browser to view the component library

## Authentication

The application uses a mocked authentication system with three predefined users:

1. **Payment Initiator**
   - Username: `initiator`
   - Password: Any password will work

2. **Payment Approver**
   - Username: `approver`
   - Password: Any password will work

3. **Payment Receiver**
   - Username: `receiver`
   - Password: Any password will work

## License

This project is licensed under the MIT License - see the LICENSE file for details.