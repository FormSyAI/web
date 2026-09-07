import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist');
const routes = [
  'original-home',
  'aurinova-reference',
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
