import faker from 'faker'
import {nanoid} from 'nanoid'
import _ from "lodash";
import {newsDB, roleDB, userDB, permissionDB} from './database.js'

const arr = Array(20)
const userRes = await userDB.find({
  selector: {}
})
const roleRes = await roleDB.find({
  selector: {}
})

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
    readRoles: [roleRes.docs[_.random(0, 4)].id],
    writeRoles: [roleRes.docs[_.random(0, 4)].id],
    bannedUsers: [userRes.docs[_.random(0, 19)].id],
  }
  newsDB.post(newsPayload)
  permissionDB.post(permissionPayload)
}

