import { DefaultState, ActiveNumber } from './default-state'

export const resetGameReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)

  return newState
}

export const closeGameOverReducer = (state: DefaultState) => {
  const newState = resetGameReducer(state)
  newState.gameover.isOver = false
  return newState
}
export const deleteNumberReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  return newState
}

export const addUseItemReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  const ss = parseInt(newState.useTime.ss, 10) + 1
  if (ss === 60) {
    newState.useTime.mm = parseInt(newState.useTime.mm, 10) + 1 + ''
    newState.useTime.ss = '00'
  } else if (ss < 10) {
    newState.useTime.ss = '0' + ss
  } else {
    newState.useTime.ss = '' + ss
  }
  return newState
}
export const clickGuessReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  return newState
}

export const slideToLeftReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  const tempActiveNumbers: ActiveNumber[] = deepCopy(newState.activeNumbers)
  newState.activeNumbers.sort((a, b) => {
    return a.pox - b.pox
  })
  newState.activeNumbers.forEach(an => {
    const isSameActive = newState.activeNumbers.find(a => a.value === an.value && a.pox + 1 === an.pox && a.poy === an.poy)
    if (isSameActive) {
      an.value *= 2
      isSameActive.value = 0
    }
  })
  newState.activeNumbers = deleteEmptyNumbers(newState.activeNumbers)
  newState.activeNumbers.forEach(an => {
    for (let i = 1; i <= 4; i++) {
      const isSamePosition = newState.activeNumbers.find(a => a.pox === i && an.pox > i && a.poy === an.poy)
      if (!isSamePosition) {
        an.pox = i
        break
      }
    }
  })
  const notChange = checkIfChange(tempActiveNumbers, newState.activeNumbers)
  if (!notChange) {
    newState.times++
    newState.activeNumbers.sort((a, b) => b.id - a.id)
  }

  return newState
}
export const slideToRightReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  const tempActiveNumbers: ActiveNumber[] = deepCopy(newState.activeNumbers)
  newState.activeNumbers.sort((a, b) => {
    return b.pox - a.pox
  })
  newState.activeNumbers.forEach(an => {
    const isSameActive = newState.activeNumbers.find(a => a.value === an.value && a.pox + 1 === an.pox && a.poy === an.poy)
    if (isSameActive) {
      an.value *= 2
      isSameActive.value = 0
    }
  })
  newState.activeNumbers = deleteEmptyNumbers(newState.activeNumbers)
  newState.activeNumbers.forEach(an => {
    for (let i = 4; i >= 1; i--) {
      const isSamePosition = newState.activeNumbers.find(a => a.pox === i && an.pox < i && a.poy === an.poy)
      if (!isSamePosition) {
        an.pox = i
        break
      }
    }
  })
  const notChange = checkIfChange(tempActiveNumbers, newState.activeNumbers)
  if (!notChange) {
    newState.times++
    newState.activeNumbers.sort((a, b) => b.id - a.id)
  }
  return newState
}
export const slideToUpReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  const tempActiveNumbers: ActiveNumber[] = deepCopy(newState.activeNumbers)
  newState.activeNumbers.sort((a, b) => {
    return a.poy - b.poy
  })
  newState.activeNumbers.forEach(an => {
    const isSameActive = newState.activeNumbers.find(a => a.value === an.value && a.poy + 1 === an.poy && a.pox === an.pox)
    if (isSameActive) {
      an.value *= 2
      isSameActive.value = 0
    }
  })
  newState.activeNumbers = deleteEmptyNumbers(newState.activeNumbers)
  newState.activeNumbers.forEach(an => {
    for (let i = 1; i <= 4; i++) {
      const isSamePosition = newState.activeNumbers.find(a => a.poy === i && an.poy > i && a.pox === an.pox)
      if (!isSamePosition) {
        an.poy = i
        break
      }
    }
  })
  const notChange = checkIfChange(tempActiveNumbers, newState.activeNumbers)
  if (!notChange) {
    newState.times++
    newState.activeNumbers.sort((a, b) => b.id - a.id)
  }
  return newState
}
export const slideToDownReducer = (state: DefaultState) => {
  const newState = deepCopyState(state)
  const tempActiveNumbers: ActiveNumber[] = deepCopy(newState.activeNumbers)
  newState.activeNumbers.sort((a, b) => {
    return b.poy - a.poy
  })
  newState.activeNumbers.forEach(an => {
    const isSameActive = newState.activeNumbers.find(a => a.value === an.value && a.poy + 1 === an.poy && a.pox === an.pox)
    if (isSameActive) {
      an.value *= 2
      isSameActive.value = 0
    }
  })
  newState.activeNumbers = deleteEmptyNumbers(newState.activeNumbers)
  newState.activeNumbers.forEach(an => {
    for (let i = 4; i >= 1; i--) {
      const isSamePosition = newState.activeNumbers.find(a => a.poy === i && an.poy < i && a.pox === an.pox)
      if (!isSamePosition) {
        an.poy = i
        break
      }
    }
  })
  const notChange = checkIfChange(tempActiveNumbers, newState.activeNumbers)
  if (!notChange) {
    newState.times++
    newState.activeNumbers.push(celAddNumber('down', newState.activeNumbers, newState.activeId))
    newState.activeId++
    newState.activeNumbers.sort((a, b) => b.id - a.id)
  }

  return newState
}

function celAddNumber(arrow: string, active: ActiveNumber[], id: number) {
  const addNumber: ActiveNumber = {
    id: id,
    poy: 2,
    pox: 2,
    value: 2,
  }
  switch (arrow) {
    case 'left':
      for (; ;) {
        const x = getRandNum()
        const y = getRandNum()
        const activeInNum = active.find(a => a.pox === x - 1 && a.poy === y)
        const activeEmpty = active.find(b => b.pox === x && b.poy === y)
        if ((activeInNum || x === 0) && !activeEmpty) {
          addNumber.pox = x
          addNumber.poy = y
          break
        }
      }
      break
    case 'right':
      for (; ;) {
        const x = getRandNum()
        const y = getRandNum()
        const activeInNum = active.find(a => a.pox === x + 1 && a.poy === y)
        const activeEmpty = active.find(b => b.pox === x && b.poy === y)
        if ((activeInNum || x === 4) && !activeEmpty) {
          addNumber.pox = x
          addNumber.poy = y
          break
        }
      }
      break
    case 'up':
      for (; ;) {
        const x = getRandNum()
        const y = getRandNum()
        const activeInNum = active.find(a => a.pox === x && a.poy === y - 1)
        const activeEmpty = active.find(b => b.pox === x && b.poy === y)
        if ((activeInNum || y === 0) && !activeEmpty) {
          addNumber.pox = x
          addNumber.poy = y
          break
        }
      }
      break
    case 'down':
      for (; ;) {
        const x = getRandNum()
        const y = getRandNum()
        const activeInNum = active.find(a => a.pox === x && a.poy === y + 1)
        const activeEmpty = active.find(b => b.pox === x && b.poy === y)
        if ((activeInNum || y === 4) && !activeEmpty) {
          addNumber.pox = x
          addNumber.poy = y
          break
        }
      }
      break
  }
  return addNumber
}

function getRandNum(): number {
  return Math.floor(Math.random() * 4 + 1)
}

function checkIfChange(oldObj: ActiveNumber[], newObj: ActiveNumber[]): boolean {
  let notChange = true
  if (oldObj.length === newObj.length) {
    for (let j = 0; j < oldObj.length; j++) {
      const oldNum = oldObj[j]
      const newNum = newObj[j]
      if (
        oldNum.id !== newNum.id ||
        oldNum.value !== newNum.value ||
        oldNum.pox !== newNum.pox ||
        oldNum.poy !== newNum.poy
      ) {
        notChange = false
      }
    }
  } else {
    notChange = false
  }
  return notChange
}

function deleteEmptyNumbers(numbers: ActiveNumber[]): ActiveNumber[] {
  return numbers.reduce((total: any, current: any) => {
    if (current.value !== 0) { total.push(current) }
    return total
  }, [])
}

function deepCopyState(obj: DefaultState): DefaultState {
  return JSON.parse(JSON.stringify(obj))
}
function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj))
}
