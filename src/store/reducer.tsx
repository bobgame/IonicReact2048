import { PLAY_TYPES } from './action-type'
import { defalutState } from './default-state'
import {
  addUseItemReducer, resetGameReducer, closeGameOverReducer, slideToLeftReducer, slideToRightReducer, slideToUpReducer, slideToDownReducer
} from './play-reducer'

export default (state = defalutState, action: any) => {
  switch (action.type) {
    case PLAY_TYPES.SLIDE_TO_LEFT:
      return slideToLeftReducer(state)
    case PLAY_TYPES.SLIDE_TO_RIGHT:
      return slideToRightReducer(state)
    case PLAY_TYPES.SLIDE_TO_UP:
      return slideToUpReducer(state)
    case PLAY_TYPES.SLIDE_TO_DOWN:
      return slideToDownReducer(state)

    case PLAY_TYPES.RESET_GAME:
      return resetGameReducer(state)
    case PLAY_TYPES.CLOSE_GAMEOVER:
      return closeGameOverReducer(state)
    case PLAY_TYPES.ADD_USE_TIME:
      return addUseItemReducer(state)
    default:
      break
  }
  return state
}
