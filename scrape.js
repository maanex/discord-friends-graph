
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

  const u = (await fetchUser(user))
  if (!u || !u.length) return
  const rels = u.filter(u => (!u.type || u.type === 1))
  queue.push(...rels.map(u => u.id))
  out.push(`${user},${rels.map(r => r.id).join(',')}`)

  for (const rel of rels) {
    if (!mappings.has(rel.id))
      mappings.set(rel.id, rel)
  }
}

async function fetchUser(id) {
  const { data } = await require('axios').get(`https://canary.discord.com/api/v9/users/${id}/relationships`, {
    headers: {
      authorization: token,
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-GB',
      referer: 'https://canary.discord.com/channels/@me',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.43 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36',
      'x-discord-locale': 'en-GB'
    }
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
