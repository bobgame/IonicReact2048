import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  // useSwipeable,
  Swipeable
} from 'react-swipeable'

import { Link } from 'react-router-dom'
import { Button, List } from 'antd'

import './Play.scss'
import { actionClickGuess, actionClickNumber, actionDeleteNumber, actionResetList, actionCloseGameover, actionAddUseTime } from '../../store/action-creator'
// import PlayResultBox from './ui/play-ui-result-box'
// import PlayShowBox from './ui/play-ui-show-box'
// import PlayNumberBox from './ui/play-ui-number-box'
// import PlayButtonBox from './ui/play-ui-button-box'
import GameoverModal from './ui/play-ui-gameover-modal'

const PlayPage: React.FC = (props: any) => {

  useEffect(() => {
    if (props.list.length === 0) {
      props.resetLists()
    }
    const addUseTimeInterval = setInterval(() => {
      props.addUseTime()
    }, 1000)
    return function cleanup() {
      clearInterval(addUseTimeInterval)
    }
  })

  const {
    // inputValue, list,
    times, gameover, useTime,
    // clickNumber, clickGuess, deleteNumber,
    closeGameOver
  } = props

  const data = [
    `剩余次数: ${times}`,
    `时间: ${useTime.mm}:${useTime.ss}`,
  ]

  const createEmptyBgDivs = () => {
    const divs = []
    for (let i = 1; i <= 16; i++) {
      divs.push(i)
    }
    return divs.map(d => {
      return <div className='bg-empty-item' key={'bg-empty-' + d}>{d}</div>
    })
  }
  const emptyBgDivs = createEmptyBgDivs()

  return (
    <>
      <h2 className='text-center'>2048</h2>
      <List
        grid={{ column: 2 }}
        itemLayout='vertical'
        className='info-box mbh-2'
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
      <Swipeable className='play-content mbh-4' onSwipedLeft={(event) => console.log(event)}>
        <div className='bg-empty'>{emptyBgDivs}</div>
      </Swipeable>
      <Link to='/'><Button block>返回首页</Button></Link>
      <GameoverModal
        gameover={gameover}
        closeGameOver={closeGameOver}
      />
    </>
  )
}

const stateToProps = (state: any) => {
  return {
    inputValue: state.inputValue,
    gameover: state.gameover,
    list: state.list,
    times: state.times,
    useTime: state.useTime,
  }
}

const dispatchToProps = (dispatch: any) => {
  return {
    clickNumber(num: string) {
      dispatch(actionClickNumber(num))
    },
    clickGuess() {
      dispatch(actionClickGuess())
    },
    deleteNumber() {
      dispatch(actionDeleteNumber())
    },
    resetLists() {
      dispatch(actionResetList())
    },
    closeGameOver() {
      dispatch(actionCloseGameover())
    },
    addUseTime() {
      dispatch(actionAddUseTime())
    },
  }
}

export default connect(stateToProps, dispatchToProps)(PlayPage)
