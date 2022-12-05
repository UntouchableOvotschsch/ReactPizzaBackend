import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoryDto } from './category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	async getAll() {
		return this.categoriesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.categoriesService.getById(+id)
	}

	@Post()
	async createCategory(@Body() dto: CategoryDto) {
		return this.categoriesService.createCategory(dto)
	}

	@Put(':id')
	async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoriesService.updateCategory(+id, dto)
	}
}
