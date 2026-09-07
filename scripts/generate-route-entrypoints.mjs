import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist');
const consolePages = ['usage', 'coding-plan', 'models', 'api-keys', 'integrations', 'billing/balance', 'billing/orders', 'settings'];
const routes = [
  'console', 'demo/console',
  ...consolePages.flatMap(page => [`console/${page}`, `demo/console/${page}`]),
  'original-home',
  'aurinova-reference',
  'aurinova-reference/coding-plan',
  'aurinova-reference/models',
  'aurinova-reference/pricing',
  'aurinova-reference/login',
  'aurinova-reference/login/email',
  'aurinova-reference/login/sso',
  'aurinova-reference/signup',
  'aurinova-reference/forgot-password',
  'aurinova-reference/docs',
  'aurinova-reference/terms',
  'aurinova-reference/data-processing',
  'dev/design-system',
  'fireworks-reference',
  'login',
  'pricing',
  'signup',
];

await Promise.all(
  routes.map(async (route) => {
    const routeDirectory = resolve(outputDirectory, route);
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(
      resolve(outputDirectory, 'index.html'),
      resolve(routeDirectory, 'index.html'),
    );
  }),
);
