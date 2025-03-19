import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import 'dotenv/config';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QueryDBHelper } from './helpers/querydb.helper';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const connectionDBNeon = new QueryDBHelper(process.env['NEON_DATABASE_URL']!);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

app.use('/api/up-neon', async (_req, res) => {
  let status = 200;
  let message = 'OK';
  try {
    await connectionDBNeon.getVersion();
  } catch (error) {
    status = 500;
    message = 'KO';
  }

  res.status(status);
  res.json({
    message,
  });
});

app.use('/api/client/findAll', async (_req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getClients();
    results = result;
  } catch (error) {
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

app.use('/api/client/:name', async (req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getClient(req.params.name);
    results = result;
  } catch (error) {
    console.log('🚀 ~ app.use ~ error:', error);
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

app.use('/api/operations/findAll', async (_req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getOperations();
    results = result;
  } catch (error) {
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
