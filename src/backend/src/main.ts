import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor } from "@nestjs/common";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cors());

    const config = new DocumentBuilder()
        .setTitle('RiCourse')
        .setDescription('RiCourse API description')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(3123, () =>
        console.log("Document at http://localhost:3123/api"),
    );

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
