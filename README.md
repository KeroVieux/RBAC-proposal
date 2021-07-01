# An RBAC proposal in a simple way
> Role-based access control (RBAC) is a policy-neutral access-control mechanism defined around roles and privileges.
> Further reading: [https://en.wikipedia.org/wiki/Role-based_access_control](https://en.wikipedia.org/wiki/Role-based_access_control) && [https://zhuanlan.zhihu.com/p/63769951](https://zhuanlan.zhihu.com/p/63769951)

Even large information shows on the internet to tell people what the RBAC is. However, it still makes people feel difficult to understand it and use it in practice.  
The concept is clear. The RBAC method enables you to control the permission of the data to show to different roles of users. For instance, people in different departments can read different announcements. In this case, how to set the permission for each announcement?  
Following the RBAC concept, I developed a demo to show you how to use it in a simple situation, including database setting, initial data and querying the data.  

## How to run this demo
1. `npm i` to install dependencies
2. `node generateRoles.mjs` to generate roles
3. `node generateUsers.mjs` to generate users
4. `node generateContent.mjs` to generate news and permissions
5. `node index.mjs` to check the result
6. Go into the index.mjs to see more details

## In this demo what you can get
### Database setting
![http://dogeapp.cn:9070/images/2021/06/30/5ffb7b839b1a97dbe62eeda936f0dd7e.jpg](http://dogeapp.cn:9070/images/2021/06/30/5ffb7b839b1a97dbe62eeda936f0dd7e.jpg)

### Querying the right news
1. Get the user info.
2. Get the user's read access for news. Here, you need to filter permissions that have the user's roles in its reaRoles filed && the user is not in the bannedUser list.
3. Get news which the user has the right to read
4. In an extra function, it uses the fuse.js to do the search work.

## Limits
It is a demo for the RBAC concept, when you understand it, then you can design your own proposal.
It uses the pouchDB to get the data, in your case, you should shift it to your database or RESTful to query the data.
