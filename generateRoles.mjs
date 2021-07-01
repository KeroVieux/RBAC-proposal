import {nanoid} from 'nanoid'
import {roleDB} from './database.js'

const roleNames = ['Admin', 'HQ', 'Production', 'Design', 'Development']


for (const i of roleNames) {
  roleDB.post({
    id: nanoid(8),
    name: i,
  })
}



