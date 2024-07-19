export function before(m) {
    if (m.isBaileys) return;
    if (!m.text) return;

    let user = global.db.data.users[m.sender];
    if (user.afk > -1 && m.sender !== '6289669153011@s.whatsapp.net' && m.sender !== '62895415027181@s.whatsapp.net') {
        m.reply(`
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${(new Date - user.afk).toTimeString()}
`.trim());
        user.afk = -1;
        user.afkReason = '';
    }

    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    for (let jid of jids) {
        let user = global.db.data.users[jid];
        if (!user) continue;

        let afkTime = user.afk;
        if (!afkTime || afkTime < 0) continue;

        let reason = /wa.me\/settings/i.exec(user.afkReason) ? '#HIDDEN#' : user.afkReason || '';
        m.reply(`
Dia sedang AFK ${reason ? 'dengan alasan :\n*' + reason : 'tanpa alasan'}*\n
Selama : *${(new Date - afkTime).toTimeString()}*
`.trim());
    }
    return true;
}