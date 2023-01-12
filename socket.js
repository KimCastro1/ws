const WebSocket=require('ws');

module.exports=(server)=>{
    const wss = new WebSocket.Server({server});

    wss.on('connection',(ws,req)=>{
        const ip=req.headers['x-forworded-for']||req.socket.remoteAddress;
        console.log('new client connect... ip:',ip);
        ws.on('message',(message)=>{
            console.log(message.toString());
        });
        ws.on('error',(error)=>{
            console.log(error);
        });
        ws.on('close',()=>{
            console.log('client connect close... ip:',ip);
            clearInterval(ws.interval);
        });
        ws.interval=setInterval(()=>{
            if(ws.readyState===ws.OPEN){
                ws.send('send message server to client...');
            }
        },3000);
    });
};