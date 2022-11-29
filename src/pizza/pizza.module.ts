import { Module } from '@nestjs/common'
import { PizzaService } from './pizza.service'
import { PizzaController } from './pizza.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PizzaEntity } from './pizza.entity'
import { FilesService } from '../files/files.service'
import { TypeEntity } from '../types/types.entity'

@Module({
	controllers: [PizzaController],
	providers: [PizzaService, FilesService],
	imports: [TypeOrmModule.forFeature([PizzaEntity, TypeEntity])],
})
export class PizzaModule {}
