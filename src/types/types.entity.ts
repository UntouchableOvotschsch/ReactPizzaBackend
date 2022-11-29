import { Column, Entity, ManyToMany } from 'typeorm'
import { PizzaEntity } from '../pizza/pizza.entity'
import { Base } from '../utils/base'

@Entity('type')
export class TypeEntity extends Base {
	@Column()
	title: string

	@ManyToMany(() => PizzaEntity, pizza => pizza.types)
	pizza: PizzaEntity[]
}
