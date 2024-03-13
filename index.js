
const axios = require('axios'); 
var {Bugil}=require('./bug')
//console.log(Bugil)

const { tmpdir } = require("os")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
const formData = require('form-data')
const Pino = require('pino');
const FormData = require('form-data')
const fs = require('fs');
const request = require('request-promise');
const https = require('https');
const cheerio = require('cheerio');
const modules = require('./mod');
for (const im in modules){
    eval(modules[im].toString())
}
console.log(modules)
const all = fs.readFileSync('mod.js','utf-8');
const moment = require('moment-timezone');
//console.log(moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss"))
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const logo = fs.readFileSync('logo.jpg');
const querystring = require("querystring");
const { useMultiFileAuthState} = require("@whiskeysockets/baileys");
const {downloadMediaMessage} = require('@whiskeysockets/baileys')
const { default : makeWaSocket } = require("@whiskeysockets/baileys");
let stutu = false;
let comand = []
let dic = JSON.parse(fs.readFileSync('menu.json', 'utf8'))
let menu = dic.menu
for (menuq of menu){
    comand.push(menuq.name)
}

let member = {}

let dicm = JSON.parse(fs.readFileSync('member.json', 'utf8'))
let lis = dicm.list
for (l of lis){
    member[l.number] = l.gpt
}

function addmember(num,sessi){
    member[num] = sessi
    dicm.list.push({"number":num,"gpt":sessi})
    fs.writeFileSync('member.json', JSON.stringify(dicm, null, 2), 'utf-8');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const generateString = () => {
  const prefix = '01HRP';
  const remainingLength = 21 - prefix.length;
  const randomString = Array.from({ length: remainingLength }, () => Math.floor(Math.random() * 36).toString(36).toUpperCase()).join('');
  return prefix + randomString;
}

async function getToken(v,email){
    let app
    if (v===1){
        app = "com.lightricks.Enlight-Phoenix"
    }else{app = "com.lightricks.Enlight-Video"}

    const headers = {
      'Host': 'api.fortress-ww-prd.lightricks.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/4.10.0'
    };
    
    const response = await axios.post('https://api.fortress-ww-prd.lightricks.com/v2/auth/otp?app=' + app + '&cvc=1412&plt=a&pltv=28&env=production', {
      identityType: 'email',
      identity: email
    }, { headers: headers })
    await sleep(2)
    let limit = 0;
    let kode
    while (limit<10){
        await sleep(1)
        const inbox = await axios.get('https://www.1secmail.com/api/v1/?action=getMessages&login='+email.split("@")[0]+'&domain='+email.split("@")[1])
        if (inbox!=undefined) {
            try{
                kode = inbox.data[0]["subject"].split(': ')[1];
                const tokens = await axios.post('https://api.fortress-ww-prd.lightricks.com/v2/auth/email/login?app='+app+'&cvc=1412&plt=a&pltv=28&env=production',{"email":email,"identityProofType":"email","identityProof":kode},{headers:headers})
                return tokens.data.token
                break
            }catch(w){}
        }
        limit + 1
    }
}
// getToken(2,'irjrhrhhrjuev@1secmail.com')
// .then(response=>{console.log(response)})


const { v4: uuidv4 } = require('uuid');

async function editImage(prompt, image, token, userid) {
  const url = "https://cf.res.lightricks.com/v2/api/ai-gaming/predict-sync";
  const headers = {
    "x-request-id": uuidv4(),
    "authorization": `Bearer ${token}`,
    "x-lightricks-auth-token": token,
    "x-app-id": "com.lightricks.videoleap",
    "x-build-number": "1.25.1",
    "x-platform": "android",
    "x-lightricks-subscriber": "true",
    "x-client-user-id": userid,
    "accept-encoding": "gzip",
    "user-agent": "okhttp/4.10.0"
  };

  

  //const image = fs.readFileSync(pathToImage);
  const files = new FormData();
  files.append('input', image, 'image.jpg');
  files.append('params', '{"prompt": "'+prompt+'"}')
  const response = await axios.post(url, files, { headers: headers,responseType: 'arraybuffer'});
  return response.data;
}


async function konek(){
    try{
    const auth = await useMultiFileAuthState("aauth");
    const soket = makeWaSocket({
        printQRInTerminal: true,
        browser: ["BotDris", "Chromee", "2.0.0"],
        auth: auth.state,
        logger: Pino({ level: "silent" })
    });
   // console.log(soket)
    soket.ev.on("creds.update", auth.saveCreds);
    soket.ev.on("connection.update", ({ connection }) => {
        if (connection === "open") {
            console.log("Wa yang tersambung : " + soket.user.id.split(':')[0])
        }
        if (connection === "close") konek();
    });
    soket.ev.on("messages.upsert", async ({ messages }) => {
        try{
            const m = messages[0];
            console.log(m)
            soket.readMessages([m.key])
            let wa_number = m.key.remoteJid;
            const userg = m.key.participant || wa_number;
            soket.sendPresenceUpdate('recording', wa_number)
            //soket.sendMessage(wa_number,{text:JSON.stringify(m)})
            //console.log(messages)
            const m2 = m.message;
           // console.log(m2?.extendedTextMessage || m2)
            let prompt = m2[Object.keys(m2)[0]]
            let fakeReplys = {
                    key: {
                        remoteJid: 'status@broadcast',
                        fromMe: false,
                        id: 'A82C19B19F9E193BE29EEC1EA5BCF010',
                        participant: userg},
                    messageTimestamp: 1701492238,
                    pushName: 'Muhamad Idris 10TKJ2',
                    broadcast: true,
                        message: {
                            extendedTextMessage: {
                                text: prompt,
                                textArgb: 4294967295,
                                backgroundArgb: 4290879551,
                                font: 1,
                                previewType: 0,
                                inviteLinkGroupTypeV2: 0
                            }
                        }
                }
                if (wa_number.split('@')[1]==='g.us'){
                    fakeReplys = m
                }
            function audioMessage(text,mime) {
                soket.sendMessage(wa_number,{
                        audio: text,
                        mimetype:mime,
                        //mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function imageMessage(img) {
                soket.sendMessage(wa_number,{
                        image: img,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function videoMessage(vid) {
                soket.sendMessage(wa_number,{
                        video: vid,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function textMessage(text) {
                soket.sendMessage(wa_number,{
                        text: text,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true,
                                sourceUrl:'https://chat.whatsapp.com/FGvkXIWfCzgKKCJvQDdQEf',
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function stickerMessage(text) {
                soket.sendMessage(wa_number,{
                        sticker: text,
                        //author:"Tamsis X Code",
                        packname:"SimpleBot",
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }

            //console.log(m)
            if (Object.keys(m2).includes('imageMessage') || Object.keys(m2).includes('videoMessage')){
                let type = 'videoMessage'
                let name = 'x.mp4'
                if (Object.keys(m2).includes('imageMessage')){
                    type = 'imageMessage';
                    name = 'x.jpg'
                }

                const mCaption = (m2['imageMessage'] || m2['videoMessage']).caption
                console.log(`${type} : ${mCaption}`)
                fakeReplys=m

                if (mCaption.split(' ')[0]==='.toUrl'){
                    //imageMessage(media)
                    const media = await downloadMediaMessage(m,'buffer');
                    const results = await uploadFileBuffer(media,name)
                    textMessage(results)
                } else if (mCaption.split(' ')[0]==='.sticker'){
                    const media = await downloadMediaMessage(m,'buffer');
                    if (type !='videoMessage'){
                        const webp = await ToStic(media, {author:'Tamsis X Code',packname:'SimpleBot'})
                        stickerMessage(fs.readFileSync(webp))
                    }else{
                        const webp = await writeExifVid(media, {author:'Tamsis X Code',packname:'SimpleBot'})
                        stickerMessage(fs.readFileSync(webp))
                    }
                } else if (mCaption.split(' ')[0]==='.editor'){
                    const media = await downloadMediaMessage(m,'buffer');
                    let prompt = mCaption.replace(mCaption.split(' ')[0]+' ','')
                    
                    if (type !='videoMessage'){
                        const token = await getToken(1,wa_number.split('@')[0].toLowerCase()+'@1secmail.com')
                        const result = await editImage(prompt,media,token,generateString())
                        imageMessage(result)
                    }else{
                        const token = await getToken(1,wa_number.split('@')[0].toLowerCase()+'@1secmail.com')
                        const form = new FormData();
                        form.append('video', media, 'video.mp4');
                        form.append('token', token);
                        form.append('prompt', prompt);
                        
                        let result = (await axios.post('https://pyapi.cyclic.app/api/editor/vidio', form)).data
                        console.log(result)
                        let progres = 0
                        while (progres<30){
                            let chk = (await axios.get(result.progres)).data
                            console.log(chk)
                            if (chk['status-code'] === 'done'){
                                let rs = chk['results'][0]
                                await videoMessage({url:rs})
                                progres = 31
                            }else if (chk['status-code'] == 'in-progress'){
                                await sleep(5)
                                console.log(progres)
                                //progres = progres 
                                //await textMessage('progres : '+String(chk['progress'])+'%')
                            }
                           // progres = progres+1;
                        }
                    }
                }
                prompt = false
            } else if (typeof prompt != 'string'){
                prompt = prompt.text
            }

            if (typeof prompt === 'string' && !m.eventResponses){
                console.log(`textMessage : ${prompt}`)
                if (prompt.split(' ')[0] === '.toUrl' || prompt.split(' ')[0] === '.sticker'){
                    textMessage('butuh video/gambar')
                }
                if (!member.hasOwnProperty(wa_number)){
                    
                    if (prompt == '/daftar'){
                        
                        const gpts = (await axios.get('https://pyapi.cyclic.app/api/gpt3?prompt=balas%20pesan%20ini%20dengan%20kata%20sambutan%20untuk%20user%20yang%20baru%20terdaftar%20di%20layanan')).data;
                        textMessage(gpts.response)
                        addmember(wa_number,gpts.session)
                    }else{
                        pesan_belum_terdaftar = [
                            "Maaf, Anda belum terdaftar. Untuk mendaftar, ketik /daftar.",
                            "Oh tidak! Anda belum mendaftar. Silakan ketik /daftar untuk mulai.",
                            "Sepertinya Anda belum terdaftar. Anda dapat mendaftar dengan mengetik /daftar.",
                            "Mohon maaf, akses ke bot hanya tersedia bagi yang terdaftar. Silakan daftar dengan mengetik /daftar.",
                            "Anda belum mendaftar ke layanan bot. Segera daftar dengan mengetik /daftar.",
                            "Untuk mengakses bot, Anda perlu mendaftar terlebih dahulu. Silakan ketik /daftar untuk memulai proses pendaftaran.",
                            "Maaf, Anda belum terdaftar. Silakan lakukan pendaftaran dengan mengetik /daftar.",
                            "Anda belum mendaftar. Silakan lakukan pendaftaran sekarang dengan mengetik /daftar.",
                            "Sayang sekali, Anda belum terdaftar. Silakan daftar sekarang dengan mengetik /daftar.",
                            "Anda belum terdaftar ke layanan bot. Mohon daftar dengan mengetik /daftar.",
                            "Mohon maaf, Anda belum mendaftar. Lakukan pendaftaran dengan mengetik /daftar.",
                            "Maaf, Anda belum terdaftar. Silakan daftar sekarang dengan mengetik /daftar.",
                            "Tampaknya Anda belum terdaftar. Mohon daftar terlebih dahulu dengan mengetik /daftar.",
                            "Oh tidak! Anda belum terdaftar. Untuk mulai, ketik /daftar.",
                            "Anda belum mendaftar ke layanan bot. Silakan lakukan pendaftaran dengan mengetik /daftar.",
                            "Maaf, Anda belum terdaftar. Mohon daftar sekarang dengan mengetik /daftar.",
                            "Anda belum mendaftar. Untuk mengakses bot, lakukan pendaftaran dengan mengetik /daftar.",
                            "Sayangnya, Anda belum terdaftar. Silakan daftar sekarang dengan mengetik /daftar.",
                            "Anda belum terdaftar ke layanan bot. Silakan lakukan pendaftaran dengan mengetik /daftar.",
                            "Mohon maaf, Anda belum terdaftar. Untuk mendaftar, ketik /daftar."
                        ];
                        textMessage(pesan_belum_terdaftar[Math.floor(Math.random() * pesan_belum_terdaftar.length)])
                        
                    }

                }else if (prompt && member.hasOwnProperty(wa_number)){
                    let pesan = (await axios.get('https://pyapi.cyclic.app/api/gpt3', {
                      params: {
                        prompt: prompt.replace(' ','%20'),
                        session: member[wa_number]
                      }
                    })).data
                    textMessage(pesan.response)
                }
            
              soket.chatModify({
                  delete: true,
                  lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
              },wa_number)
            }
        }catch(err){console.log(err)}
    })}
  catch (we){
    stutu=false;
    console.log(we)
  }
}
//const semuaFungsi = Object.getOwnPropertyNames(module.exports).filter(name => typeof module.exports[name] === 'function' || typeof module.exports[name] === 'AsyncFunction');
//console.log(semuaFungsi)
// Menambahkan
// konek()

const express = require('express');
const app = express();
const port = '0000';
app.get('/', (req, res) => {
  if (!stutu) {
    stutu = true;
    konek()

    res.send({'play':stutu})

  } else {
    res.send({'play':stutu});
  }
});
app.listen()
