import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'api-nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Reconoce todos los archivos .entity.ts y .entity.js sin necesidad de agregarlos uno por uno.
      synchronize: true, // 📌 Solo para desarrollo, crea la tabla automáticamente.
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}