import { Column, Entity, OneToMany } from 'typeorm'
import { PizzaEntity } from '../pizza/pizza.entity'
import { Base } from '../../../utils/base'

@Entity('category')
export class CategoryEntity extends Base {
	@Column()
	title: string

	@OneToMany(() => PizzaEntity, pizza => pizza.category)
	pizza: PizzaEntity[]
}
