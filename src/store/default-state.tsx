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
  activeId: 17,
  activeNumbers: [
    {
      id: 1,
      poy: 1,
      pox: 1,
      value: 2048,
    },
    {
      id: 2,
      poy: 2,
      pox: 1,
      value: 4096,
    },
    {
      id: 3,
      poy: 3,
      pox: 1,
      value: 1024,
    },
    {
      id: 4,
      poy: 1,
      pox: 2,
      value: 512,
    },
    {
      id: 5,
      poy: 2,
      pox: 2,
      value: 256,
    },
    {
      id: 6,
      poy: 3,
      pox: 2,
      value: 128,
    },
    {
      id: 7,
      poy: 4,
      pox: 2,
      value: 64,
    },
    {
      id: 8,
      poy: 1,
      pox: 3,
      value: 32,
    },
    {
      id: 9,
      poy: 1,
      pox: 4,
      value: 32768,
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
