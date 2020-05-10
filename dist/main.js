"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_module_1 = require("./users/users.module");
const common_1 = require("@nestjs/common");
const fallback_filter_1 = require("./products/filters/fallback.filter");
const http_filter_1 = require("./products/filters/http.filter");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_filter_1 = require("./products/filters/validation.filter");
const validation_exception_1 = require("./products/filters/validation.exception");
const swagger_1 = require("@nestjs/swagger");
const products_module_1 = require("./products/products.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const prodOptions = new swagger_1.DocumentBuilder()
        .setTitle('Products api').
        setDescription('Test products').
        setVersion('1.0').
        build();
    const prodDocument = swagger_1.SwaggerModule.createDocument(app, prodOptions, {
        include: [products_module_1.ProductsModule]
    });
    swagger_1.SwaggerModule.setup('api/products', app, prodDocument);
    const uOptions = new swagger_1.DocumentBuilder()
        .setTitle('Users api')
        .setDescription('Test users')
        .setVersion('1.0')
        .build();
    const uDocument = swagger_1.SwaggerModule.createDocument(app, uOptions, {
        include: [users_module_1.UsersModule]
    });
    swagger_1.SwaggerModule.setup('/api/users', app, uDocument);
    app.useGlobalFilters(new fallback_filter_1.FallbackExceptionFilter(), new http_filter_1.HttpExceptionFilter(), new validation_filter_1.ValidationFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors) => {
            const messages = errors.map(error => `${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`);
            return new validation_exception_1.ValidationException(messages);
        }
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map