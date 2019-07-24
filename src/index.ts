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

    let photos = await connection
      .getRepository(Photo)
      .createQueryBuilder('photo') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .leftJoinAndSelect('photo.albums', 'album')
      .where('photo.isPublished = true')
      .andWhere('(photo.name = :photoName OR photo.name = :bearName)')
      .orderBy('photo.id', 'DESC')
      .skip(5)
      .take(10)
      .setParameters({ photoName: 'My', bearName: 'Mishka' })
      .getMany()
  })
  .catch(error => console.log(error))
