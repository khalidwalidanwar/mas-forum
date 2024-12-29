
var askSomeForm = document.querySelector(".askSomeForm");
var overlay = document.querySelector(".overlay");
var popup = document.querySelector(".popup");
document.querySelector(".askSome").onclick = ()=>{
    if(document.cookie.includes("userid")){
    askSomeForm.style.top = "25%";
    overlay.style.scale = 1;
}else{
    popup.querySelector("p").innerHTML= 'يلزم تسجيل الدخول اولا';
    popup.style.scale = 1;
    overlay.style.scale = 1;
}
}
overlay.onclick = ()=>{
    askSomeForm.style.top = "-100%";
    popup.style.scale = 0;
    overlay.style.scale = 0;
}
var inputFile = document.querySelector("#upload");
var filename = document.querySelector(".filename");
document.querySelector(".upload").onclick = ()=>{
    inputFile.click();
}
inputFile.onchange=()=>{
    document.querySelector(".upload").className = "btn upload";
    filename.innerHTML = inputFile.value;
    console.log(inputFile.value)
}




import {adddposts} from "./app.js";

document.querySelector(".askSomeForm button.sendQ").addEventListener("click",(e)=>{
    var newPost = document.querySelector(".askSomeForm textarea").value;
    var showUser = document.querySelector(".askSomeForm input[type='checkbox']").checked;
    var newCategory = document.querySelector(".askSomeForm select").value;
    var newImage = document.querySelector(".askSomeForm input[type='file']").value;
    if(newPost && newCategory){
        adddposts(newPost,showUser,newCategory,newImage);
    }else{
        document.querySelector(".askSomeForm p.error").innerHTML = "من فضلك اختر المادة و اكتب سؤالك";
    }
})
