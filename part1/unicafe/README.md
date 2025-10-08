# Feedback App

A simple React app for collecting and displaying user feedback.  
Users can submit **good**, **neutral**, or **bad** feedback and view basic statistics.

## Features

- Record feedback with buttons  
- Display total feedback count  
- Calculate and show average score  
- Show percentage of positive feedback  

## Tech Stack

- React (Hooks: `useState`)
- JavaScript (ES6+)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Bilal11123/FullStackOpen-Solutions.git
   cd FullStackOpen-Solutions/part1/unicafe
    ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   or (for CRA):
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
   (or the port shown in your terminal)
---

## Example Output:
```
Give feedback
[good] [neutral] [bad]

Statistics
good: 2
neutral: 1
bad: 0
all: 3
average: 0.67
positive: 66.7 %
```