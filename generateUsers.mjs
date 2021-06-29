import path from 'path'
import { Low, JSONFile } from 'lowdb'
import _ from 'lodash'
import faker from 'faker'
import {nanoid} from 'nanoid'

const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

const arr = Array(20)
const groups = ['Admin', 'HQ', 'Production', 'Design', 'Development']


const { users } = db.data

for (let i of arr) {
  users.push({
    id: nanoid(8),
    name: faker.name.findName(),
    groups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
  })
}



await db.write()
