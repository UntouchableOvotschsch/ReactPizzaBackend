import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from './category.entity'
import { Repository } from 'typeorm'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
	) {}

	async getAll() {
		return this.categoryRepository.find()
	}

	async getById(id: number) {
		const candidate = await this.categoryRepository.findOneBy({
			id,
		})
		if (!candidate) {
			throw new NotFoundException('Не найдено')
		}
		return candidate
	}

	async createCategory(dto: CategoryDto) {
		return this.categoryRepository.save(dto)
	}

	async updateCategory(id: number, dto: CategoryDto) {
		const candidate = await this.getById(id)
		if (candidate.title === dto.title) {
			throw new BadRequestException('Значение доложно отличаться')
		}
		candidate.title = dto.title

		return this.categoryRepository.save(candidate)
	}
}
