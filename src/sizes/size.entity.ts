import { Column, Entity, ManyToMany } from 'typeorm'
import { PizzaEntity } from '../pizza/pizza.entity'
import { Base } from '../utils/base'

@Entity('size')
export class SizeEntity extends Base {
	@Column()
	title: number

	@ManyToMany(() => PizzaEntity, pizza => pizza.sizes)
	pizza: PizzaEntity[]
}
