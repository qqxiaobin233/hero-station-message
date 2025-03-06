import { checkPhone, checkCode } from '@/utils/check.js'

// document.querySelector('.btn').addEventListener('click', () => {
//   const phone = document.querySelector('.login-form [name=mobile]').value
//   const code = document.querySelector('.login-form [name=code]').value

//   if (!checkPhone(phone)) {
//     console.log('手机号长度必须是11位')
//     return
//   }

//   if (!checkCode(code)) {
//     console.log('验证码长度必须是6位')
//     return
//   }

//   console.log('提交到服务器登录...')
// })

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import './index.less'

import myAxios from '@/utils/request.js'
import { Myalert } from '@/utils/alert.js'
document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if (!checkPhone(phone)) {
    Myalert(false,'手机号长度必须是11位')
    console.log('手机号长度必须是11位')
    return
  }

  if (!checkCode(code)) {
    Myalert(false,'验证码长度必须是6位')
    console.log('验证码长度必须是6位')
    return
  }

  myAxios({
    method:'post',
    url:'/v1_0/authorizations',
    data:{
      mobile:phone,
      code
    }
  }).then(result=>{
    Myalert(true,'登录成功')
    localStorage.setItem('token',result.data.token)
    location.href = '../content/index.html'
  }).catch(err=>{
    Myalert(false,'登录失败')
  })
  console.log('提交到服务器登录...')
})

// if(process.env.NODE_ENV === 'production'){
//   console.log = function(){}
// }
// console.log('开发模式下好用，生产模式下失效')


// import mytest from '@/utils/request.js'
// console.log(mytest)

