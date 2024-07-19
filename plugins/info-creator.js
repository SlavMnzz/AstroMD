function handler(m) {
  
  const kontak = {
	"displayName": 'My owner',
	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: VynaaChan\nitem1.TEL;waid=19419318284:19419318284\nitem1.X-ABLabel:\nChat yang sopan!\nURL;Email Owner:jstmanzz@grassdev.id\nORG: INI OWNER BUKAN BOT\nEND:VCARD`
}

conn.sendMessage(m.chat, { contacts: { contacts: [kontak] }}, { quoted: m })
  
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler