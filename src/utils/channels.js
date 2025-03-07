//频道切换
// 获取主下拉框和子下拉框元素

const mainSelect = document.getElementById('mainSelect');
const subSelect = document.getElementById('subSelect');

// 为主下拉框添加 change 事件监听器
mainSelect.addEventListener('change', function () {
  // 获取当前选择的值
  const selectedValue = this.value;
  // 清空子下拉框原有的选项
  subSelect.innerHTML = '';

  if (selectedValue === '1') {
    // 如果选择的是年度人物
    subSelect.style.visibility = 'visible';
    const years = ['2023', '2022', '2021'];
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      subSelect.appendChild(option);
    });
  } else if (selectedValue === '2') {
    // 如果选择的是时代英雄
    subSelect.style.visibility = 'visible';
    const periods = ['疫情时期', '抗战时期', '革命时期'];
    periods.forEach(period => {
      const option = document.createElement('option');
      option.value = period;
      option.textContent = period;
      subSelect.appendChild(option);
    });
  } else {
    // 如果选择的是请选择模块
    subSelect.style.visibility = 'hidden';
  }
});