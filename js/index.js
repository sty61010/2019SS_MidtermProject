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
            })
        } else {

            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            // document.getElementById('post_list').innerHTML = "";
        }
    });
    var postlistpage1=document.getElementById("postlistpage1");
    postlistpage1.addEventListener('click', function () {
        window.location.href = "postlistpage1.html";            
    });
    var postlistpage2=document.getElementById("postlistpage2");
    postlistpage2.addEventListener('click', function () {
        window.location.href = "postlistpage2.html";            
    });
    // post_btn = document.getElementById('post_btn');
    // post_txt = document.getElementById('comment');
    
    // var postsRef = firebase.database().ref('post_list');
    // var userpage_btn=document.getElementById('userpage');
    // userpage_btn.addEventListener('click', function () {
    //     window.location.href = "userpage.html";            
    // });
    // var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    // var str_after_content = "</p></div></div>\n";


    // var total_post = [];
    // postsRef.on('value', function (snapshot) {
    //     total_post = [];
    //     document.getElementById('post_list').innerHTML = "";
    //     for (var i in snapshot.val()) {
    //         total_post +=
    //          "<p>" +str_before_username + snapshot.val()[i].email + "</strong>" + snapshot.val()[i].post + str_after_content + "</p > ";
    //         document.getElementById('post_list').innerHTML = total_post;
    //     }
    // })
}
// function Notification(){
//     if (!('Notification' in window)){
//         console.log('This browser does not support notification');
//     }
//     if (Notification.permission === 'default' || Notification.permission === 'undefined') {
//         Notification.requestPermission(function (permission) {
//           // permission 可為「granted」（同意）、「denied」（拒絕）和「default」（未授權）
//           // 在這裡可針對使用者的授權做處理
//         });
//       }
//     var notifyConfig = {
//         body: 'notification', // 設定內容
//         icon: 'notification.png' // 設定 icon
//       };
      
//     if (Notification.permission === 'default' || Notification.permission === 'undefined') {
//         Notification.requestPermission(function (permission) {
//             if (permission === 'granted') { // 使用者同意授權
//                 var notification = new Notification('Hi there!', notifyConfig); // 建立通知

                  
//                 notify.onclick = function(e) { // 綁定點擊事件
//                     e.preventDefault(); // prevent the browser from focusing the Notification's tab
//                     console.log("Here is Notification!")
//                 }
//             }
//         });
//     }

// }
var notifyConfig = {
    body: "\\ ^o^ /",
    icon: "https://cythilya.github.io/public/favicon.ico"
  }
  
  function createNotify() {
    if (!("Notification" in window)) { // 檢查瀏覽器是否支援通知
        console.log("This browser does not support notification");
    } else if (Notification.permission === "granted") { // 使用者已同意通知
        var notification = new Notification(
            "Thanks for granting this permission.", notifyConfig
        );
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
        if (permission === "granted") {
            var notification = new Notification("Hi there!", notifyConfig);
        }
    });
    }
  }
  
window.onload = function () {
    init();
};