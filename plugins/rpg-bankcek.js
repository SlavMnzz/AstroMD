import fs from "fs"

let handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    
    // Cek jika nomor yang disebutkan adalah 6281254653853 dan jika pengguna bukan diri sendiri
    if (who === '6281254653853@s.whatsapp.net' && who !== m.sender) {
        return m.reply(`Kamu tidak diizinkan untuk mengecek informasi bank dari pengguna ini`)
    }
    
    if (!(who in global.db.data.users)) return m.reply(`User ${who} tidak ada di database`)
    let user = global.db.data.users[who]
    let status = ''
    if (user.chip >= 100000000000 && user.chip < 10000000000000) {
        status = 'Stat Newbie Chip 🪖'
    } else if (user.chip >= 10000000000000 && user.chip < 1000000000000000) {
        status = 'Veteran of Chip 🪖'
    } else if (user.chip >= 1000000000000000 && user.chip < 100000000000000000) {
        status = 'Master of Chip 🔥'
    } else if (user.chip >= 100000000000000000 && user.chip < 1000000000000000000) {
        status = 'Divine of Chip ⚔️🌟'
    } else if (user.chip >= 1000000000000000000 && user.chip < 100000000000000000000) {
        status = 'Immortal of Chip 🏆✨'
    } else if (user.chip >= 100000000000000000000) {
        status = 'The Supreme of Chip Stats 🌟👑🔥'
    } else {
        status = who.split`@`[0] == info.nomorown ? 'The Owners 👑' : user.registered ? 'User Biasa' : 'Masih Pemula 🚼'
    }
    const caption = `
 *INFO BANK*
 
┌  ◦  *👤 Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│  ◦  *${rpg.emoticon('bank')} Bank:* ${user.bank} 💲
│  ◦  *${rpg.emoticon('money')} Money:* ${user.money} 💲
│  ◦  *${rpg.emoticon('chip')} Chip:* ${user.chip} 💱
│  ◦  *🤖 Robo:* ${user.robo > 0 ? 'Level ' + user.robo : '✖️'}
│  ◦  *🌟 Status:* ${status}
└  ◦  *📑 Registered:* ${user.registered ? 'Yes' : 'No'}\n\n\n*ᴀsᴛʀᴏʙᴏᴛ - ᴅᴄᴏᴅᴇᴊsᴍɴᴢᴢᴢ*
`.trim()
    await conn.adReply(m.chat, caption, 'ʏ ᴏ ᴜ ʀ - ʙ ᴀ ɴ ᴋ - ɪ ɴ ғ ᴏ', '', fs.readFileSync('./media/bank.jpg'), '', m)
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^bank$/i

handler.register = true
handler.group = true
handler.rpg = true

export default handler