import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'
import { Author } from './entity/Author'

createConnection()
  .then(async connection => {
    let photoRepository = connection.getRepository(Photo)
    let authorRepository = connection.getRepository(Author)

    // create photo object
    let photo = new Photo()
    photo.name = 'Me and Bears 123123'
    photo.description = 'I am near polar bears'
    photo.filename = 'photo-with-bears.jpg'
    photo.isPublished = true
    photo.views = 2

    // create photo metadata object
    let metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = 'cybershoot -asd--2'
    metadata.orientation = 'portait'

    photo.metadata = metadata // this way we connect them

    let author = new Author()
    author.name = 'xu'
    await authorRepository.save(author)

    photo.author = author

    // get repository

    // saving a photo also save the metadata
    await photoRepository.save(photo)

    console.log('Photo is saved, photo metadata is saved too.')
  })
  .catch(error => console.log(error))
