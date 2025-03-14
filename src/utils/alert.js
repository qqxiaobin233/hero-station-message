// 弹窗插件
// 需要先准备 alert 样式相关的 DOM
/**
 * BS 的 Alert 警告框函数，2秒后自动消失
 * @param {*} isSuccess 成功 true，失败 false
 * @param {*} msg 提示消息
 */
export function Myalert(isSuccess,msg){
  const myalert = document.querySelector('.alert')
  myalert.classList.add(isSuccess?'alert-success':'alert-danger')
  myalert.innerText = msg
  myalert.classList.add('show')
  setTimeout(()=>{
  myalert.classList.remove(isSuccess?'alert-success':'alert-danger')
  myalert.innerHTML = ''
  myalert.classList.remove('show')
  },2000)
}