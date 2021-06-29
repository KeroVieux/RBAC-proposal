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
const roleNames = ['Admin', 'HQ', 'Production', 'Design', 'Development']


const { users, roles } = db.data

for (const i of roleNames) {
  roles.push({
    id: nanoid(8),
    name: i,
  })
}

for (let i of arr) {
  users.push({
    id: nanoid(8),
    name: faker.name.findName(),
    roles: [roles[_.random(0, 4)].id],
  })
}



await db.write()
