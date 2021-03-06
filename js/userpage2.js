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
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('post');
    
    var postsRef = firebase.database().ref('post_list2');
    post_btn.addEventListener('click', function () {
        if(post_txt.value.search("<")!==-1){
            alert("No html inclusion");
        }
        else{
            if (post_txt.value != "") {
                var newPostKey = firebase.database().ref().child('post_list2').push().key;
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
                window.location.href = "postlistpage2.html";            
            }
        }
    });

}
window.onload = function () {
    init();
};