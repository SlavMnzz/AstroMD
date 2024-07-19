import fetch from "node-fetch"
const tfinventory = {
  others: {
    money: true,
  },
  tfitems: {
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
  },
  tfcrates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
    
  },
  tfpets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
  }
}
const rewards = {
    common: {
        money: 282,
        trash: 111,
        potion: [0, 1, 10, 1, 9, 0, 80, 3, 20],
        common: [0, 1, 0, 1, 80, 40, 0, 80, 50, 0],
        uncommon: [0, 1, 10, 10, 50, 0, 10, 0, 10, 10, 20, 0]
    },
    uncommon: {
        money: 20111,
        trash: 3111,
        potion: [99, 1, 0, 10, 2, 0, 90, 80],
        diamond: [0, 0, 0, 1, 290, 0, 39, 0, 0, 29, 1, 10, 10, 0, 0, 0, 80, 0, 70, 40, 90],
        common: [0, 1, 10, 10, 10, 0, 0, 0, 50],
        uncommon: [0, 1, 0, 90, 3, 0, 20, 50, 0, 50, 0],
        mythic: [0, 1, 70, 0, 10, 0, 80, 90, 9, 0, 80, 5, 50, 0],
        wood: [60, 61, 60, 60, 0, 0],
        rock: [0, 61, 60, 60, 9, 90],
        string: [80, 81, 80, 80, 80, 0]
    },
    mythic: {
        money: 900,
        exp: 5000,
        trash: 961,
        potion: [90, 91, 90, 90, 90, 0],
        emerald: [0, 1, 90, 90, 0, 90, 90, 90, 90, 9, 90, 0, 0],
        diamond: [90, 1, 90, 0, 1, 90, 0, 91, 90, 9, 0, 0],
        gold: [0, 1, 80, 80, 90, 0, 71, 0, 0],
        iron: [80, 1, 5, 70, 70, 70, 0, 90],
        common: [0, 1, 0, 0, 0, 1],
        uncommon: [80, 1, 0, 75, 75, 75, 75, 1],
        mythic: [75, 1, 75, 75, 75, 75, 1, 0, 0, 0],
        legendary: [75, 1, 75, 75, 75, 1, 75, 75, 0, 75, 1, 75, 0],
        pet: [75, 1, 75, 75, 75, 75, 1, 75, 0, 0, 1],
        wood: [75, 1, 75, 75, 75],
        rock: [75, 1, 75, 75, 75],
        string: [75, 1, 75, 75, 75]
    },
    legendary: {
        money: 4751,
        exp: 575,
        trash: 1751,
        potion: [75, 1, 75, 71, 71],
        emerald: [71, 71, 71, 7, 7, 7 ,92, 92, 1, 92],
        diamond: [1, 92, 92, 1, 92, 92, 1, 9, 9, 1],
        gold: [9, 1, 9, 1, 90, 90, 90, 1],
        iron: [90, 1, 29, 29, 29, 29, 1],
        common: [29, 1, 29, 1],
        uncommon: [29, 1, 29, 29, 29, 1],
        mythic: [29, 1, 22, 22, 1, 22, 1, 50, 50],
        legendary: [1, 50, 50, 50, 1, 50, 50, 50, 50, 1],
        pet: [50, 1, 50, 50, 50, 50, 1, 50, 50, 1],
        wood: [50, 1, 50, 1],
        rock: [50, 1, 50, 1],
        string: [50, 1, 50, 1]
    },
}
let handler = async (m, { command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    const tfcrates = Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
    let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
    let info = `🧑🏻‍🏫 ᴜsᴇʀ: *${user.registered ? user.name : conn.getName(m.sender)}*

🔖 ᴄʀᴀᴛᴇ ʟɪsᴛ :
${Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}
––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴏᴩᴇɴ ᴄʀᴀᴛᴇ:
${usedPrefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}open mythic 3
`.trim()
    let type = (args[0] || '').toLowerCase()
    let imgr = flaaa.getRandom()
    let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), 500000) : 1) * 1
    if (!(type in listCrate)) return await conn.reply(m.chat, info, m, {
        contextInfo: {
            externalAdReply : {
                showAdAttribution: true,
                mediaType: 1,
                title: '',
                thumbnail: await(await fetch(imgr + 'Open Crate')).buffer(),
                renderLargerThumbnail: true,
                mediaUrl: hwaifu.getRandom(),
                sourceId: wm,
                sourceUrl: ''
   	        }
 	    }
   })
    if (user[type] < count) return m.reply(`
Your *${rpg.emoticon(type)}${type} crate* is not enough!, you only have ${user[type]} *${rpg.emoticon(type)}${type} crate*
type *${usedPrefix}buy ${type} ${count - user[type]}* to buy
`.trim())
    // TODO: add pet crate
    // if (type !== 'pet')
    let crateReward = {}
    for (let i = 0; i < count; i++)
        for (let [reward, value] of Object.entries(listCrate[type]))
            if (reward in user) {
                const total = value.getRandom()
                if (total) {
                    user[reward] += total * 1
                    crateReward[reward] = (crateReward[reward] || 0) + (total * 1)
                }
            }
    user[type] -= count * 1
    m.reply(`
You have opened *${count}* ${global.rpg.emoticon(type)}${type} crate and got:
${Object.keys(crateReward).filter(v => v && crateReward[v] && !/hai/i.test(v)).map(reward => `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()).join('\n')}
`.trim())
    
}
handler.help = ['open'].map(v => v + ' [crate] [count]')
handler.tags = ['rpg']
handler.command = /^(open|buka|gacha)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}