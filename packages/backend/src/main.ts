// import kill from 'kill-port';
import express from 'express';
import ViteExpress from 'vite-express';
import routes from './router';
import './mongo';

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(routes);

const port: number = +(process.env.BACKEND_PORT ?? 3000);

// kill(port, 'tcp').then(console.log).catch(console.log);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
