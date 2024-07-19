import syntaxerror from 'syntax-error';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

const allowedNumbers = [
  '19419318284',
  '6281254653853',
  '6281267452434'
];

let handler = async (m, { conn, usedPrefix, noPrefix, args, groupMetadata }) => {
  try {
    // Check if the sender is allowed
    const senderNumber = m.sender.replace(/[^0-9]/g, '');
    console.log(`Sender: ${senderNumber}`); // Logging the sender for debugging

    if (!allowedNumbers.includes(senderNumber)) {
      console.log('Unauthorized access attempt.'); // Logging unauthorized attempt
      return conn.reply(m.chat, 'You are not allowed to use this command.', m);
    }

    let _return;
    let _syntax = '';
    let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix;
    let old = m.exp * 1;

    console.log(`Executing command: ${_text}`); // Logging the command for debugging

    let exec = new (async () => {}).constructor(
      'print',
      'm',
      'handler',
      'require',
      'conn',
      'Array',
      'process',
      'args',
      'groupMetadata',
      'module',
      'exports',
      'argument',
      _text
    );

    _return = await exec.call(
      conn,
      (...args) => {
        console.log(...args); // Logging the output of the command
        return conn.reply(m.chat, format(...args), m);
      },
      m,
      handler,
      require,
      conn,
      CustomArray,
      process,
      args,
      groupMetadata,
      { exports: {} },
      {},
      [conn, { conn, usedPrefix, noPrefix, args, groupMetadata }]
    );

  } catch (e) {
    let err = syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: 'module'
    });

    if (err) _syntax = '```' + err + '```\n\n';
    console.error(`Error: ${_syntax}`); // Logging syntax errors
    _return = e;
  } finally {
    conn.reply(m.chat, _syntax + format(_return), m);
    m.exp = old;
  }
};

handler.help = ['>', '=>'];
handler.tags = ['owner'];
handler.customPrefix = /^=?> /;
handler.command = /(?:)/i;
handler.rowner = true;

export default handler;

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000));
    else return super(...args);
  }
}