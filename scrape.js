
const token = process.argv[2]
if (!token) throw 'Please provide a user-token!'

const startingPoints = [ '@me' ]

//

const processed = new Set()
const queue = []
const out = []
const mappings = new Map()

async function analyze(user) {
  if (processed.has(user)) return
  processed.add(user)
  console.log('-> ' + user)

  const rels = (await fetchUser(user)).filter(u => (!u.type || u.type === 1))
  queue.push(...rels.map(u => u.id))
  out.push(`${user},${rels.map(r => r.id).join(',')}`)

  for (const rel of rels) {
    if (!mappings.has(rel.id))
      mappings.set(rel.id, rel)
  }
}

async function fetchUser(id) {
  const { data } = await require('axios').get(`https://canary.discord.com/api/v9/users/${id}/relationships`, {
    headers: { Authorization: token }
  })
  return data
}

//

async function start() {
  queue.push(...startingPoints)
  while (queue.length)
    await analyze(queue.splice(0, 1)[0])
  require('fs').writeFileSync('./out.csv', out.join('\n'))

  const outmap = [...mappings.entries()]
    .map(([k, v]) => `${k},${v.user.username},${v.user.avatar}`)
    .join('\n')
  require('fs').writeFileSync('./out-mappings.csv', outmap)
}
start()
