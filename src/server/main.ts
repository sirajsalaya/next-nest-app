import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, 'src', 'public'));

  await nextServer.prepare();

  app.use((req: any, res: any, next: () => void) => {
    if (req.url.startsWith('/api')) {
      next();
    } else {
      handle(req, res);
    }
  });

  await app.listen(port, (): void =>
    console.log(
      `> Server listening at http://localhost:${port} in ${process.env.NODE_ENV} mode`,
    ),
  );
}

bootstrap();
