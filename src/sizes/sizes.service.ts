import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SizeEntity } from './size.entity'
import { Repository } from 'typeorm'
import { SizesDto } from './sizes.dto'

@Injectable()
export class SizesService {
	constructor(
		@InjectRepository(SizeEntity)
		private readonly sizeRepository: Repository<SizeEntity>,
	) {}

	async getAll() {
		return this.sizeRepository.find()
	}

	async getById(id: number) {
		const candidate = await this.sizeRepository.findOneBy({
			id,
		})
		if (!candidate) {
			throw new NotFoundException('Не найдено')
		}
		return candidate
	}

	async createSize(dto: SizesDto) {
		return this.sizeRepository.save(dto)
	}

	async updateSize(id: number, dto: SizesDto) {
		const candidate = await this.getById(id)
		if (candidate.title === dto.title) {
			throw new BadRequestException('Значение доложно отличаться')
		}
		candidate.title = dto.title

		return this.sizeRepository.save(candidate)
	}
}
