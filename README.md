# Lumina-Code

AI Code Reviewer Platform



\## Project Brief

Lumina Code is an advanced, production-ready AI Code Review platform. It features a modern, Glassmorphic design language with a dark visual identity, split-pane UI for interactive diff viewing, and real-time updates. The application architecture involves a robust backend system using Node.js, Socket.io for real-time communication, and a BullMQ/Redis worker architecture for processing AI code reviews efficiently in the background.



Key Features:

\- \*\*Interactive Diff Viewer\*\*: Compare code changes with an intuitive, side-by-side or inline view.

\- \*\*AI Code Review\*\*: Automated code analysis and syntax correction.

\- \*\*Real-time Updates\*\*: Live status updates and feedback via WebSockets (Socket.io).

\- \*\*Glassmorphic UI\*\*: High-end visual experience with advanced animations using Framer Motion.

\- \*\*Scalable Architecture\*\*: Decoupled backend and background task processing using Redis and BullMQ.



\## Architecture

The project is divided into the following main services:

\- \*\*Client\*\*: Front-end React application providing the user interface.

\- \*\*Server\*\*: Node.js/Express backend that handles REST API requests and WebSocket connections.

\- \*\*Worker\*\*: Background Node.js service that processes queued code review tasks independently.

\- \*\*Redis\*\*: In-memory data store used for message queuing (BullMQ) between the server and worker.



\## How to Run



\### Prerequisites

\- \[Node.js](https://nodejs.org/) installed

\- \[Docker](https://www.docker.com/) and Docker Compose installed (required to run Redis locally)



\### Installation

First, ensure you install dependencies in all relevant directories from the root of the project:



```bash

\# Install root dependencies (concurrently)

npm install



\# Install client dependencies

cd client

npm install

cd ..



\# Install server dependencies

cd server

npm install

cd ..



\# Install worker dependencies

cd worker

npm install

cd ..

```



\### Running the Application (All at once)

The easiest way to start the entire stack (Redis, Server, Worker, and Client) is to run the following command from the root directory:



```bash

npm run dev

```



This command will:

1\. Start the Redis container in the background using Docker Compose.

2\. Start the Server, Worker, and Client concurrently in development mode.



\### Running Services Individually

If you prefer to start the services independently, you can run the following commands from the root directory:



\*\*1. Start Redis:\*\*

```bash

npm run services:up

\# or manually: docker compose up -d redis

```



\*\*2. Start the Server:\*\*

```bash

npm run dev:server

\# Runs the server module (e.g., http://localhost:3000)

```



\*\*3. Start the Worker:\*\*

```bash

npm run dev:worker

\# Runs the background worker process

```



\*\*4. Start the Client:\*\*

```bash

npm run dev:client

\# Runs the React frontend development server (opens in browser automatically)

```



\### Stopping Services

To stop the application, you can terminate the `npm run dev` process in your terminal (usually via `Ctrl+C`).



To stop and remove the Redis Docker container in the background:

```bash

npm run services:down

\# or manually: docker compose down

```

