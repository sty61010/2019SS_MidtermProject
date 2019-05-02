function init() {
    var user_email = '';
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

        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    
    var url=window.location.search; 
    var id;

    id = url.substr(url.indexOf("?")+1);

    console.log(id);

    // var postsRef = firebase.database().ref('post_list1/'+id+'/comment_list');
    var postsRef = firebase.database().ref('post_list4');
    var total_post = [];
    postsRef.once('value', function (snapshot) {
        total_post = [];
        var index=0;
        document.getElementById('post_list').innerHTML = "";
        for (var i in snapshot.val()) {
            index++;
            if(index==id)
            {
                total_post +=
                "<p><div class='my-3 p-3 bg-white rounded box-shadow'>"+
                "<div class='my-2 border-bottom border-dark'><strong>PostID:</strong>"+i+"</div>"+
                "<div class='media text-muted pt-3'>"+
                "<img src='account.png'  class='mr-2 rounded' style='height:32px; width:32px;'>"+
                "<p class='media-body pb-2 mb-2 small lh-125 border-bottom border-gray'>"+"<strong class='d-block text-blue-dark'>"+snapshot.val()[i].email + "</strong>" +"</p>"+
                "</div>"+
                "<h3 class='pb-4 mb-4 my-3 border-bottom   border-blue  '>"+"Topic:"+"<strong>"+ snapshot.val()[i].post +"</strong>"+"</h3>"+
                //  "<img src='like.jpg'  class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_like("+index+","+snapshot.val()[i].like+")'>"+
                //  "<img src='fuck.jpeg' class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_fuck("+index+","+snapshot.val()[i].fuck+")'>"+
                "<p class='media-body pb-1 mb-1 lh-125  border-bottom border-blue' style='text-shadow:1px 1px 0 #444; color:gray'>"+
                "<strong>"+
                "<img src='like1.png'  class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_like("+index+","+snapshot.val()[i].like+")'>"+snapshot.val()[i].like +
                "<img src='fuck1.png' class='mr-2 rounded' style='height:40px; width:40px;' role='button' onclick='push_fuck("+index+","+snapshot.val()[i].fuck+")'>"+snapshot.val()[i].fuck +
                "</strong>"+
                "</p>"+
                "<p class='media-body pb-3 mb-3 small lh-125 border-bottom border-gray'>"+snapshot.val()[i].time +"</p>"+
                "</div>\n </p > ";
            }

        }
        document.getElementById('post_list').innerHTML = total_post;
    })


    var comRef=firebase.database().ref('com_list4'+id);
    post_btn.addEventListener('click', function () {
        if(post_txt.value.search("<")!=-1){
            alert("No html inclusion");
        }
        else{
            if (post_txt.value != "") {
                var newPostKey = firebase.database().ref().child('com_list1'+id).push().key;
                var comData = {
                    id:newPostKey,
                    email:user_email,
                    comment:post_txt.value,
                    like:0,
                    fuck:0,
                    time:Date(),
                    del:1
                };
                var updates = {};
                updates[newPostKey] = comData;
                comRef.update(updates);
                post_txt.value = "";
            }
        }
    });
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";
    var total_com = [];
    comRef.on('value', function (snapshot) {
        total_com = [];
        document.getElementById('com_list').innerHTML = "";
        for (var i in snapshot.val()) {
            total_com +=
             "<p><div class='my-3 p-3 bg-white rounded box-shadow'>"+
             "<div class='media text-muted pt-3'>"+
             "<img src='user.png'  class='mr-2 rounded' style='height:32px; width:32px;'>"+
             "<div class='media-body pb-3 mb-3 small lh-125 border-bottom border-gray'>"+"<strong class='d-block text-blue-dark'>"+snapshot.val()[i].email + ":</strong>"+
             "<h6>"+snapshot.val()[i].comment+ "</h6>"+
             "</div>"+
             "</div>"+
            //  "<p class='border-bottom border-blue pb-2 '>"+"<strong>"+ snapshot.val()[i].comment +"</strong>"+"</p>"+
             "</div>\n </p > ";
        }
        document.getElementById('com_list').innerHTML = total_com;

    });

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
window.onload = function () {
    init();
};
