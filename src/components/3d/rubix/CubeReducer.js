// Import Actions
import { 
  RESTORE_OBJECT, 
  FLATTEN_OBJECT, 
  ZOOM_OUT, 
  ZOOM_IN,
  SET_FACE_RGBA,
  SET_FACE_TXT,
  RESET_FACE_RGBA,
  RESET_FACE_TXT,
} from './CubeActions';

// Initial State
const initialState = {
  objectIsFlat: false,
  scale: {
    small: [0.6, 0.6],
    medium: [0.8, 0.8],
    large: [0.8, 0.8],
    xlarge: [1, 1],
  },
  theme: {
    top:{
      bgColor: 'rgba(255,255,255,1)',
      txtColor: 'black',
    },
    bottom: {
      bgColor: 'rgba(255,255,0,1)',
      txtColor: 'black',
    },
    front: {
      bgColor: 'rgba(0,0,255,1)',
      txtColor: 'white',
    },
    back: {
      bgColor: 'rgba(0,128,0,1)',
      txtColor: 'white',
    },
    left: {
      bgColor: 'rgba(255,0,0,1)',
      txtColor: 'white',
    },
    right: {
      bgColor: 'rgba(255,165,0,1)',
      txtColor: 'white',
    }
  },
  style: {
    top: {
      transform: 'scale(1, 1) rotateX(0) rotateY(0) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
    },
    bottom: {
      transform: 'scale(1, 1) rotateX(-180deg) rotateY(0) rotateZ(0) translateX(0) translateY(-100%) translateZ(360px)',
    },
    front: {
      transform: 'scale(1, 1) rotateX(270deg) rotateY(0) rotateZ(0deg) translateX(0) translateY(0) translateZ(360px)',
    },
    back: {
      transform: 'scale(1, 1) rotateX(90deg) rotateY(0) rotateZ(0) translateX(0) translateY(-100%) translateZ(0)',
    },
    right: {
      transform: 'scale(1, -1) rotateX(-90deg) rotateY(-90deg) rotateZ(0) translateX(-100%) translateY(0) translateZ(-360px)',
    },
    left: {
      transform: 'scale(-1, 1) rotateX(-90deg) rotateY(-90deg) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
    }
  }
};

const backupState = JSON.parse(JSON.stringify(initialState));
const backupStateFaceRGBA = JSON.parse(JSON.stringify(initialState));
const backupStateFaceTxtColor = JSON.parse(JSON.stringify(initialState));

const CubeReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RESTORE_OBJECT:
      return {...state, ...initialState};

    case FLATTEN_OBJECT:
      newState.objectIsFlat = true;
      newState.style = {
        top: {
          transform: 'scale(1, 1) rotateX(0) rotateY(0) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
        },
        bottom: {
          transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
        },
        front: {
          transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
        },
        back: {
          transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
        },
        right: {
          transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
        },
        left: {
          transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
        }
      }
      return {...newState, state};
      
    case ZOOM_OUT:
      for(let size in state.scale) {
        let height = state.scale[size][0] > 0 ? state.scale[size][0] - 0.1 : state.scale[size][0] + 0.1;
        let width = state.scale[size][1] > 0 ? state.scale[size][1] - 0.1 : state.scale[size][1] + 0.1;
        newState.scale[size] = [height, width];
      }
      return {...newState, state};
 
    case ZOOM_IN:
      for(let size in state.scale) {
        let height = state.scale[size][0] + 0.1;
        let width = state.scale[size][1] + 0.1;
        newState.scale[size] = [height, width];
      }
      return {...newState, state};

    case SET_FACE_RGBA:
      if(!action.value) {
        return state;
      }
      newState.theme[action.value.face].bgColor = action.value.bgColor;
      return {...state, ...newState};
    
    case SET_FACE_TXT:
      if(!action.value) {
        return state;
      }
      newState.theme[action.value.face].txtColor = action.value.txtColor;
      return {...state, ...newState};

    case RESET_FACE_RGBA:
      if(!action.value) {
        return state;
      }
      newState.theme[action.value.face].bgColor = backupStateFaceRGBA.theme[action.value.face].bgColor;
      return {...state, ...newState};
    
    case RESET_FACE_TXT:
      if(!action.value) {
        return state;
      }
      newState.theme[action.value.face].txtColor = backupStateFaceTxtColor.theme[action.value.face].txtColor;
      return {...state, ...newState};

    default:
      return state;
  }
};

// Export Reducer
export default CubeReducer;