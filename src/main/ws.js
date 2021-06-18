const WebSocket = require('ws');
const moment = require('moment');

const wss = new WebSocket.Server({
  host: '192.168.1.100',
  // 其他端口无效
  port: 7788,
});

wss.on('listening', () => {
  console.log('listening');
});

wss.on('headers', () => {
  console.log('headers');
});

wss.on('error', () => {
  console.log('error');
});

wss.on('close', () => {
  console.log('close');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if (message.indexOf('getdevlock') > -1) {
      return console.log('纯数据：', message)
    }

    let data = JSON.parse(message);

    console.log('received: ', data);

    if (data.ret === 'getalllog') {
      if (data.count > 0) {
        ws.send(JSON.stringify({
          cmd: data.ret,
          stn: false,
        }));
      }
    } else {
      ws.send(JSON.stringify({
        ret: data.cmd,
        result: true,
        cloudtime: moment().format('YYYY-MM-DD HH:mm:ss')
      }));

      ws.send(JSON.stringify({
        cmd: 'getalllog',
        stn: true
      }))
    }
  });

  // 获取用户列表
  // setTimeout(() => {
  //   ws.send(JSON.stringify({
  //     cmd: 'getuserlist',
  //     stn: true
  //   }))
  // }, 5000)

  setTimeout(() => {
    ws.send(JSON.stringify({
      cmd: 'getuserlist',
      name: '吴家荣',
      enrollid: 101,
      backupnum: 10,
      admin: 0,
      record: 181739
    }))
  }, 1000)

  // setTimeout(() => {
  //   ws.send(JSON.stringify({
  //     cmd: 'opendoor',
  //   }))
  // }, 10000)
});

console.log('WebSocket Server Listening on 7788')
