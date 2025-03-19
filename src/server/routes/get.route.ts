import express from 'express';
import { QueryDBHelper } from '../helpers/querydb.helper';

const router = express.Router();
const connectionDBNeon = new QueryDBHelper(process.env['NEON_DATABASE_URL']!);
await connectionDBNeon.setSchema();

router.use('/up-neon', async (_req, res) => {
  let status = 200;
  let message = 'OK';
  try {
    await connectionDBNeon.getVersion();
  } catch (error) {
    console.log('🚀 ~ router.use ~ error:', error);
    status = 500;
    message = 'KO';
  }

  res.status(status);
  res.json({
    message,
  });
});

router.use('/client/findAll', async (_req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getClients();
    results = result;
  } catch (error) {
    console.log('🚀 ~ router.use ~ error:', error);
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

router.use('/client/:name', async (req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getClient(req.params.name);
    results = result;
  } catch (error) {
    console.log('🚀 ~ router.use ~ error:', error);
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

router.use('/operations/findAll', async (_req, res) => {
  let status = 200;
  let results;
  try {
    const result = await connectionDBNeon.getOperations();
    results = result;
  } catch (error) {
    console.log('🚀 ~ router.use ~ error:', error);
    status = 500;
    results = 'KO';
  }

  res.status(status);
  res.json(results);
});

export { router as getRouter };
