import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeEntity } from './types.entity'
import { Repository } from 'typeorm'
import { TypesDto } from './types.dto'

@Injectable()
export class TypesService {
	constructor(
		@InjectRepository(TypeEntity)
		private readonly typeRepository: Repository<TypeEntity>,
	) {}
	async getAll() {
		return this.typeRepository.find()
	}

	async getById(id: number) {
		const candidate = await this.typeRepository.findOneBy({
			id,
		})
		if (!candidate) {
			throw new NotFoundException('Не найдено')
		}
		return candidate
	}

	async createType(dto: TypesDto) {
		return this.typeRepository.save(dto)
	}

	async updateType(id: number, dto: TypesDto) {
		const candidate = await this.getById(id)
		if (candidate.title === dto.title) {
			throw new BadRequestException('Значение доложно отличаться')
		}
		candidate.title = dto.title

		return this.typeRepository.save(candidate)
	}
}
