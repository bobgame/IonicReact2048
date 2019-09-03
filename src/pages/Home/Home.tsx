import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

// const HomePage: React.Component = () => {
const HomePage: React.FC = () => {

  useEffect(() => {
    console.log('useEffect')
    return function cleanup() {
      console.log('useEffect out')
    }
  })

  return (
    <>
      <h1 className='text-center mbh-4'>React 2048</h1>
      <Link to='/play'><Button size='large' type='primary' block={true} className='mbh-2'> 2048 </Button></Link>
      <Link to='/setting'><Button size='large' block={true} className='mbh-2'> 设置 </Button></Link>
      <Link to='/help'><Button size='large' block={true} className='mbh-2'> 帮助 </Button></Link>
      <Link to='/about'><Button size='large' block={true}> 关于 </Button></Link>
    </>
  )
}

const stateToProps = (state: any) => {
  return {
    inputValue: state.inputValue
  }
}

export default connect(stateToProps, null)(HomePage)
