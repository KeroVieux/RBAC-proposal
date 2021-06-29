import path from 'path'
import { Low, JSONFile } from 'lowdb'
import faker from 'faker'
import {nanoid} from 'nanoid'

const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

const arr = Array(20)


const { warnings, announcements, news } = db.data

for (let i of arr) {
  warnings.push({
    id: nanoid(8),
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
  })
  announcements.push({
    id: nanoid(8),
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
  })
  news.push({
    id: nanoid(8),
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
  })
}



await db.write()
