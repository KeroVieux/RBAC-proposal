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

// Get the user's read access for news
const readNewsAccessRes = db.chain.get('permission').filter((i) => {
  let hasPermission = false
  // Filtering permissions which have the user's roles in its reaRoles filed && the user is not in the bannedUser list
  _.forEach(i.readRoles,(item) => {
    hasPermission = _.includes(oneUser.roles, item) && !_.includes(item.bannedUsers, oneUser.id)
  })
  return hasPermission
}).value()

console.log(readNewsAccessRes.length)


// Get news which the user has the right to read
const readNewsRes = db.chain.get('news').filter((i) => {
  return _.includes(_.map(readNewsAccessRes, (item) => {
    return item.target
  }), i.id)
}).value()

console.log('readNewsRes', readNewsRes.length)

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

console.log('searchRes', searchRes.length)
