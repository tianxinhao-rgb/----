window.onload = function() {
    // 获取 select 元素
    var selectElement = document.getElementById('mySelect');
  
    // 绑定 change 事件监听器
    selectElement.addEventListener('change', function() {
      // 获取选中的 option 的 value（这里我们假定它是一个 URL）
      var url = this.value;
      
      // 检查 url 是否有效
      if (url) {
        // 执行跳转
        window.location.href = url;
      } else {
        // 如果 url 为空或无效，可以给出提示或执行其他操作
        console.log('无效的跳转链接');
      }
    });
  };