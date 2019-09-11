import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const HelpPage: React.FC = () => {
  return (
    <>
      <h2 className='text-center'>帮助</h2>
      <div className='mbh-2'>
        <p>上下左右滑动或按键盘的上下左右，改变方块的方向。相同的数字会合并，当没有可合并的数字的时候，游戏结束。</p>
      </div>
      <Link to='/'><Button block>返回首页</Button></Link>
    </>
  )
}

export default HelpPage
