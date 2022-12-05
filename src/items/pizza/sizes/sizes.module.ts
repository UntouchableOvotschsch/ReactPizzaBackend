import { Module } from '@nestjs/common'
import { SizesService } from './sizes.service'
import { SizesController } from './sizes.controller'
import { SizeEntity } from './size.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	controllers: [SizesController],
	providers: [SizesService],
	imports: [TypeOrmModule.forFeature([SizeEntity])],
})
export class SizesModule {}
