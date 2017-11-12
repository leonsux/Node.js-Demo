// 表单验证
form_Check()
function form_Check(){
    // 用户名
    $('#username').blur(function(){
        let val = $(this).val()
        $(this).attr('f', 0);
        if (/^[0-9a-z]{1,10}$/i.test(val)) {
            console.log("ok");
            $(this).attr('f', 1);
            // $(this).next().css({ display: 'none' });
        } else {
            $(this).attr('f', 0);
            // $(this).next().css({ display: 'inline' });
        }
    })
    // 密码
    $("#psw").blur(function () {
        var val = $(this).val();
        $(this).attr('f', 0);
        if (/^\w{6,}$/.test(val) && /\d/.test(val) && /[a-z]/.test(val)) {
            console.log("ok");
            $(this).attr('f', 1);
            // $(this).next().css({ display: 'none' });
        } else {
            $(this).attr('f', 0);
            // $(this).next().css({ display: 'inline' });
        }
    })
    // 密码确认
    $("#confpsw").blur(function () {
        var val = $(this).val();
        $(this).attr('f', 0);
        if (val == $("#psw").val()) {
            console.log("ok");
            $(this).attr('f', 1);
            // $(this).next().css({ display: 'none' });
        } else {
            $(this).attr('f', 0);
            // $(this).next().css({ display: 'inline' });
        }
    })
}


// 注册
function register(){
    if ($("#username").attr('f') == 1) {
        if ($("#psw").attr('f') == 1) {
            if ($("#confpsw").attr('f') == 1) {
                console.log("it's ok！")
                deal()
                // window.location = "../index.html";
            } else {
                $("#confpsw").focus();
            }
        } else {
            $("#psw").focus();
        }
    } else {
        $("#username").focus();
    }
}

function deal(){
    let username = $("#username").val()
    let password = $("#psw").val()
    let nickname = $("#nickname").val()

    $.ajax({
        url: '/api/register',
        type: 'POST',
        data: {
            username: username,
            password: password,
            nickname: nickname
        },
        success: function(result){
            if (result) {
                window.location.href = '/static/html/login.html'
            } else {
                alert("用户名已存在！")
            }
        }
    })

    console.log(username, password, nickname)
}

// 清除默认行为
$("#login-form").submit(function(e){
    e.preventDefault()
    register()
})