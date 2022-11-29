import { Module } from '@nestjs/common'
import { TypesService } from './types.service'
import { TypesController } from './types.controller'
import { TypeEntity } from './types.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	controllers: [TypesController],
	providers: [TypesService],
	imports: [TypeOrmModule.forFeature([TypeEntity])],
})
export class TypesModule {}
