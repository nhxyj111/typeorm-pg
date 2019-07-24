import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm'
import { PhotoMetadata } from './PhotoMetadata'
import { Author } from './Author'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column('text')
  description: string

  @Column()
  filename: string

  @Column('bigint')
  views: number

  @Column()
  isPublished: boolean

  @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadata

  @ManyToOne(type => Author, author => author.photos)
  author: Author
}
