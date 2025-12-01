# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `npm run dev` - Start Next.js development server
- **Build**: `npm run build` - Build production application
- **Start**: `npm run start` - Start production server
- **Lint**: `npm run lint` - Run ESLint

## Project Overview

This is a task time-boxing application for engineering teams, built as a full-stack Next.js application. The app helps teams manage tasks using time-boxing methodology while providing visibility into team member availability for meetings and collaboration.

### Target Users
- Junior to mid-level engineers
- Remote/hybrid development teams
- Teams working across multiple projects

### Core Value Propositions
1. **Individual productivity** - Time-boxed task management to avoid multitasking
2. **Team communication efficiency** - Visibility into member availability for meetings
3. **Improved mentorship** - Easy identification of when junior members can ask questions

## Technology Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Docker for development)
- **ORM**: Prisma
- **Authentication**: Auth.js (NextAuth) with email/password and Google OAuth
- **Forms**: react-hook-form + zod validation
- **Styling**: Tailwind CSS 4.x
- **Time handling**: Luxon

## Architecture

### Directory Structure
The project follows a layered architecture pattern:

- **UI Layer**: `src/app/` (pages/routing) + `src/features/` (components)
- **Application Layer**: `src/server/**.service.ts` (business logic)
- **Infrastructure Layer**: `src/server/**.repository.ts` (Prisma/database access)
- **Shared**: `src/lib/` (utilities, validation schemas, API clients)

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public routes (login, register)
│   ├── (auth)/            # Auth API routes
│   ├── (app)/             # Protected app routes
│   └── api/               # REST API endpoints
├── server/                # Backend services and repositories
│   ├── auth/              # Authentication logic
│   ├── user/              # User management
│   ├── team/              # Team management
│   ├── task/              # Task management
│   └── meeting/           # Meeting request handling
├── features/              # Feature-based component organization
│   ├── tasks/             # Task-related components and hooks
│   ├── meetings/          # Meeting-related components
│   ├── teams/             # Team management components
│   └── account/           # Account settings
└── lib/                   # Shared utilities
    ├── validators/        # Zod schemas
    ├── api-client/        # Fetch wrappers
    ├── time/              # Date/time utilities
    └── types/             # Shared TypeScript types
```

### Component Strategy
- **Server Components**: Page components (`app/**/page.tsx`) handle data fetching using service layer
- **Client Components**: Interactive UI in `features/` handles user interactions and API calls
- **API Layer**: REST endpoints in `app/api/` with zod validation and service layer integration

### Service/Repository Pattern
- **Repository Layer**: Direct Prisma/database access, one repository per table
- **Service Layer**: Business logic, rule validation, cross-repository operations
- **API Layer**: Thin layer handling authentication, input validation, and service calls

## Data Model

Key entities include:
- **User**: Authentication and profile data
- **Team**: Workspace for collaboration with member management
- **TeamMember**: Join table with roles (ADMIN/MEMBER) and positions
- **Task**: Time-boxed work items with meeting availability status
- **MeetingRequest**: Meeting scheduling with approval workflow
- **Position**: Role classifications (Frontend, Backend, QA, etc.)

See `doc/er.md` for detailed entity relationship diagram.

## MVP Features

### Core Functionality
1. **Authentication**: Email/password and Google OAuth
2. **Team Management**: Create teams, invite members, role management
3. **Task Management**: Time-boxed tasks with 15-minute granularity, meeting availability indicators
4. **Team Visibility**: View member schedules and availability
5. **Meeting Requests**: Schedule meetings with approval workflow

### Task Time-Boxing
- Tasks have specific start/end times in 15-minute increments
- Types: WORK/BREAK
- Meeting availability: AVAILABLE/CHAT_ONLY/UNAVAILABLE
- Visual timeline representation with current time indicator

## Development Notes

### Path Mapping
- Use `@/*` for src directory imports (configured in tsconfig.json)

### Business Rules
- Time-boxing validation: start < end, 15-minute alignment
- Team membership required for most operations
- Meeting requests only allowed during AVAILABLE time slots
- Incomplete tasks can be carried over to the next day

### Authentication Flow
- Protected routes redirect to login if unauthenticated
- Session management via Auth.js
- Team selection required after login

## Future Considerations

- **tRPC**: Service layer interfaces designed for easy tRPC integration
- **External Integrations**: Architecture supports Google Calendar and other external services
- **Real-time Updates**: WebSocket support for live team status updates