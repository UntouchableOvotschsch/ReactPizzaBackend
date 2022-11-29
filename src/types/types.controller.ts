import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { TypesService } from './types.service'
import { TypesDto } from './types.dto'

@Controller('types')
export class TypesController {
	constructor(private readonly typesService: TypesService) {}
	@Get()
	async getAll() {
		return this.typesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.typesService.getById(+id)
	}

	@Post()
	async createType(@Body() dto: TypesDto) {
		return this.typesService.createType(dto)
	}

	@Put(':id')
	async updateType(@Param('id') id: string, @Body() dto: TypesDto) {
		return this.typesService.updateType(+id, dto)
	}
}
