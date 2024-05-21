import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: 3002,
  })
  .then(() => console.log(`HTTP Server running http://localhost:${env.PORT}`))
