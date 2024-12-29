
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
var inputFile = document.querySelector("#fileInput");
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
    var newPost = document.querySelector(".askSomeForm textarea");
    var showUser = document.querySelector(".askSomeForm input[type='checkbox']").checked;
    var newCategory = document.querySelector(".askSomeForm select").value;
    var fileInput = document.querySelector(".askSomeForm input[type='file']");
    var newImage = '';
    if(newPost.value && newCategory){
    const cloudName = "dfochp65f"; // Replace with your Cloudinary cloud name
    const uploadPreset = "my-upload-preset"; // Replace with your upload preset (configured in Cloudinary)
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
            // Use Cloudinary API to upload the image
            fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                newPost.parentElement.classList.add("unload");
                newImage = data.secure_url; // URL of the uploaded image
                adddposts(newPost,showUser,newCategory,newImage);
                // console.log("File uploaded successfully: ", imageUrl);
                // Display the uploaded image
                // imageDisplay.src = imageUrl;
            })
            .catch(error => {
                console.error("Error uploading image: ", error);
            });
        }else{
            newPost.parentElement.classList.add("unload");
            newImage = '';
            adddposts(newPost,showUser,newCategory,newImage);
        }
    }else{
        document.querySelector(".askSomeForm p.error").innerHTML = "من فضلك اختر المادة و اكتب سؤالك";
    }
})
