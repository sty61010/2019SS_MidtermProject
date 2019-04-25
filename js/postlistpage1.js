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
    // The html code for post
    var str_before_username =
     "<div class='my-3 p-3 bg-white rounded box-shadow'><h5 class='border-bottom border-gray pb-2 '>Recently Topic</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    // List for store posts html
    var total_post = [];
    postsRef.on('value', function (snapshot) {
        total_post = [];
        document.getElementById('post_list').innerHTML = "";
        for (var i in snapshot.val()) {
            total_post +=
             "<p><div class='my-3 p-3 bg-white rounded box-shadow'>"+
             "<div class='media text-muted pt-3'>"+
             "<img src='account.png'  class='mr-2 rounded' style='height:32px; width:32px;'>"+
             "<p class='media-body pb-3 mb-3 small lh-125 border-bottom border-gray'>"+
             "<strong class='d-block text-blue-dark'>"+snapshot.val()[i].email + "</strong>" +
             "</p>"+
             "</div>"+
             "<h5 class='border-bottom border-gray pb-2 '>"+"Topic:"+"<strong>"+ snapshot.val()[i].post +"</strong>"+"</h5>"+
            "<a class='btn btn-danger' href='postpage.html' role='button'>Go Check</a>"+
             "</div>\n </p > ";
            document.getElementById('post_list').innerHTML = total_post;
        }
    })

}
window.onload = function () {
    init();
};