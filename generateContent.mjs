import path from 'path'
import { Low, JSONFile } from 'lowdb'
import faker from 'faker'
import {nanoid} from 'nanoid'
import _ from "lodash";

const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

const arr = Array(20)


const { news, users, roles, permission } = db.data

for (let i of arr) {
  const newsId = nanoid(8)
  const permissionId = nanoid(8)
  const newsPayload = {
    id: newsId,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    permission: permissionId,
  }
  const permissionPayload = {
    id: permissionId,
    target: newsPayload.id,
    tableName: 'news',
    readRoles: [roles[_.random(0, 4)].id],
    writeRoles: [roles[_.random(0, 4)].id],
    bannedUsers: [users[_.random(0, 19)].id],
  }
  news.push(newsPayload)
  permission.push(permissionPayload)
}

await db.write()
