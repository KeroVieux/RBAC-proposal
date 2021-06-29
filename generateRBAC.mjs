import path from 'path'
import { Low, JSONFile } from 'lowdb'
import _ from 'lodash'
import {nanoid} from 'nanoid'

const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

const groups = ['Admin', 'HQ', 'Production', 'Design', 'Development']


const { rbac, users, warnings, announcements, news } = db.data

for (const i of warnings) {
  rbac.push({
    id: nanoid(8),
    targetId: i.id,
    tableName: 'news',
    readGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    writeGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    bannedUsers: [users[_.random(0, 10)].id ,users[_.random(11, 19)].id],
  })
}
for (const i of announcements) {
  rbac.push({
    id: nanoid(8),
    targetId: i.id,
    tableName: 'news',
    readGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    writeGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    bannedUsers: [users[_.random(0, 10)].id ,users[_.random(11, 19)].id],
  })
}
for (const i of news) {
  rbac.push({
    id: nanoid(8),
    targetId: i.id,
    tableName: 'news',
    readGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    writeGroups: [groups[_.random(0, 2)], groups[_.random(3, 4)]],
    bannedUsers: [users[_.random(0, 10)].id ,users[_.random(11, 19)].id],
  })
}


await db.write()
