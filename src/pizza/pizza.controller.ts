import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { PizzaService } from './pizza.service'
import { PizzaDto } from './pizza.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('pizza')
export class PizzaController {
	constructor(private readonly pizzaService: PizzaService) {}

	@Get()
	async getAll(
		@Query('sortBy') sortBy: string,
		@Query('ascDesc') ascDesc: string,
		@Query('currentPage') currentPage: string,
		@Query('categoryID') categoryID?: string,
		@Query('search') search?: string,
	) {
		return this.pizzaService.getAll(
			sortBy,
			ascDesc,
			+currentPage,
			+categoryID,
			search,
		)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.pizzaService.getById(+id)
	}

	@Post()
	async createPizza(@Body() dto: PizzaDto) {
		return this.pizzaService.createPizza(dto)
	}

	@Post()
	@UseInterceptors(FileInterceptor('pizzaUrl'))
	async addPizzaImg(@UploadedFile() pizzaUrl, @Param('id') id: string) {
		return this.pizzaService.addPizzaImg(+id, pizzaUrl)
	}

	@Delete(':id')
	async deletePizza(@Param('id') id: string) {
		return this.pizzaService.deletePizza(+id)
	}
}
