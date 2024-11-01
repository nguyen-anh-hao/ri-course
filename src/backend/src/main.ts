import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from 'cors';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cors({
        origin: 'http://localhost:3000',
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    }));

    await app.listen(3123, () =>
        console.log("listening at http://localhost:3123"),
    );

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
