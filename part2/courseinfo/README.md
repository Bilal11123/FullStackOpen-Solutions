# Course Info

A simple React app that displays information about programming courses and their parts.

## Features

- Lists multiple courses with their parts.
- Calculates and displays the total number of exercises per course.
- Uses component composition (`Course`, `Header`, `Content`, `Part`).

## File Structure
```
src/
├── main.jsx
└── App.jsx
└── components/
└── Course.jsx
```

## Usage

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open http://localhost:5173 in your browser.

## Output
```
Half Stack application development
Fundamentals of React 10
Using props to pass data 7
State of a component 14
Redux 11
total of 42 exercises

Node.js
Routing 3
Middlewares 7
total of 10 exercises
```