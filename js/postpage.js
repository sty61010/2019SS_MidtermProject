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

    var postsRef = firebase.database().ref('post_list1/'+id+'/comment_list');
    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
            var newPostKey = postsRef.child().push().key;
            var postData = {
                id:newPostKey,
                email:user_email,
                post:post_txt.value
            };
            var updates = {};
            updates[newPostKey] = postData;
            postsRef.update(updates);
            post_txt.value = "";
        }
    });


    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";


    var total_post = [];

    postsRef.on('value', function (snapshot) {
        total_post = [];
        document.getElementById('post_list').innerHTML = "";
        for (var i in snapshot.val()) {
            "<p>" +
            str_before_username +
            snapshot.val()[i].email + "</strong>" + snapshot.val()[i].post + 
            str_after_content + 
            "</p > ";
        }
        document.getElementById('post_list').innerHTML = total_post;

    });

}
window.onload = function () {
    init();
};
