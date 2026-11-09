import express from 'express';
import app from './server/index.js';

// Explicit Express import allows Vercel's Express framework detection.
void express;

export default app;
