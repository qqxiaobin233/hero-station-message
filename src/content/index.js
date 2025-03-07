//注意：没有导出和导入，只是为了目标js代码被一起打包进来，参与html后面的运行
import '@/utils/auth.js'
import './index.css'
import axios from '@/utils/request.js'
import '@/utils/channels.js'

/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
// 1.1 准备查询参数对象
const queryObj = {
  page:1,
  pageSize:2,
  classification:0,
  year:2023,
  period:'疫情时期'
}
let totalCount = 0 // 保存文章总条数

// 获取并设置文章列表
async function setArtileList() {
  // 1.2 获取文章列表数据
  const res = await axios({
    url: '/admin/hero/page',
    params: queryObj
  })
  // 1.3 展示到指定的标签结构中
  const htmlStr = res.data.records.map(item => `<tr>
    <td>
      <img src="${item.image}" alt="">
    </td>
    <td>${item.heroName}</td>
    <td>
    <td>${item.title}</td>  
    </td>
    <td>
      ${item.description || '暂无事迹描述'}
    </td>
    <td>
      ${item.awardSpeech || '暂无致辞内容'}
    </td>
    <td data-id="${item.id}">
      <i class="bi bi-pencil-square edit"></i>
      <i class="bi bi-trash3 del"></i>
    </td>
  </tr>`).join('');
  document.querySelector('.art-list').innerHTML = htmlStr;

  // 3.1 保存并设置文章总条数
  totalCount = res.data.total
  document.querySelector('.total').innerHTML = `共 ${totalCount} 条`
}
setArtileList()

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
// 2.1 设置频道列表数据

// 2.2 监听筛选条件改变，保存查询信息到查询参数对象
// 筛选频道 id -> change事件 -> 绑定到查询参数对象上
document.querySelector('#mainSelect').addEventListener('change', e => {
  queryObj.classification = e.target.value
})
document.querySelector('#subSelect').addEventListener('change', e => {
  if(queryObj.classification === '0'){
  queryObj.year = e.target.value
  }
  else{
  queryObj.period = e.target.value
  }
})
// 2.3 点击筛选时，传递查询参数对象到服务器
document.querySelector('.sel-btn').addEventListener('click', () => {
  // 2.4 获取匹配数据，覆盖到页面展示
  setArtileList()
})

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
// 3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
document.querySelector('.next').addEventListener('click', e => {
  // 当前页码小于最大页码数
  if (queryObj.page < Math.ceil(totalCount / queryObj.pageSize)) {
    queryObj.page++
    document.querySelector('.page-now').innerHTML = `第 ${queryObj.page} 页`
    setArtileList()
  }
})
// 3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
document.querySelector('.last').addEventListener('click', e => {
  // 大于 1 的时候，才能翻到上一页
  if (queryObj.page > 1) {
    queryObj.page--
    document.querySelector('.page-now').innerHTML = `第 ${queryObj.page} 页`
    setArtileList()
  }
})

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
// 4.2 点击删除时，获取文章 id
document.querySelector('.art-list').addEventListener('click', async e => {
  // 判断点击的是删除元素
  if (e.target.classList.contains('del')) {
    const delId = e.target.parentNode.dataset.id
    // 4.3 调用删除接口，传递文章 id 到服务器
    const res = await axios({
      url: `/admin/hero/${delId}`,
      method: 'DELETE'
    })

    // 4.5 删除最后一页的最后一条，需要自动向前翻页
    const children = document.querySelector('.art-list').children
    if (children.length === 1 && queryObj.page !== 1) {
      queryObj.page--
      document.querySelector('.page-now').innerHTML = `第 ${queryObj.page} 页`
    }

    // 4.4 重新获取文章列表，并覆盖展示
    setArtileList()
  }
})

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
document.querySelector('.art-list').addEventListener('click', e => {
  if (e.target.classList.contains('edit')) {
    const artId = e.target.parentNode.dataset.id
    console.log(artId)
    location.href = `../publish/index.html?id=${artId}`
  }
})
