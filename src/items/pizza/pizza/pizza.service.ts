import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PizzaEntity } from './pizza.entity'
import { FindOptionsWhereProperty, ILike, In, Repository } from 'typeorm'
import { PizzaDto } from './pizza.dto'
import { FilesService } from '../../../files/files.service'
import { TypeEntity } from '../types/types.entity'
import { SizeEntity } from '../sizes/size.entity'
import { CategoryEntity } from '../categories/category.entity'

@Injectable()
export class PizzaService {
	constructor(
		@InjectRepository(PizzaEntity)
		private readonly pizzaRepository: Repository<PizzaEntity>,
		@InjectRepository(TypeEntity)
		private readonly typeRepository: Repository<TypeEntity>,
		@InjectRepository(SizeEntity)
		private readonly sizeRepository: Repository<SizeEntity>,
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
		private fileService: FilesService,
	) {}

	async getAll(
		sortBy: string,
		ascDesc: string,
		currentPage?: number,
		limit?: number,
		categoryID?: number,
		search?: string,
	) {
		let options: FindOptionsWhereProperty<PizzaEntity> = {}
		let orderOptions = {}

		currentPage = currentPage || 1
		limit = limit || 8
		const offset = limit * currentPage - limit
		if (categoryID) {
			const category = await this.categoryRepository.findOneBy({
				id: categoryID,
			})
			if (!category) {
				throw new BadRequestException('Категория не найдена')
			}
			options = {
				category: { id: categoryID },
			}
		}
		if (search) {
			options = {
				title: ILike(`%${search}%`),
			}
		}
		if (sortBy === 'title') {
			orderOptions = {
				title: ascDesc.toUpperCase(),
			}
		}
		if (sortBy === 'price') {
			orderOptions = {
				price: ascDesc.toUpperCase(),
			}
		}
		if (sortBy === 'rating') {
			orderOptions = {
				rating: ascDesc.toUpperCase(),
			}
		}
		return await this.pizzaRepository.find({
			relations: {
				types: true,
				sizes: true,
			},
			where: {
				...options,
			},
			take: limit,
			skip: offset,
			order: {
				...orderOptions,
			},
		})
	}

	async createPizza(dto: PizzaDto) {
		const oldPizza = await this.pizzaRepository.findOneBy({ title: dto.title })
		if (oldPizza) {
			throw new BadRequestException('Такая пицца уже существует')
		}

		const types = await this.typeRepository.findBy({
			id: In(dto.types),
		})

		const sizes = await this.sizeRepository.findBy({ id: In(dto.sizes) })
		const category = await this.categoryRepository.findOneBy({
			id: dto.category,
		})

		const newPizza = this.pizzaRepository.create({
			title: dto.title,
			price: dto.price,
			isAvailable: dto.isAvailable,
			types: types,
			sizes: sizes,
			category: category,
			imageUrl: '',
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

	async addPizzaImg(id: number, pizzaImage) {
		const pizza = await this.pizzaRepository.findOneBy({ id })
		pizza.imageUrl = this.fileService.createFiles(pizzaImage, 'pizza')
		return await this.pizzaRepository.save(pizza)
	}

	// async updatePizza(id: number, dto: PizzaDto) {
	// 	const pizza = await this.getById(id)
	//
	// 	return this.pizzaRepository.save({
	// 		...pizza,
	// 		...dto,
	// 	})
	// }

	async deletePizza(id: number) {
		const pizza = await this.pizzaRepository.findOneBy({ id })
		await this.fileService.removeFile(pizza.imageUrl, 'pizza')
		await this.pizzaRepository.delete({ id: id })
		return `Пицца ${pizza.title} успешно удалена`
	}

}
