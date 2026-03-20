const axios = require("axios");

let simsim = "";
let count_req = 0; 
// Note : THIS CODE MADE BY RX @RX_ABDULLAH007 (GIVE CREDIT OTHERWISE EVERYONE FUCK YOU AT 300 KM SPEED)
async function sendTypingIndicatorV2(sendTyping, threadID) {
 try {
 var wsContent = {
 app_id: 2220391788200892,
 payload: JSON.stringify({
 label: 3, //original author - rX Abdullah
 payload: JSON.stringify({
 thread_key: threadID.toString(),
 is_group_thread: +(threadID.toString().length >= 16),
 is_typing: +sendTyping,
 attribution: 0
 }),
 version: 5849951561777440
 }),
 request_id: ++count_req,
 type: 4
 };
 await new Promise((resolve, reject) =>
 mqttClient.publish('/ls_req', JSON.stringify(wsContent), {}, (err, _packet) =>
 err ? reject(err) : resolve()
 )
 );
 } catch (err) {
 console.log("⚠️ Typing indicator error:", err.message);
 }
}

(async () => {
 try {
 const res = await axios.get("https://raw.githubusercontent.com/abdullahrx07/X-api/main/MaRiA/baseApiUrl.json");
 if (res.data && res.data.mari) simsim = res.data.mari;
 } catch {}
})();

module.exports.config = {
 name: "baby",
 aliases: ["maria", "hippi"],
 premium: false, 
 version: "1.1.0",
 hasPermssion: 0,
 credits: "rX",
 description: "AI auto teach with Teach & List support + Typing effect",
 commandCategory: "chat",
 usages: "[query]",
 cooldowns: 0,
 prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const query = args.join(" ").toLowerCase();

 try {
 if (!simsim) return api.sendMessage("❌ API not loaded yet.", event.threadID, event.messageID);

 if (args[0] === "autoteach") {
 const mode = args[1];
 if (!["on", "off"].includes(mode))
 return api.sendMessage("✅ Use: baby autoteach on/off", event.threadID, event.messageID);

 const status = mode === "on";
 await axios.post(`${simsim}/setting`, { autoTeach: status });
 return api.sendMessage(`✅ Auto teach is now ${status ? "ON 🟢" : "OFF 🔴"}`, event.threadID, event.messageID);
 }

 if (args[0] === "list") {
 const res = await axios.get(`${simsim}/list`);
 return api.sendMessage(
 `╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐮𝐬\n├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions}\n├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies}\n╰─╼👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐫𝐗 𝐀𝐛𝐝𝐮𝐥𝐥𝐚𝐡`,
 event.threadID,
 event.messageID
 );
 }

 if (args[0] === "msg") {
 const trigger = args.slice(1).join(" ").trim();
 if (!trigger) return api.sendMessage("❌ | Use: !baby msg [trigger]", event.threadID, event.messageID);

 const res = await axios.get(`${simsim}/simsimi-list?ask=${encodeURIComponent(trigger)}`);
 if (!res.data.replies || res.data.replies.length === 0)
 return api.sendMessage("❌ No replies found.", event.threadID, event.messageID);

 const formatted = res.data.replies.map((rep, i) => `➤ ${i + 1}. ${rep}`).join("\n");
 const msg = `📌 𝗧𝗿𝗶𝗴𝗴𝗲𝗿: ${trigger.toUpperCase()}\n📋 𝗧𝗼𝘁𝗮𝗹: ${res.data.total}\n━━━━━━━━━━━━━━\n${formatted}`;
 return api.sendMessage(msg, event.threadID, event.messageID);
 }

 if (args[0] === "teach") {
 const parts = query.replace("teach ", "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage("❌ | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(`✅ ${res.data.message}`, event.threadID, event.messageID);
 }

 if (args[0] === "edit") {
 const parts = query.replace("edit ", "").split(" - ");
 if (parts.length < 3)
 return api.sendMessage("❌ | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

 const [ask, oldR, newR] = parts;
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldR)}&new=${encodeURIComponent(newR)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (["remove", "rm"].includes(args[0])) {
 const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage("❌ | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (!query) {
 const texts = ["Hey baby 💖", "Yes, I'm here 😘"];
 const reply = texts[Math.floor(Math.random() * texts.length)];
 return api.sendMessage(reply, event.threadID);
 }

 await sendTypingIndicatorV2(true, event.threadID);
 await new Promise(r => setTimeout(r, 2000));
 await sendTypingIndicatorV2(false, event.threadID);

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(res.data.response, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);

 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users }) {
 const senderName = await Users.getNameUser(event.senderID);
 const text = event.body?.toLowerCase();
 if (!text || !simsim) return;

 try {
 await sendTypingIndicatorV2(true, event.threadID);
 await new Promise(r => setTimeout(r, 2000));
 await sendTypingIndicatorV2(false, event.threadID);

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(res.data.response, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
 const text = event.body?.toLowerCase().trim();
 if (!text || !simsim) return;

 const senderName = await Users.getNameUser(event.senderID);
 const triggers = ["baby", "bby", "বট", "bot", "rahat", "সজীব"];

 if (triggers.includes(text)) {
 const replies = [
          "বেশি bot Bot করলে leave নিবো কিন্তু বোকাচোদা 😒😒 " , "শুনবো না😼তুমি আমার (সজীব) বসকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" , ". ‎তোমার গোপন দ্বারের ব্যাথার কারন হতে চাই...!😒" , ". বট বট করছিস বাঁড়া,নিজে একটা বানিয়ে দেখ শালা..!🙈" , "Bolo Babu, তুমি কি আমাকে করতে দিবা? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু মাগী 😑", "। বস- সজীব তোমার সাথে কথা বলতে চায়..!🙂  😐😑?" , "এতো ডাকছিস কেন?গালি শুনবি নাকি?মাগী 🤬" , "I ফাঁক you janu🥰" , "ফাহহহহহহহহ 😚 " , " অসম্মান করছিস কেন বোকাচোদা 😰😿" , "চুষে দে 🫦🫦" , "চুপ থাক নাই তো তোর দাত ভেগে দিবো কিন্তু মাগী" ,"Fhaaaaaaaaaaaaaaaaaaaaaaaaaaaaa🫦", "। ‎নারী চাই আমার..!😘 🥺"," তাবাসুম ইনবক্সে আয় তো" , "বার বার Disturb করছিস কোনো😾,আমার সজীব জানুর সাথে ব্যাস্ত আছি😋" , "বোকাচোদা এতো ডাকিস কেন🤬" , " চুদাস না লাথি খাবি 🦵😘 " , " সাদিয়া লুচ্চা কোই রে, বাঁড়া" , "chrome a আছি ডিস্টার্ব করিস না বাঁড়া 🙊🙁","হ্যাঁ জানু , এইদিক এ আসো চুষে দেই🤭 😘" , "সন্ধ্যা বেলা বেগুন ক্ষেতে করতে গেলাম চুরি, বেগুন ওলা ওমনি আমার হাতটা নিল ধরি,ধইরা নিয়া ভইরা দিল 😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো বাঁড়া?🤔😂 " , "Video call dicci dekhao " , "কি হলো , মিস্টেক করচ্ছিস নাকি বাঁড়া 🤣" , "এখন অনেক রাত কেউ কোথাও নেই চলো হে গালিব প্রিয়তমার বাড়ির দেওয়ালে চুমু খেয়ে আসি 🤭🤏" , " মায়াবতী এখন মায়া বড়িতে আসক্ত 😈" , "। কবি তার কবিতা নিয়ে মগ্ন,আর কবিতা অন্যর খাটে নগ্ন (write ✍️ Author sajib) 😏" , "করতে দাও বেবী..!😘 " , "। ‎তোমার গোপন দ্বারের ব্যাথার কারন হতে চাই...!" ,"উফ্ খেলার সময়ও ডাকা-ডাকি করে , না ডেকে খেলতে দাও 😑🌚🔞", "তুমি আমার দেখা সেই নগ্ন নীল তিলোত্তমা মেঘ" , "আমি উন্মাদ হয়ে যাই তাকে দেখার জন্য একবার,,ভাবো গালিব যে তাকে রোজ দেখছে তার ভাগ্যে কত চমৎকার 🐸 😎" , "সজীব বস তোমাকে ভালোবাসে😌" , "মিলনের ই স্বাদ জাগে মনে বন্ধু,কুন্জবনে তোমারি সনে 🌚" , "তোর কি চোখে পড়ে না আমি সজীব জানুর সাথে ব্যাস্ত আছি😒","গুরুপে কেউ খারাপ কথা বলিস না সজীব বস বকবে 😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " A bal 😾 chup thak sadiya mal koi" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "আমাকে এতো না ডেকে বস সজীব এর কে একটা গার্লফ্রেন্ড দে 🙄" , "মায়াবতী কখনো কি ভালোবাসছিলে নাকি সবটা ছিল অভিনয়,নাহলে কেনো আজ দুরত্বের পরিচয়" , "🌻🌺💚আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস সজীব এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস সজীব কে একটা জি এফ দাও-😽🫶🌺","হোল ভরা মাল ও তুই হোসনা বেসামাল ❓","সজীব শুধু একাই গুরুপে আসে, তাঁরা কেউ আসে না,কেউ তো আছে গালিব যে তাদের আসতে দেয় না","ভিডিও কলে দেখাও 🙊🙆‍♂","স্বপ্ন দেখো কিন্তু দোষ করো না-😪🤧","নিষিদ্ধ পল্লিতে আছি ডাকিস না","চুনা ও চুনা আমার বস সজীব এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","এই উলঙ্গ পৃথিবীর পরে খুঁজেছি তোমাকে , যশোরের নিষিদ্ধ পল্লির আস্তরণ মেখেছি","জান মেয়ে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽","জিহাদ বানচোদ কোই-🙈🖤🌼","আমার বস সজীব এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস সজীবের জন্য সবাই দোয়া করবেন-💝১০টা বিয়ে যেন করতে পারে🤭🤫","যশোর একাকিত্বের মরিচা ধরা রেলিং ধরে খুঁজেছি তোমাকে ডুবেছি অন্ধকারে,, নিষিদ্ধ পল্লির আস্তরণ মেখেছি গায়, তবুও মেলেনি শান্তি পাই নাই সুখ আজ ও আমি তোমার অপেক্ষায়","জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽","জান বাল ফালাইবা-🙂🥱🙆‍♂","আন্টি-🙆-আপনার মেয়ে-👰‍♀️-রাতে আমারে ভিদু কল দিতে বলে🫣-🥵🤤💦","‎কি বলবি বোকাচোদা বল তো....!🤬-🤏🏻🙂","আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস সজীব কে দান করেন-🥱🐰🍒","ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧","অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর  সজীব বস কে-🐸😾🔪","𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧","-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸","তাকাই আছো কেন চুমু দিবা-🙄🐸😘"," চোখের সামনে উর্বর দুটি পাহার ভাগ্যে তো তাহার যে করিয়াছে আহার😌🤗😇","গাঁজা খাবি মানুষ হবি-🙊🙆‍♂️🤗","আসিফ মাগী কোই 🤔🥱🌻","দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧","তাবিজ কইরা হইলেও প্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻","ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻","আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস সজীব ধরতে পারছে না-🐸🥲","চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️","যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂 \n আমার বস সজীব এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗","হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস সজীব এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️","রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜","সুন্দর মাইয়া মানেই-🥱আমার বস boss সজীব  এর বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗","এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂","দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸","হুদাই আপনারে  শয়তানে লারে-😝😑☹️","𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸","আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦","কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧","বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আম্মু হইতে সাহায্য করব-🙈🥱","এই আন্টির মেয়ে-🫢🙈-𝐔𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐚𝐡-😽🫶-আসলেই তো স্বাদ-🥵💦এতো স্বাদ কেন-🤔-সেই স্বাদ-😋","ইস কেউ যদি বলতো-🙂-আমার শুধু  তোমাকেই লাগবে-💜🌸","ওই বেডি তোমার বাসায় না আমার বস সজীব মেয়ে দেখতে গেছিলো-🙃-নাস্তা আনারস আর দুধ দিছো-🙄🤦‍♂️-আরে বইন কইলেই তো হতো বয়ফ্রেন্ড আছে-🥺🤦‍♂-আমার বস সজীব-কে জানে মারার কি দরকার ছিলো🙄🤧","একদিন সে ঠিকই ফিরে তাকাবে-😇-আর মুচকি হেসে বলবে তোমার boss সজীব  এর মতো আর কেউ ভালবাসেনি-🙂😅","হুদাই গ্রুপে আছি-🥺🐸-কেও ইনবক্সে নক দিয়ে বলে না জান তোমারে আমি অনেক ভালোবাসি-🥺🤧","কি'রে গ্রুপে দেখি একটাও বেডি নাই সব হিজড়া-🤦‍🥱💦","দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস সজীব এর মনটা ছাড়া-🥴😑😏","🫵তোমারে প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করমু বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵","আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -😒😒 " , "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺 " , "চুষে দে ওk😒" , "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈" , "Bolo Babu, তুমি কি আমাকে করতে দিবা ? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয় কিন্তু বোকাচোদা 😑", " যে ট্রেন চলে গেছে সজীব কে রেখে তাঁর টিকিট এখনো সজীবের বুক পকেটে 😑?" , "ভাবী ভাবী ভাবী ভাবীর নাভীর নিচে তাবী? 🤬","মেয়ে হলে বস সজীব এর সাথে প্রেম করো🙈??. " ,  "আরে Bolo আমার জান , তুমি সাঁতার কাটতে জানো 😚 " , "করতে দাও😰😿" , "মদে আর কতটুকু নেশা গালিব, সর্বনাশ তো করেছে প্রেমিকার চোখ 😼" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু আবাল চু*" , " সেক্স উঠেছে নাকি" , "বার বার Disturb করেছিস কোনো😾,আমার বস সজীব এর  সাথে ব্যাস্ত আসি😋" , "সজীব কোই রে 😼😼" , "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 " , "চোখে আমার নেশা বুকে গাঁজার ছাই ,কেমনে বলবো তোদের কি আর বলবো ভাই 😒" , "হা জানু , এইদিক এ আসো চুষে দি🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস কানা মাছি 😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আসি" , "কি হলো ,মিস টিস করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি? সজীবের ইনবক্সে বলবা 🤭🤏" , "কালকে দেখা করিস তো একটু মাং😈" , "বাঁড়া 😏" ,"খালি ঢং করে আসে আবার বট বলে চলে যায়🙁😔", "উঃ ফ ভাবী" , "মাইয়া হলে আমার বস সজীব কে Ummmmha দে 😒" , "তোমার নিচতলার মালিক হতে চাই" , "ক্রম থেকে বেরিয়ে আসেন 😎" , "আম পাতা জোড়া-জোড়া মারবো চাবুক তোমার পাছায়🫩🐸😌" , "বলো বাঁড়া 🌚" , "তোর কি চোখে পড়ে না আমি বস সজীব এর সাথে ব্যাস্ত আসি😒" , "༊━━🦋নামাজি মানুষেরা সব থেকে বেশি সুন্দর হয়..!!😇🥀 🦋 কারণ.!! -অজুর পানির মত শ্রেষ্ঠ মেকআপ দুনিয়াতে নেই༊━ღ━༎🥰🥀 🥰-আলহামদুলিল্লাহ-🥰"," শখের নারী  বিছানায় মু'তে..!🙃🥴","𝐈'𝐝 -তে সব 𝐖𝐨𝐰 𝐖𝐨𝐰 বুইড়া বেডি-🐸💦","🥛-🍍👈 -লে খাহ্..!😒🥺"," অনুমতি দিলে 𝚈𝚘𝚞𝚃𝚞𝚋𝚎-এ কল দিতাম..!😒","~আমি মারা গেলে..!🙂 ~অনেক মানুষ বিরক্ত হওয়া থেকে বেঁচে  যাবে..!😅💔","🍒---আমি সেই গল্পের বই-🙂 -যে বই সবাই পড়তে পারলেও-😌 -অর্থ বোঝার ক্ষমতা কারো নেই..!☺️🥀💔","~কার জন্য এতো মায়া...!😌🥀 ~এই শহরে আপন বলতে...!😔🥀 ~শুধুই তো নিজের ছায়া...!😥🥀"," কারেন্ট একদম বেডি'গো মতো- 🤧 -খালি ঢং করে আসে আবার চলে যায়-😤😾🔪"," সানিলিওন  আফারে ধর্ষনের হুমকি দিয়ে আসলাম - 🤗 -আর 🫵তুমি আমারে খেয়ে দিবা সেই ভয় দেখাও ননসেন বেডি..!🥱😼"," দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস সজীব কে সন্দেহ করে.!🐸","আমার থেকে ভালো অনেক পাবা-🙂 -কিন্তু সব ভালো তে কি আর ভালোবাসা থাকে..!💔🥀","পুরুষকে সবচেয়ে বেশি কষ্ট দেয় তার শখের নারী...!🥺💔👈","তোমার লগে দেখা হবে আবার - 😌 -কোনো এক অচেনা গলির চিপায়..!😛🤣👈","থাপ্পড় চিনোস থাপ্পড়- 👋👋😡 -চিন্তা করিস না তরে মারমু না-🤗 -বস সজীব আমারে মারছে - 🥱 - উফফ সেই স্বাদ..!🥵🤤💦","অবহেলা করিস না-😑😪 - যখন নিজেকে বদলে ফেলবো -😌 - তখন আমার চেয়েও বেশি কষ্ট পাবি..!🙂💔","বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂𝚂 করি-🤕🥺","৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই আমাকে প্রোপস করুন-🤗😂👈","প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧","কিরে🫵 তরা নাকি  prem করস..😐🐸•আমারে একটা করাই দিলে কি হয়-🥺","যেই আইডির মায়ায় পড়ে ভুল্লি আমারে.!🥴- তুই কি যানিস সেই আইডিটাও আমি চালাইরে.!🙂"
        ];
 const reply = replies[Math.floor(Math.random() * replies.length)];

 await sendTypingIndicatorV2(true, event.threadID);
 await new Promise(r => setTimeout(r, 5000));
 await sendTypingIndicatorV2(false, event.threadID);

 return api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
 }

 const matchPrefix = /^(baby|bby|xan|bbz|mari|মারিয়া)\s+/i;
 if (matchPrefix.test(text)) {
 const query = text.replace(matchPrefix, "").trim();
 if (!query) return;

 await sendTypingIndicatorV2(true, event.threadID);
 await new Promise(r => setTimeout(r, 5000));
 await sendTypingIndicatorV2(false, event.threadID);

 try {
 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(res.data.response, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
 }

 if (event.type === "message_reply") {
 try {
 const setting = await axios.get(`${simsim}/setting`);
 if (!setting.data.autoTeach) return;

 const ask = event.messageReply.body?.toLowerCase().trim();
 const ans = event.body?.toLowerCase().trim();
 if (!ask || !ans || ask === ans) return;

 setTimeout(async () => {
 try {
 await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)}`);
 console.log("✅ Auto-taught:", ask, "→", ans);
 } catch (err) {
 console.error("❌ Auto-teach internal error:", err.message);
 }
 }, 300);
 } catch (e) {
 console.log("❌ Auto-teach setting error:", e.message);
 }
 }
};
