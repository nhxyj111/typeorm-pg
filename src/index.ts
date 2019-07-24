import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'
import { Author } from './entity/Author'
import { Album } from './entity/Album'

createConnection()
  .then(async connection => {
    let photoRepository = connection.getRepository(Photo)
    let albumRepository = connection.getRepository(Album)

    // create a few albums
    let album1 = new Album()
    album1.name = 'Bears'
    await albumRepository.save(album1)

    let album2 = new Album()
    album2.name = 'Me'
    await albumRepository.save(album2)

    let photo = await photoRepository.findOne(1)
    photo.albums = [album1, album2]

    await photoRepository.save(photo)

    console.log(await photoRepository.findOne(1, { relations: ['albums'] }))
  })
  .catch(error => console.log(error))
