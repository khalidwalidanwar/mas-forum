import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp ,deleteDoc,doc,updateDoc,getDoc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

var thDefault = `div class="post" id="firstPost">
<div class="user ">
    <div class="icon">
        <i class="fa-solid fa-user"></i>
    </div>
    <div class="info">
        <p  class="name unload">حجابي سر سعادتي</p>
        <p class="detail unload"> متصل الان</p>
    </div>
</div>
<p class="question unload"> هل محلات الجزارة تبيع اللحم ؟ </p>
<!-- <div class="">
    <img src="gm.jpg" class="img" alt="">
</div> -->
<div class="post-nav" > 
    <div>
        <div class="icon">
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        <p>اعجاب</p>
    </div>           
    <div>
        <div class="icon">
            <i class="fa-solid fa-share"></i>
        </div>
        <p>مشاركة</p>
    </div>
    <div class="answers">
        <div class="icon">
            <i class="fa-solid fa-comment"></i>
        </div>
        <p>الاجابات</p>
    </div>             
    <div class="views">
        <div class="icon">
            <i class="fa-solid fa-eye"></i>
        </div>
    </div>
</div>
</div>
<div class="post">
<div class="user ">
    <div class="icon">
        <i class="fa-solid fa-user"></i>
    </div>
    <div class="info">
        <p  class="name unload">حجابي سر سعادتي</p>
        <p class="detail unload"> متصل الان</p>
    </div>
</div>
<p class="question unload">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem odio exercitationem debitis aliquam doloremque aperiam laborum adipisci, officia error numquam quasi temporibus sint harum saepe ullam mollitia? Soluta, facilis?</p>
<!-- <div class="">
    <img src="gm.jpg" class="img" alt="">
</div> -->
<div class="post-nav" > 
    <div>
        <div class="icon">
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        <p>اعجاب</p>
    </div>               
    <div class="answers">
        <div class="icon">
            <i class="fa-solid fa-comment"></i>
        </div>
        <p>الاجابات</p>
    </div>             
    <div>
        <div class="icon">
            <i class="fa-solid fa-share"></i>
        </div>
        <p>مشاركة</p>
    </div>
    <div class="views">
        <div class="icon">
            <i class="fa-solid fa-eye"></i>
        </div>
    </div>
</div>
</div>
`;

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

const fetchLatestPosts = async (postsDev) => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

}
const fetchPosts = async (postsDev) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        postsDev.innerHTML = "";
        document.querySelector(".latestPosts>div").innerHTML = '';
        querySnapshot.forEach((mydoc) => {
            // deleteDoc(doc(db, 'posts',mydoc.id));
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
                <!-- <div class="">
                    <img src="gm.jpg" class="img" alt="">
                </div> -->
                <div class="comments" >
                    `;
                    for(var i=0;i < post.comments.length;i++){
                        theHtml+= `
                        <div class="comment">
                            <div class="content">
                                <p class="username">خالد وليد انور</p>
                                <p class="thcomment">${post.comments[i]}</p>
                                <!-- <img src="./gm.jpg"> -->
                            </div>
                            <div class="pic">
                                <div class="icon">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                    theHtml +=`
                </div>
                <div class="post-nav" > 
                    <div>
                        <div class="icon" data-value='${post.likes}'>
                            <i class="fa-solid fa-thumbs-up"></i>
                        </div>
                        <p>اعجاب</p>
                    </div>
                    <div class="answers" href="./theanswer" target='_blank'> 
                        <div class="icon" data-value='${post.comments.length}'>
                            <i class="fa-solid fa-comment"></i>
                        </div>
                        <p>الاجابات</p>
                    </div>             
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
      if(!querySnapshot.metadata.fromCache){
        document.querySelector(".latestPosts>div").innerHTML += `
        <div class="post">
            <div class="quse"><i class="fa-solid fa-square" ></i> <p class="question "> ${post.post}</p></div>
            <div><i class="fa-solid fa-circle" ></i> <p class="answer"> ${post.comments[0]?post.comments[0]:"لا توجد اجابة حتي الان "}</p></div>
        </div>
        `;
      }
    //   document.querySelectorAll(".latestPosts .post").forEach((latest)=>{
    //     latest.querySelector(".quse").innerHTML = post.post;
    //     latest.querySelector(".answer").innerHTML = post.comments[0];
    //   })
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
    document.querySelectorAll(".posts .post .answers").forEach((post)=>{
        post.addEventListener("click",()=>{
            post.parentElement.parentElement.querySelector(".comments").classList.toggle("open");
        })
    })
  } catch (error) {
    console.error(error.message);
  }
}

const adddposts = async (newPost,showUser,newCategory,newImage)=>{   
    try {
        var date = new Date();
        const docRef = await addDoc(collection(db, "posts"), {
            post: newPost,
            postid: Math.random().toString(16).substr(2, 20),
            username: showUser ? "خالد وليد انور" : "عضو مجهول",
            userid: Math.random().toString(16).substr(2, 20),
            time: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            views: 0,
            likes: 0,
            comments: [],
            category:newCategory,
            image:newImage
        });
        window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}



const addComment = (newComment,comment)=>{
    const docRef = doc(db, "posts", `${comment.id}`);
    comment.classList.add("unload");
    var postcomments = [];
    // get the post data
    getDoc(docRef)
    .then((docSnapshot) => {
        if (docSnapshot.exists()) {
            postcomments = docSnapshot.data().comments;
            postcomments.push(newComment);
            console.log(postcomments);
            // add the comment
            updateDoc(docRef, {
                comments: postcomments,
            }).then(() => {
                // comment.style.classList.toggle("unload");
                fetchPosts(document.querySelector(".posts"));
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
    
}

export {fetchPosts,adddposts};

