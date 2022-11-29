import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { SizesService } from './sizes.service'
import { SizesDto } from './sizes.dto'

@Controller('sizes')
export class SizesController {
	constructor(private readonly sizesService: SizesService) {}

	@Get()
	async getAll() {
		return this.sizesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.sizesService.getById(+id)
	}

	@Post()
	async createSize(@Body() dto: SizesDto) {
		return this.sizesService.createSize(dto)
	}

	@Put(':id')
	async updateSize(@Param('id') id: string, @Body() dto: SizesDto) {
		return this.sizesService.updateSize(+id, dto)
	}
}
