import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, query,limit,where ,deleteDoc,doc,updateDoc,getDoc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
const firebaseConfig = {
  apiKey: "AIzaSyCLc3czB1WnDVsJiypj0T1kZLGritXfOx0",
  authDomain: "lido-8ecd4.firebaseapp.com",
  projectId: "lido-8ecd4",
  storageBucket: "lido-8ecd4.firebasestorage.app",
  messagingSenderId: "546499963720",
  appId: "1:546499963720:web:e030c1df84c601f606617d",
  measurementId: "G-KR5C7F1QVT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsDev = document.querySelector(".posts");
var Cusername;
const popUp = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
if(document.cookie.includes("userid")){
    // cutStringFromLetter(document.cookie,"u").substr(7,20)
    document.querySelector(".sign").innerHTML = `
    <p class='unload'>اهلا محمد وليد انور</p>
    <button class="btn-border logout" ><i class="fa-solid fa-right-from-bracket"></i></button>
    `;
    document.querySelector(".logout").onclick = ()=>{
        logout();
      }
      getDoc(doc(db, "users", cutStringFromLetter(document.cookie,"u").substr(7,20))).then((docSnapshot) => {
        Cusername = docSnapshot.data().name ;
        if(document.cookie.includes("userid")){
            document.querySelector(".sign p").innerHTML = `مرحبا ${Cusername}`;
            document.querySelector(".sign p").classList.remove("unload");
        }
        fetchYourPosts();
    })
}else{
    document.querySelector(".yourPosts #yyy").innerHTML = '<p>يلزم تسجيل الدخول</p>'
}




const fetchYourPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    var zdiv = document.querySelector(".yourPosts #yyy");
    zdiv.innerHTML ='';
    querySnapshot.forEach((mydoc) => {
       if(mydoc.data().username == Cusername){
        zdiv.innerHTML+=`
        <div class="post">
            <div class="icon">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="zcontent">
                <p class="ques">${mydoc.data().post}</p>
                <div class="another">
                    <a href='./thepost.html?id=${mydoc.id}' target='_blank' class="answers"><i class="fa-solid fa-up-right-from-square"></i> عدد الاجابات : ${Object.values(mydoc.data().comments).length}</a>
                    <button class="removeQues" id="${mydoc.id}">حذف</button>
                </div>
            </div>
        </div>
        `;
       }
    })
    if(!document.querySelector(".yourPosts #yyy .post")){
        zdiv.innerHTML = '<p>لم تطرح سؤالا حتي الان</p>';
    }
    document.querySelectorAll(".removeQues").forEach((div)=>{
        div.addEventListener("click",()=>{
            deletePost(div)
        })
    })
}

const fetchPosts = async (category) => {
    if(category.length > 0){
        try{
            const colRef = collection(db, "posts"); // Replace "posts" with your collection name
            postsDev.innerHTML = '<p class="post nonono unload">لا توجد منشورات حتي الان</p>';
            for(var n=0 ; n<=category.length;n++){
                const q = query(colRef, where("category", "==", category[n])); // Specify the condition
                const querySnapshot = await getDocs(q);
                // Process the fetched documents
                querySnapshot.forEach((doc) => {
                    document.querySelector(".nonono")?document.querySelector(".nonono").remove():"";
                    const post = doc.data();
                    const div = document.createElement('div');
                    var theHtml;
                    div.className = `post`;
                    div.id = doc.id;
                    div.setAttribute("userid",post.userid);
                    theHtml = `
                        <div class="user ">
                            <div class="icon">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="info">
                                <p  class="name ">${post.username}</p>
                                <p class="detail "> ${post.time}</p>
                            </div>
                            <div class="categorydiv">
                                <p  class="category ">${post.category}</p>
                            </div>
                        </div>
                        <p class="question "> ${post.post}</p>
                        <!-- <div class="">
                            <img src="gm.jpg" class="img" alt="">
                        </div> -->
                        <div class="comments" style='display:none' >
                            
                        </div>
                        <div class="post-nav" > 
                            <div class='likes'>
                                <div class="icon" data-value='${post.likes}'>
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </div>
                                <p>اعجاب</p>
                            </div>
                            <a class="answers" href="./thepost.html?id=${doc.id}" target='_blank'> 
                                <div class="icon" data-value='${Object.values(post.comments).length}'>
                                    <i class="fa-solid fa-comment"></i>
                                </div>
                                <p>الاجابات</p>
                            </a>             
                            <div class="addComment">
                                <textarea cols="30" rows="4" placeholder="اكتب اجابتك........"></textarea>
                                <button class="sendComment btn" >ارسال</button>
                            </div> 
                            <div class="views">
                                <div class="icon" data-number="${post.views}">
                                    <i class="fa-solid fa-eye"></i>
                                </div>
                            </div>
                        </div>
              `;
              div.innerHTML = theHtml;
              postsDev.appendChild(div);
                });
            }
        }catch(err){
            console.error(err)
        }
    }else{
        try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            postsDev.innerHTML = "";
            querySnapshot.forEach((mydoc) => {
                const post = mydoc.data();
                const div = document.createElement('div');
                var theHtml;
                div.className = `post`;
                div.id = mydoc.id;
                div.setAttribute("userid",post.userid);
                theHtml = `
                    <div class="user ">
                        <div class="icon">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div class="info">
                            <p  class="name ">${post.username}</p>
                            <p class="detail "> ${post.time}</p>
                        </div>
                        <div class="categorydiv">
                            <p  class="category ">${post.category}</p>
                        </div>
                    </div>
                    <p class="question "> ${post.post}</p>
                    ${post.image?`<a href='${post.image}' target="_blank" style='text-align:center;display: block;'>
                    <img src="${post.image}" class="img" alt="صورة"></a>`:""}
                    <div class="comments" style='display:none' >
                        
                    </div>
                    <div class="post-nav" > 
                        <div class='likes'>
                            <div class="icon" data-value='${post.likes}'>
                                <i class="fa-solid fa-thumbs-up"></i>
                            </div>
                            <p>اعجاب</p>
                        </div>
                        <a class="answers" href="./thepost.html?id=${mydoc.id}" target='_blank'> 
                            <div class="icon" data-value='${Object.keys(post.comments).length}'>
                                <i class="fa-solid fa-comment"></i>
                            </div>
                            <p>الاجابات</p>
                        </a>             
                        <div class="addComment">
                            <textarea cols="30" rows="4" placeholder="اكتب اجابتك........"></textarea>
                            <button class="sendComment btn" >ارسال</button>
                        </div> 
                        <div class="views">
                            <div class="icon" data-number="${post.views}">
                                <i class="fa-solid fa-eye"></i>
                            </div>
                        </div>
                    </div>
          `;
          div.innerHTML = theHtml;
          postsDev.appendChild(div);
        })
        document.querySelectorAll(".post .addComment button").forEach((zbutton)=>{
            zbutton.addEventListener("click",()=>{
                var newComment = zbutton.parentElement.querySelector("textarea").value;
                var commentId = zbutton.parentElement.parentElement.parentElement;
                if(newComment){
                    addComment(newComment,commentId);
                }else{
                    document.querySelector(".post .addComment textarea").placeholder = "من فضلك اكتب اجابتك اولا";
                }
            })
        })
        document.querySelectorAll(".post-nav .likes").forEach((div)=>{
            div.onclick = (e)=>{
                if(document.cookie.includes("userid")){
                    var theid = div.parentElement.parentElement.id;
                    const docRef = doc(db, "posts", theid);
                    var numOfLikes = 0;
                    getDoc(docRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            numOfLikes = docSnapshot.data().likes;
                            // add the comment
                            var numberDiv = div.querySelector(".icon");
                            if(div.classList.contains("likedpost")){
                                div.classList.remove("likedpost");
                                numberDiv.setAttribute("data-value",parseInt(numberDiv.getAttribute("data-value"))-1);
                                numOfLikes -=1;
                                updateDoc(docRef, {
                                    likes: numOfLikes,
                                }).catch((error) => {console.error("Error updating document:", error)});
                            }else{
                                div.classList.add("likedpost");
                                numberDiv.setAttribute("data-value",parseInt(numberDiv.getAttribute("data-value"))+1);
                                numOfLikes +=1;
                                updateDoc(docRef, {
                                    likes: numOfLikes,
                                }).catch((error) => {console.error("Error updating document:", error)});
                            }
                            
                        } else {
                            console.log("No such document!");
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting document:", error);
                    });
                }else{
                    popUp.querySelector("p").innerHTML = 'يلزم تسجيل الدخول اولا';
                    popUp.style.scale='1';
                    overlay.style.scale ='1';
                }
            }
        })
      } catch (error) {
        console.error(error.message);
      }
        const colRef2 = collection(db, "posts"); // Replace with your collection name
        const q = query(colRef2, limit(5)); // Add the limit to fetch only 3 documents
        const querySnapshot2 = await getDocs(q);
        document.querySelector(".latestPosts>div").innerHTML = '';
        querySnapshot2.forEach((doc) => {
            var post = doc.data();
            document.querySelector(".latestPosts>div").innerHTML += `
            <div class="post">
                <div class="quse"><i class="fa-solid fa-square" ></i> <p class="question "> ${post.post}</p></div>
                <div><i class="fa-solid fa-circle" ></i> <p class="answer"> ${Object.values(post.comments)[0]?Object.values(post.comments)[0]:"لا توجد اجابة حتي الان "}</p></div>
            </div>
            `;
        });
    }
    
}

const adddposts = async (newPost,showUser,newCategory,newImage)=>{   
    if(document.cookie.includes("userid")){
    try {
        var date = new Date();
        const docRef = await addDoc(collection(db, "posts"), {
            post: newPost.value,
            username: showUser ? Cusername : "عضو مجهول",
            userid: cutStringFromLetter(document.cookie,"u").substr(7,20),
            time: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            views: 0,
            likes: 0,
            comments: {},
            category:newCategory,
            image:newImage
        });
        window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{
        popUp.querySelector("p").innerHTML = 'يلزم تسجيل الدخول اولا';
        popUp.style.scale='1';
        overlay.style.scale ='1';
        document.querySelector(".askSomeForm").style.top ='-100%';
    }
}



const addComment = (newComment,comment)=>{
    // get the post data
    if(document.cookie.includes("userid")){
        const docRef = doc(db, "posts", `${comment.id}`);
        comment.classList.add("unload");
        var postcomments = {};
        getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                postcomments = docSnapshot.data().comments;
                postcomments[`${Cusername}`]?postcomments[`${Cusername}`].push(newComment):postcomments[`${Cusername}`]=[newComment]; 
                // postcomments.push(newComment);
                console.log(postcomments);
                // add the comment
                updateDoc(docRef, {
                    comments: postcomments,
                }).then(() => {
                    // comment.style.classList.toggle("unload");
                    popUp.querySelector("p").innerHTML = 'تم ارسال اجابتك بنجاح';
                    popUp.style.scale='1';
                    overlay.style.scale ='1';
                    fetchPosts([]);
                    fetchYourPosts();
                }).catch((error) => {
                    console.error("Error updating document:", error);
                });
                console.log("Document data:", docSnapshot.data().comments);
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });
    }else{
        popUp.querySelector("p").innerHTML = 'يلزم تسجيل الدخول اولا';
        popUp.style.scale='1';
        overlay.style.scale ='1';
    }
    
}
const deletePost = async (e)=>{
    const postId = e.id;
    try{
        await deleteDoc(doc(db, 'posts',postId));
        e.parentElement.parentElement.parentElement.remove();
        popUp.querySelector("p").innerHTML = 'تم حذف سؤالك بنجاح';
        popUp.style.scale='1';
        overlay.style.scale ='1';
        fetchPosts([]);
    }catch (err) {
        console.error(err)
    }
}

const logout = ()=>{
    document.cookie = 'userid' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = './login.html';
}


function cutStringFromLetter(str, letter) {
    const index = str.indexOf(letter); // Find the first occurrence of the letter
    if (index === -1) {
        return ""; // If the letter is not found, return an empty string
    }
    return str.substring(index); // Extract substring from the found index to the end
}

function getTheCategory(){
    var categorys = [];
    document.querySelectorAll(".search div").forEach((div)=>{
        if(div.querySelector("input").checked){
            categorys.push(div.querySelector("input").value)
        }
    })
    return categorys;
}
document.querySelectorAll(".search div").forEach((div)=>{
    div.querySelector("input").addEventListener("click",()=>{
        fetchPosts(getTheCategory());
        console.log(getTheCategory())
    })
})



fetchPosts([]);
export {fetchPosts,adddposts};

