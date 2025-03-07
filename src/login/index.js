import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import './index.less'

import myAxios from '@/utils/request.js'
import { Myalert } from '@/utils/alert.js'

document.querySelector('.btn').addEventListener('click', () => {
  const password = document.querySelector('.login-form [name=password]').value
  const username = document.querySelector('.login-form [name=username]').value
  myAxios({
    method:'post',
    url:'/admin/employee/login',
    data:{
      password,
      username
    }
  }).then(result=>{
    Myalert(true,'登录成功')
    localStorage.setItem('token',result.data.token)
    setTimeout(() => {
      location.href = '../content/index.html';
  }, 500);
  }).catch(error=>{
    Myalert(false,error.response.data.msg)
  })
  console.log('提交到服务器登录...')
})


