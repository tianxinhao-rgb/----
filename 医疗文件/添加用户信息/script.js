document.getElementById('userForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent form from submitting normally  
  
    // Get form values  
    var username = document.getElementById('username').value;  
    var email = document.getElementById('email').value;  
    var password = document.getElementById('password').value;
    // Validate form inputs (simple example)  
    if (username === '' || email === '' || password === '') {  
        alert('Please fill in all fields.');  
        return;  
    }  
    var fileInput = document.getElementById('file1'); // 获取文件输入元素  
var files = fileInput.files; // 获取用户选择的文件列表  
  
// 如果用户选择了文件，files.length 会大于 0  
if (files.length > 0) {  
    // 你可以处理第一个文件，或者遍历整个文件列表  
    var firstFile = files[0]; // 获取第一个文件对象  
      
    // 这里可以执行你需要的操作，比如查看文件名、大小等  
    console.log('文件名:', firstFile.name);  
    console.log('文件大小:', firstFile.size);  
    console.log('文件类型:', firstFile.type);  
      
    // 如果你需要读取文件内容，可以使用FileReader API  
    var reader = new FileReader();  
    reader.onload = function(e) {  
        // 当文件读取完成后，这里会执行，e.target.result 包含文件内容  
        console.log('文件内容:', e.target.result);  
    };  
    reader.readAsText(firstFile); // 以文本形式读取文件，或者你可以使用readAsDataURL, readAsArrayBuffer等  
} else {  
    console.log('没有选择文件');  
}
  
    // Display a message to the user  
    document.getElementById('message').textContent = 'User information added successfully!';  
      
    // TODO: Send the user information to the server  
    // You might use AJAX (fetch API, axios, etc.) for this  
      
    // Clear form inputs  
    document.getElementById('userForm').reset();  
});