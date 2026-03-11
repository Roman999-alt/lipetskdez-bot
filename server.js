const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); // позволяет отдавать robots.txt и sitemap.xml

const PORT = process.env.PORT || 3000;

const TOKEN = process.env.TOKEN;
const CHAT_ID = "5058136349";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {

const { name, phone, service, comment } = req.body;

const text = `
🔥 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
🐜 Проблема: ${service}
📍 Адрес: ${comment}
`;

try {

const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id: CHAT_ID,
text: text
})
});

const data = await response.json();

if(data.ok){
res.json({ok:true});
}else{
res.json({ok:false,error:data.description});
}

}catch(error){

console.log(error);
res.json({ok:false,error:"Telegram error"});

}

});

console.log("🚀 Сервер запущен");

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});
