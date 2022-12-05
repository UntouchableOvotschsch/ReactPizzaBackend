import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
} from 'typeorm'
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
	@JoinTable({
		name: 'type_pizza',
		joinColumn: { name: 'pizza_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'type_id', referencedColumnName: 'id' },
	})
	types: TypeEntity[]

	@ManyToMany(() => SizeEntity, size => size.pizza, { cascade: true })
	@JoinTable({
		name: 'size_pizza',
		joinColumn: { name: 'pizza_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'size_id', referencedColumnName: 'id' },
	})
	sizes: SizeEntity[]

	@ManyToOne(() => CategoryEntity, category => category.pizza)
	@JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
	category: CategoryEntity
}
