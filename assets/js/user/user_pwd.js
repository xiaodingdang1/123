//! 密码验证表单
const form = layui.form;

form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  //   新密码验证
  samePwd: (val) => {
    if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
  },
  //   两次输入是否一致
  rePwd: (val) => {
    if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
  },
});

const layer = layui.layer;

//! 发送请求，重置密码
$(".layui-form").on("submit", (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/updatepwd",
    data: $(".layui-form").serialize(),
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("更新密码失败！");
      layer.msg(
        "请在2S后重新登录",
        {
          icon: 1,
          time: 2000, //2秒关闭（如果不配置，默认是3秒）
        },
        function () {
          setTimeout(function () {
            //  强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            window.parent.location.href = "/login.html";
          }, 2000);
        }
      );
      //   layer.open({
      //     title: "更新密码成功！",
      //     content: "2S后请重新登录",
      //   });
      //   setTimeout(function () {
      //     //  强制清空 token
      //     localStorage.removeItem("token");
      //     // 强制跳转到登录页面
      //     window.parent.location.href = "/login.html";
      //   }, 2000);
      // 重置表单
      $(".layui-form")[0].reset();
    },
  });
});
