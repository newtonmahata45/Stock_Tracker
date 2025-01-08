import app from './app';
import envConfig from './config/env.config';

const PORT = envConfig.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
