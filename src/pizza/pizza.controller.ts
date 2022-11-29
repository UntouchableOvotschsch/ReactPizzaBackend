import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { PizzaService } from './pizza.service'
import { PizzaDto } from './pizza.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('pizza')
export class PizzaController {
	constructor(private readonly pizzaService: PizzaService) {}

	@Get()
	async getAll() {
		return this.pizzaService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.pizzaService.getById(+id)
	}

	@Post()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'pizzaUrl', maxCount: 1 }]))
	async createPizza(@UploadedFiles() files, @Body() dto: PizzaDto) {
		return this.pizzaService.createPizza(dto, files.pizzaUrl[0])
	}
}
