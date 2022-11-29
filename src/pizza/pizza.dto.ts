import { TypeEntity } from '../types/types.entity'
import { SizeEntity } from '../sizes/size.entity'

export class PizzaDto {
	title: string

	price: number

	isAvailable: boolean

	types: TypeEntity[]

	sizes: SizeEntity[]

	category: number
}
