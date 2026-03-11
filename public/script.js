document.addEventListener("DOMContentLoaded", () => {

function sendForm(form){
if(!form) return;

form.addEventListener("submit", async (e) => {
e.preventDefault();

const formData = {
name: form.querySelector('input[name="name"]').value,
phone: form.querySelector('input[name="phone"]').value,
service: form.querySelector('select[name="service"]').value,
comment: form.querySelector('textarea[name="comment"]').value
};

try {

const res = await fetch('/send', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(formData)
});

const data = await res.json();

if(data.ok){
alert("Заявка отправлена!");
form.reset();

if(form.id === "modalForm"){
closeModal();
}

}else{
alert("Ошибка: " + data.error);
}

}catch(err){

console.error(err);
alert("Ошибка отправки. Проверьте сервер.");

}

});

}

sendForm(document.getElementById("orderForm"));
sendForm(document.getElementById("modalForm"));

window.openModal = function(){
const modal = document.getElementById("modal");
if(modal) modal.style.display = "flex";
}

window.closeModal = function(){
const modal = document.getElementById("modal");
if(modal) modal.style.display = "none";
}

});