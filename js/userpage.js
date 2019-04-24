function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";

            /// TODO 5: Complete logout button event
            ///         1. Add a listener to logout button 
            ///         2. Show alert when logout success or error (use "then & catch" syntex)
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
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('post');
    
    var postsRef = firebase.database().ref('post_list');
    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
            /// TODO 6: Push the post to database's "com_list" node
            ///         1. Get the reference of "com_list"
            ///         2. Push user email and post data
            ///         3. Clear text field
            postsRef.push({email:user_email, post:post_txt.value});
            post_txt.value = "";
            window.location.href = "index.html";            
        }
    });


    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent Topics</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    // List for store posts html
    var total_post = [];

    }
window.onload = function () {
    init();
};