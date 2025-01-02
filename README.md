# frontend-technical-challenge

This is my code to **Sailer AI** frontend challenge

Build a chat interface that can send and receive messages using the REST API and optionally integrate with WebSockets for real-time updates.

The main features to Implement:
- Ability to create chats and display messages.
- Sending text, images, and audio messages.
- Display user presence (online, offline, typing).

## Summary
- Installation
- Run
- Stack

### Installation
Clone this repository in your local machine using the command

```shell
git clone https://github.com/IgorSousaFront/chat-sailer-fe
```

Install the dependencies

```shell
npm install
```
or
```shell
yarn
```

### Run
To run You will need to run the Docker container provided first [here](https://github.com/SailerAI/frontend-technical-challenge), follow the steps to run the backend;

after run the docker, run the frontend

```shell
npm run dev
```
or
```shell
yarn dev
```
open [localhost:5173](http://localhost:5173/) in your preferred browser

### Stack
The choosen technologies to complete this challenge

| Tool               | Name           | Link for documentation            |
|--------------------|----------------|-----------------------------------|
| Language           | Typescript     | https://www.typescriptlang.org/   |
| Framework          | React.js       | https://react.dev/                |
| Build Tool         | Vite.js        | https://vite.dev/                 |
| Component library  | Shadcn/ui      | https://ui.shadcn.com/            |
| Icons lib          | Phosphor icons | https://phosphoricons.com/        |
| HTTP Client        | Axios          | https://axios-http.com/           |
| CSS Framework      | Tailwind CSS   | https://tailwindcss.com/          |
| Manage Async State | React Query    | https://tanstack.com/query/latest |


