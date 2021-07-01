import _ from 'lodash'
import faker from 'faker'
import {roleDB, userDB} from './database.js'
import {nanoid} from "nanoid";

const arr = Array(20)

const {docs} = await roleDB.find({
  selector: {}
})
console.log(docs)
for (let i of arr) {
  userDB.post({
    id: nanoid(8),
    name: faker.name.findName(),
    roles: [docs[_.random(0, 4)].id],
  })
}



