// script.js  
document.addEventListener('DOMContentLoaded', function() {  
    var registerForm = document.getElementById('registerForm');  
  
    registerForm.addEventListener('submit', function(event) {  
        event.preventDefault(); // 阻止表单默认提交  
        var usernameInput = document.getElementById('registerUsername');  
        var emailInput = document.getElementById('registerEmail');  
        var passwordInput = document.getElementById('registerPassword');  
        var confirmPasswordInput = document.getElementById('confirmPassword');  
  
        // 简单的表单验证  
        if (usernameInput.value === '') {  
            alert('请输入用户名');  
            return;  
        }  
        if (emailInput.value === '') {  
            alert('请输入电子邮件');  
            return;  
        }  
        if (passwordInput.value === '') {  
            alert('请输入密码');  
            return;  
        }  
        if (confirmPasswordInput.value === '') {  
            alert('请再次输入密码');  
            return;  
        }  
        if (passwordInput.value !== confirmPasswordInput.value) {  
            alert('两次输入的密码不一致');  
            return;  
        }  
  
        // 如果所有验证通过，则提交表单  
        registerForm.submit();  
    });  
  
    // 重新发送确认邮件的函数  
    var resendLink = document.querySelector('.resend-link');  
    resendLink.addEventListener('click', function(event) {  
        event.preventDefault(); // 阻止链接的默认行为  
        alert('正在重新发送确认邮件...');  
        // 这里应该是AJAX调用或者页面跳转来重新发送确认邮件  
    });  
});