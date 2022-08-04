const getUserInfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: null,
        success: res => {
            console.log(res)
            renderAvatar(res.data)
        },
    })
}
const renderAvatar = data => {
    let name = data.nickname || data.username
    console.log(name);

    $('#welcome').html('欢迎' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstNmae = name[0].toUpperCase()
        $('.text-avater').html(firstNmae)
    }
}
getUserInfo()
$("#exitBtn").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});