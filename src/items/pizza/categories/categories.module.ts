import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { CategoryEntity } from './category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoriesModule {}
