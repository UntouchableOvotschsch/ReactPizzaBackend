import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { CategoryEntity } from '../categories/category.entity'
import { TypeEntity } from '../types/types.entity'
import { SizeEntity } from '../sizes/size.entity'
import { Base } from '../utils/base'

@Entity('pizza')
export class PizzaEntity extends Base {
	@Column()
	title: string

	@Column()
	price: number

	@Column({ default: 0 })
	rating: number

	@Column({ name: 'image_url_path' })
	imageUrl: string

	@Column({ default: true, name: 'is_available' })
	isAvailable: boolean

	@ManyToMany(() => TypeEntity, type => type.pizza, { cascade: true })
	@JoinTable()
	types: TypeEntity[]

	@ManyToMany(() => SizeEntity, size => size.pizza, { cascade: true })
	@JoinTable()
	sizes: SizeEntity[]

	@ManyToOne(() => CategoryEntity, category => category.pizza)
	category: number
}
