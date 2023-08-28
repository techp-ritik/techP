// // src/api/mswHandlers.js

// import { rest } from 'msw';
// import {baseUrl} from './baseapi'
// // Define your request handlers using `rest` from MSW
// export const mswHandlers = [
//   rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
//     // Mock response data
//     const categories = [
//       { id: 1, name: 'Category 1', description: 'Description 1' },
//       { id: 2, name: 'Category 2', description: 'Description 2' },
//       // ... other mock categories ...
//     ];

//     return res(ctx.status(200), ctx.json(categories));
//   }),

//   // Define more handlers for other types of requests...
// ];

// src/api/mswhandlers.js
import { rest } from 'msw';

export const mswHandlers = [
  // Mock API handler for getAllCategories
  rest.get('https://91db-210-16-94-102.ngrok-free.app/categories/nodata/', (req, res, ctx) => {
     console.log("3")
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' },
        // Add more mock data as needed
      ])
    );
  }),
    // Mock API handler for getAllCategories with no data
    rest.get('https://91db-210-16-94-102.ngrok-free.app/categories/', (req, res, ctx) => {
        console.log("1")
        return res(ctx.status(200), ctx.json([]));
      }),
    
      // Mock API handler for getAllCategories with long description
   
      rest.get('https://91db-210-16-94-102.ngrok-free.app/categories/long-desc/', (req, res, ctx) => {
        console.log("2")
        const categories = [
          { id: 3, name: 'Category 3', description: 'This is a very long description that exceeds the usual length of descriptions.' },
          // ... other mock categories ...
        ];
    
        return res(ctx.status(200), ctx.json(categories));
      }),
];
