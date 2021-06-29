import path from 'path'
import { Low, JSONFile } from 'lowdb'
import _ from 'lodash'
import Fuse from 'fuse.js'

const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

db.chain = _.chain(db.data)

// Get the user info
const users = db.chain.get('users').value()
const oneUser = users[_.random(0, 19)]

// Get the user's access for news
const readNewsAccessRes = db.chain.get('rbac').filter((i) => {
  let isTure = false
  _.forEach(i.readGroups,(item) => {
    isTure = _.includes(oneUser.groups, item)
  })
  return isTure
}).value()

// Get news which are accessed
const readNewsRes = db.chain.get('news').filter((i) => {
  return _.includes(_.map(readNewsAccessRes, (item) => {
    return item.targetId
  }), i.id)
}).value()

console.log(readNewsRes)

// Search the fuzzy text in the targets
const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: [
    'title',
    'content',
    'author.firstName'
  ]
}

const fuse = new Fuse(readNewsRes, options)

const pattern = 'porro'
const searchRes = fuse.search(pattern)

console.log(searchRes)
