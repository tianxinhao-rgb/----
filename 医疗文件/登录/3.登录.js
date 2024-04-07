// script.js  
document.addEventListener('DOMContentLoaded', function() {  
    // 注册表单验证逻辑...  
  
    // 登录表单验证逻辑  
    var loginForm = document.getElementById('loginForm');  
      
    loginForm.addEventListener('submit', function(event) {  
        event.preventDefault(); // 阻止表单默认提交  
        var usernameInput = document.getElementById('loginUsername');  
        var passwordInput = document.getElementById('loginPassword');  
  
        // 简单的表单验证  
        if (usernameInput.value === '') {  
            alert('请输入用户名');  
            return;  
        }  
        if (passwordInput.value === '') {  
            alert('请输入密码');  
            return;  
        }  
  
        // 如果验证通过，可以发送AJAX请求到服务器验证用户名和密码  
        // 这里为了演示，我们仅显示一条消息  
        alert('登录信息已验证，正在登录...');  
          
        // 在实际项目中，这里应该是发送登录请求，并根据服务器响应处理登录结果  
        // 例如，如果登录成功，可以重定向到用户主页；如果失败，可以显示错误信息  
    });  
  
    // 重新发送确认邮件的函数...  
});