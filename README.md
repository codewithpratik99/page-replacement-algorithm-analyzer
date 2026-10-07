# Page Replacement Calculator

React + JavaScript project for an Operating System / OSY page replacement simulator.

## Algorithms
- FIFO (First In First Out)
- LRU (Least Recently Used)
- Optimal

## Features
- Reference string input
- 1 to 6 frames
- Algorithm selector
- Page hit and page fault count
- Hit ratio
- Step-by-step frame table
- Responsive design
- Reset/sample input

## Run the project

Install Node.js, open this project folder in VS Code terminal and run:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Example

Reference string:
`7 0 1 2 0 3 0 4`

Frames:
`3`

For FIFO, the example produces 6 page faults and 2 page hits.
