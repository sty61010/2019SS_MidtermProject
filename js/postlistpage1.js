function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";

            var logout_btn = document.getElementById("logout-btn")
            logout_btn.addEventListener('click', function () {
                firebase.auth().signOut()
                .then(function () {
                    console.log("Sign Out Success");
                    window.location.href = "signin.html";
                })
                .catch(function () {
                    console.log("Sign Out Error");
                });
            })
        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });
    var postsRef = firebase.database().ref('post_list1');

    var total_post = [];
    postsRef.on('value', function (snapshot) {
        total_post = [];
        var index=0;
        document.getElementById('post_list').innerHTML = "";
        for (var i in snapshot.val()) {
            index++;
            total_post +=
            "<p><div class='my-3 p-3 bg-white rounded box-shadow'>"+
            "<div class='my-2 border-bottom border-dark'><strong>PostID:</strong>"+i+"</div>"+
            "<div class='media text-muted pt-3'>"+
            "<img src='account.png'  class='mr-2 rounded' style='height:32px; width:32px;'>"+
            "<p class='media-body pb-3 mb-3 small lh-125 border-bottom border-gray'>"+"<strong class='d-block text-blue-dark'>"+snapshot.val()[i].email + "</strong>" +"</p>"+
            "</div>"+
            "<h5 class='border-bottom border-blue pb-2 '>"+"Topic:"+"<strong>"+ snapshot.val()[i].post +"</strong>"+"</h5>"+
            //  "<img src='like.jpg'  class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_like("+index+","+snapshot.val()[i].like+")'>"+
            //  "<img src='fuck.jpeg' class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_fuck("+index+","+snapshot.val()[i].fuck+")'>"+
            "<p class='media-body pb-3 mb-3  lh-125' style='blue sans-serif'>"+
            "<img src='like.jpg'  class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_like("+index+","+snapshot.val()[i].like+")'>"+snapshot.val()[i].like +
            "<img src='fuck.jpeg' class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_fuck("+index+","+snapshot.val()[i].fuck+")'>"+snapshot.val()[i].fuck +
            "<a class='btn btn-danger' "+" role='button' onclick='getID("+index+")')>Go Check</a>"+

            "</p>"+
            "<p class='media-body pb-3 mb-3 small lh-125 border-bottom border-gray'>"+snapshot.val()[i].time +"</p>"+
            "</div>\n </p > ";
        }
        document.getElementById('post_list').innerHTML = total_post;
    })
}

var postsRef = firebase.database().ref('post_list1');
function push_like(index, like_value){
    console.log("index", index);
    count=0;
    like_value++;
    postsRef.once('value', function (snapshot) {
        for (var i in snapshot.val()) {
            count++;
            if(count==index){
                var ID=snapshot.val()[i].id;
                console.log("ID",ID);
                firebase.database().ref('post_list1/' + ID).set({
                        id:ID,
                        email:snapshot.val()[i].email,
                        post:snapshot.val()[i].post,
                        like:like_value,
                        time:snapshot.val()[i].time,
                        fuck:snapshot.val()[i].fuck
                    }); 
            }
        }
    });
    console.log("like_value", like_value);
}
function push_fuck(index, fuck_value){
    console.log("index",index);
    count=0;
    fuck_value++;
    postsRef.once('value', function (snapshot) {
        for (var i in snapshot.val()) {
            count++;
            if(count==index){
                var ID=snapshot.val()[i].id;
                console.log("ID",ID);
                firebase.database().ref('post_list1/' + ID).set({
                        id:ID,
                        email:snapshot.val()[i].email,
                        post:snapshot.val()[i].post,
                        like:snapshot.val()[i].like,
                        time:snapshot.val()[i].time,
                        fuck:fuck_value
                    }); 
            }
        }
        console.log("fuck_value", snapshot.val()[i].fuck);
    });
}

function getID(ID){
    console.log(ID);
    window.location.href="postpage1.html?"+ID;
};
window.onload = function () {
    init();
};