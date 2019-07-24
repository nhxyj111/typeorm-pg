import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'

createConnection()
  .then(async connection => {
    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await connection.manager.save(user)
    // console.log('Saved a new user with id: ' + user.id)

    // console.log('Loading users from the database...')
    const users = await connection.manager.find(User)
    // console.log('Loaded users: ', users)

    // console.log('Here you can setup and run express/koa/any other framework.')

    let photo = new Photo()
    photo.name = 'Me and Bears 2-2 '
    photo.description = 'I am near polar bears'
    photo.filename = 'photo-with-bears.jpg'
    photo.views = 1
    photo.isPublished = true

    // create a photo metadata
    let metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = 'cybershoot'
    metadata.orientation = 'portait'
    metadata.photo = photo // this way we connect them

    let photoRepository = connection.getRepository(Photo)
    let metadataRepository = connection.getRepository(PhotoMetadata)

    await photoRepository.save(photo)
    await metadataRepository.save(metadata)

    let photos = await photoRepository.find({ relations: ['metadata'] })
    console.log(photos)
    // console.log('Photo has been saved')

    // let savedPhotos = await photoRepository.find()
    // console.log('All photos from the db: ', savedPhotos)

    // let [allPhotos, photosCount] = await photoRepository.findAndCount()
    // console.log('All photos: ', allPhotos)
    // console.log('Photos count: ', photosCount)
  })
  .catch(error => console.log(error))
