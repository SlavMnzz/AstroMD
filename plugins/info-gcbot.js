let handler = async (m, { conn }) => {
conn.reply(m.chat, `_List Group AstroBOT MD_

GC¹ AstroBot
${link.gc}

GC² AstroBot
https://chat.whatsapp.com/LhYsYJPwf8z3FvFnF3CItU
`, m)
}
handler.help = ['gcbot']
handler.tags = ['info']
handler.command = /^gcbot$/i

export default handler 
