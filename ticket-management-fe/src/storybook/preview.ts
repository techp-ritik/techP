// .storybook/preview.js
import { setupWorker } from 'msw';
import { mswHandlers } from '../api/mswhandlers';

// Initialize MSW worker with the defined handlers
const worker = setupWorker(...mswHandlers);
worker.start();
