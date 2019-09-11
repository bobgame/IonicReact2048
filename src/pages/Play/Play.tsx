import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  // useSwipeable,
  Swipeable
} from 'react-swipeable'

import { Link } from 'react-router-dom'
import { Button, List } from 'antd'

import './Play.scss'
import { actionResetList, actionCloseGameover, actionAddUseTime, actionSlideToLeft, actionSlideToDown, actionSlideToUp, actionSlideToRight } from '../../store/action-creator'
// import PlayResultBox from './ui/play-ui-result-box'
// import PlayShowBox from './ui/play-ui-show-box'
// import PlayNumberBox from './ui/play-ui-number-box'
// import PlayButtonBox from './ui/play-ui-button-box'
import GameoverModal from './ui/play-ui-gameover-modal'
import { ActiveNumber } from '../../store/default-state'

const PlayPage: React.FC = (props: any) => {

  useEffect(() => {
    // if (props.list.length === 0) {
    //   props.resetLists()
    // }
    const addUseTimeInterval = setInterval(() => {
      props.addUseTime()
    }, 1000)

    document.addEventListener('keydown', onKeyDown)

    return function cleanup() {
      clearInterval(addUseTimeInterval)
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  const {
    // inputValue, list,
    times, gameover, useTime,
    activeId, activeNumbers,
    slideToLeft, slideToRight, slideToUp, slideToDown,
    closeGameOver
  } = props

  const data = [
    `步数: ${times}`,
    `时间: ${useTime.mm}:${useTime.ss}`,
  ]

  function onKeyDown(e: any) {
    switch (e.keyCode) {
      case 37: // 左
        slideToLeft()
        break
      case 38: // 上
        slideToUp()
        break
      case 39: // 右
        slideToRight()
        break
      case 40: // 下
        slideToDown()
        break
    }
  }

  const createEmptyBgDivs = () => {
    const divs = []
    for (let i = 1; i <= 16; i++) {
      divs.push(i)
    }
    return divs.map(d => {
      return <div className='bg-empty-item' key={'bg-empty-' + d} />
    })
  }
  const emptyBgDivs = createEmptyBgDivs()

  return (
    <>
      <h2 className='text-center'>2048</h2>
      <div>{activeId}</div>
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
      <Swipeable className='play-content mbh-4'
        onSwipedLeft={() => slideToLeft()}
        onSwipedRight={() => slideToRight()}
        onSwipedUp={() => slideToUp()}
        onSwipedDown={() => slideToDown()}
      >
        <div className='bg-empty'>{emptyBgDivs}</div>
        {
          activeNumbers.map((num: ActiveNumber) => {
            return (
              <div key={'active-number-' + num.id} className={`active-num active-num-${num.value} active-x-${num.pox} active-y-${num.poy}`}><div className='active-num-item'>{num.value}</div></div>
            )
          })
        }
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
    activeId: state.activeId,
    activeNumbers: state.activeNumbers,
    times: state.times,
    useTime: state.useTime,
  }
}

const dispatchToProps = (dispatch: any) => {
  return {
    slideToLeft() {
      dispatch(actionSlideToLeft())
    },
    slideToRight() {
      dispatch(actionSlideToRight())
    },
    slideToUp() {
      dispatch(actionSlideToUp())
    },
    slideToDown() {
      dispatch(actionSlideToDown())
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
