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
            "<a class='btn btn-danger' "+
            // "href='postpage.html'"+
            " role='button' >Go Check</a>"+
             "</div>\n </p > ";
        }
        document.getElementById('post_list').innerHTML = total_post;

    })


}
var idRef=firebase.database().ref('ID');

function getID(ID){
    // var newPostKey = idRef.child().push().key;
    // var postData = {
    //     value:ID
    // };
    console.log(ID);
    // var updates = {};
    // updates[newPostKey] = postData;
    // postsRef.update(updates);

};
window.onload = function () {
    init();
};