import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { PizzaEntity } from '../pizza/pizza.entity'
import { Base } from '../utils/base'

@Entity('category')
export class CategoryEntity extends Base {
	@Column()
	title: string

	@OneToMany(() => PizzaEntity, pizza => pizza.category)
	@JoinColumn({ name: 'pizza_id' })
	pizza: PizzaEntity[]
}
