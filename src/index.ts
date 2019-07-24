import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'

createConnection()
  .then(async connection => {
    // create photo object
    let photo = new Photo()
    photo.name = 'Me and Bears ---2'
    photo.description = 'I am near polar bears'
    photo.filename = 'photo-with-bears.jpg'
    photo.isPublished = true

    // create photo metadata object
    let metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = 'cybershoot ---2'
    metadata.orientation = 'portait'

    photo.metadata = metadata // this way we connect them

    // get repository
    let photoRepository = connection.getRepository(Photo)

    // saving a photo also save the metadata
    await photoRepository.save(photo)

    console.log('Photo is saved, photo metadata is saved too.')
  })
  .catch(error => console.log(error))
