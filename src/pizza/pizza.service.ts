import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PizzaEntity } from './pizza.entity'
import { Repository } from 'typeorm'
import { PizzaDto } from './pizza.dto'
import { FilesService } from '../files/files.service'
import { TypeEntity } from '../types/types.entity'

@Injectable()
export class PizzaService {
	constructor(
		@InjectRepository(PizzaEntity)
		private readonly pizzaRepository: Repository<PizzaEntity>,
		@InjectRepository(TypeEntity)
		private readonly typeRepository: Repository<TypeEntity>,
		private fileService: FilesService,
	) {}

	async getAll() {
		return this.pizzaRepository.find()
	}

	async createPizza(dto: PizzaDto, pizzaUrl) {
		const oldPizza = await this.pizzaRepository.findOneBy({ title: dto.title })
		if (oldPizza) {
			throw new BadRequestException('Такая пицца уже существует')
		}
		if (!pizzaUrl) {
			throw new BadRequestException('Добавьте изображение')
		}

		const urlNamePath = this.fileService.createFiles(pizzaUrl)

		const type1 = new TypeEntity()
		type1.title = 'Какой то тип1'

		const type2 = new TypeEntity()
		type2.title = 'Какой то тип2'

		const newPizza = this.pizzaRepository.create({
			title: dto.title,
			price: dto.price,
			imageUrl: urlNamePath,
			isAvailable: dto.isAvailable,
			types: dto.types,
			sizes: dto.sizes,
			category: dto.category,
		})
		return await this.pizzaRepository.save(newPizza)
	}

	async getById(id: number) {
		const candidate = await this.pizzaRepository.findOneBy({ id })
		if (!candidate) {
			throw new BadRequestException('Не найдено')
		}
		return candidate
	}

	async updatePizza(id: number, dto: PizzaDto) {
		const pizza = await this.getById(id)

		return this.pizzaRepository.save({
			...pizza,
			...dto,
		})
	}
}
