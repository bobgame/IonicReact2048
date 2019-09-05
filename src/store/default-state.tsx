export const defalutState: DefaultState = {
  times: 0,
  useTime: {
    mm: '00',
    ss: '00',
  },
  gameover: {
    isOver: false,
    title: '',
    desc: '',
  },
  activeId: 3,
  activeNumbers: [
    {
      id: 1,
      poy: 1,
      pox: 1,
      value: 2,
    },
    {
      id: 2,
      poy: 2,
      pox: 1,
      value: 4,
    },
    {
      id: 3,
      poy: 3,
      pox: 1,
      value: 4,
    },
    {
      id: 4,
      poy: 1,
      pox: 2,
      value: 4,
    },
    {
      id: 5,
      poy: 2,
      pox: 2,
      value: 4,
    },
  ],
}

export interface DefaultState {
  times: number
  useTime: {
    mm: string
    ss: string
  },
  gameover: {
    isOver: boolean
    title: string
    desc: string
  },
  activeId: number,
  activeNumbers: ActiveNumber[],
}

export interface ActiveNumber {
  id: number
  pox: number
  poy: number
  value: number
}
