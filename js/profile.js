function init() {
    var user_email = '';
    var user_name;
    var user_hobby;
    var user_identity;
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
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
            });
            document.getElementById("email").innerHTML=user_email;
        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });
    var name_btn=document.getElementById("name_btn");
    var nameinput=document.getElementById("nameinput");
    name_btn.addEventListener('click', function () {
        document.getElementById('name').innerHTML = nameinput.value;
    });

    var hobby_btn=document.getElementById("hobby_btn");
    var hobbyinput=document.getElementById("hobbyinput");
    hobby_btn.addEventListener('click', function () {
        document.getElementById('hobby').innerHTML = hobbyinput.value;

    });

    var identity_btn=document.getElementById("identity_btn");
    var identityinput=document.getElementById("identityinput");
    identity_btn.addEventListener('click', function () {
        document.getElementById('identity').innerHTML = identityinput.value;

    });
    post_txt = document.getElementById('comment');
    post_btn = document.getElementById('post_btn');
    var postsRef = firebase.database().ref('post_list0');
    post_btn.addEventListener('click', function () {
        if(post_txt.value.search("<")!==-1){
            alert("No html inclusion");
        }
        else{
            if (post_txt.value != "") {
                var newPostKey = firebase.database().ref().child('post_list0').push().key;
                var postData = {
                    id:newPostKey,
                    email:user_email,
                    post:post_txt.value,
                    like:0,
                    fuck:0,
                    time:Date()
                };
                var updates = {};
                updates[newPostKey] = postData;
                postsRef.update(updates);
                post_txt.value = "";
                window.location.href = "postlistpage1.html";            
            }
        }
    });
    var str_before_username = "<div class='my-3 p-3 bg-dark rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent comments</h6><div class='media text-muted pt-3'><img src='logo.png' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small text-white border-bottom border-gray'><strong class='d-block text-white'>";
    var str_after_content = "</p></div></div>\n";


    var total_post = [];
    postsRef.on('value', function (snapshot) {
        total_post = [];
        document.getElementById('post_list').innerHTML = "";
        for (var i in snapshot.val()) {
            total_post +=
             "<p>" +
            str_before_username + 
            snapshot.val()[i].email +
            "</strong>" + snapshot.val()[i].post + 
            str_after_content +
            "</p > ";
            document.getElementById('post_list').innerHTML = total_post;
        }
    })
}
// Notification
var notifyConfig = {
        body: "\ Here is Notify!  ",
        icon: "notification.png"
    }
    
function createNotify() {
    if (!("Notification" in window)) { // 檢查瀏覽器是否支援通知
        console.log("This browser does not support notification");
    } else if (Notification.permission === "granted") { // 使用者已同意通知
        var notification = new Notification(
            "Here is a Notification.", notifyConfig
        );
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                var notification = new Notification("Here is a Notification.", notifyConfig);
            }
        });
    }
}
// Notification
window.onload = function () {
    init();
};
