import app from './app.js';
import { config } from './config/env.js';

app.listen(config.port, () => {
  console.log(`🚀 Server ready in ${config.nodeEnv} mode at http://localhost:${config.port}`);
});