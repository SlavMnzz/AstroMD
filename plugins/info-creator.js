function handler(m) {
  
  const kontak = {
	"displayName": 'Owners Bot',
	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: X F ì r m á n ź x x x\nitem1.TEL;waid=62857059457518:62857059457518\nitem1.X-ABLabel:\nJangan Spam Kak\nURL;Email Owner:https://leonmd.carrd.co\nORG: INI OWNER\nEND:VCARD`
}

conn.sendMessage(m.chat, { contacts: { contacts: [kontak] }}, { quoted: m })
  
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler