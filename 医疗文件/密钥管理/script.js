document.getElementById('add-key-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    var keyName = document.getElementById('key-name-input').value;
    if (keyName.trim() !== '') {
      var keyItem = document.createElement('div');
      keyItem.className = 'key-item';
      var keyNameSpan = document.createElement('span');
      keyNameSpan.className = 'key-name';
      keyNameSpan.textContent = keyName;
      keyItem.appendChild(keyNameSpan);
      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '删除';
      deleteBtn.addEventListener('click', function() {
        keyItem.remove(); // 删除密钥项元素
      });
      keyItem.appendChild(deleteBtn);
      var keyList = document.querySelector('.key-list');
      keyList.appendChild(keyItem); // 将新的密钥项添加到列表中
      document.getElementById('key-name-input').value = ''; // 清空输入框值
    } else {
      alert('请输入密钥名称！'); // 提示用户输入密钥名称
    }
  });