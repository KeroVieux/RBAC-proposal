import _ from 'lodash'
import Fuse from 'fuse.js'
import {userDB, newsDB, permissionDB} from './database.js'

// Get the user info
const userRes = await userDB.find({
  selector: {},
  limit: 1,
  skip: _.random(0, 19)
})
const oneUser = userRes.docs[0]
console.log('oneUser', oneUser)

// Get the user's read access for news
const readNewsAccessRes = await permissionDB.find({
  selector: {
    $and: [
      {
        readRoles: {
          $in: oneUser.roles
        }
      },
      {
        bannedUsers: {
          $nin: [oneUser.id]
        }
      }
    ]
  }
})

console.log('readNewsAccessRes', readNewsAccessRes.docs.length)


// Get news which the user has the right to read
const readNewsRes = await newsDB.find({
  selector: {
    id: {
      $in: _.map(readNewsAccessRes.docs, (i) => {
        return i.target
      })
    }
  },
})

console.log('readNewsRes', readNewsRes.docs.length)

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

const fuse = new Fuse(readNewsRes.docs, options)

const pattern = 'porro'
const searchRes = fuse.search(pattern)

console.log('searchRes', searchRes.length)
