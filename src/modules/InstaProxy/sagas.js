import { call, put, takeLatest } from 'redux-saga/effects';
import { callIg, setIgSearchUrl } from './InstaProxy';
import { URL_DEFAULT_SEARCH_URL } from './InstaProxyActions';
import { getCubeFaces, popOutImages, popInImages, getFetchSettings } from '../../components/3d/rubix/Cube';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchData(action) {
  try {
    // Don't proceed if we didn't receive a value object in the action
    if(action.value && !action.value === '') {
      return false;
    }

    let images = {
      nextPage: action.value.searchUri ? action.value.searchUri : URL_DEFAULT_SEARCH_URL, 
      urls: []
    };
    let post = 0;
    
    // Pre-dispatch query settings; overrides defaults
    yield put({type: 'SET_IG_SEARCH_TYPE', value: action.value.searchType});
    yield put({type: 'SET_IG_SEARCH_VALUE', value: action.value.searchValue});
    yield put({type: 'SET_IG_SEARCH_URL', value: action.value.searchUri});

    // Hide images while search is performed
    // TODO: Make this a dispatch to a cube action
    if(action.value.face || action.value.faces) {
      yield hideCubeImages(action.value);
    }

    let data = yield call(callIg, action.value);
    if(data.next) {
      images.nextPage = data.next;
    }

    // Some additional flight checks before departure back to the store...
    if(data.posts && data.posts.length > 0) {
      yield put({type: 'UPDATE_IG_DATA', value: {data: data}});
    } else {
      // We didn't get return data, so reveal the old images and return
      yield showCubeImages(action.value);
      return false;
    }

    // Post image assignment
    for(post in data.posts) {
      images.urls.push(data.posts[post].thumbnail_resources[0].src);
    }

    // At this point, we're OK to fly...
    let msg = action.value.searchType.toUpperCase() + '_FETCH_SUCCEEDED';
    yield put({type: msg, data: data});
 
    // If we have images, put them in the store
    //  and reveal the updated face
    if(action.value.face) {
        yield put({type: 'SET_THEME_FACE_IMAGES', value: {
          face: action.value.face, 
          images: images.urls, 
        }});
        yield showCubeImages(action.value);
        return data.next;
    } else if(action.value.faces) {
      yield put({type: 'SET_THEME_CUBE_IMAGES', value: {
        faces: getCubeFaces(),
        images: images,
      }});
      yield showCubeImages(action.value);
      return data.next;
    }

   } catch (e) {
      // We crashed somewhere mid-flight...
      let msg = action.value.searchType.toUpperCase() + '_FETCH_FAILED';
      yield put({type: msg});
      return false;
   }
}

/**
 *  Make multiple calls with returned paging urls,
 *    then dispatch each returned set back to the store 
 */
function* fetchPages(action) {
  let i = 0;
  if(!action.value.pages) {
    return false;
  }

  let faces = getCubeFaces();
  let nextPage = '';
  // THIS IS WHERE YOU ARE NOW
  for(i = 0; i < action.value.pages; i++) {
    let newAction = {...action};
    newAction.value.face = faces[i];
    if(nextPage === '') {
      nextPage = yield fetchData(newAction);
    } else {
      newAction.value.searchUri = yield nextPage;
      nextPage = yield getNextImages(newAction);
    }
  }
}

function* getNextImages(newAction) {
  if(newAction) {
    const data = yield fetchData(newAction);
    return data;
  }
}

// worker Saga: will be fired on change of search type
function* setSearchType(action) {
   try {
      yield put({type: 'SET_IG_SEARCH_TYPE', value: action.value.type});
   } catch (e) {
      yield put({type: 'SET_IG_SEARCH_TYPE_FAILED', message: e.message});
   }
}

function hideCubeImages(props) {
  // Hide images until new data is loaded
  if(props.face) {
    popOutImages(props.face);
  } else if(props.faces) {
    let faces = getCubeFaces();
    for(let face in faces) {
      call(popOutImages, face);
    }
  }
}

function showCubeImages(props) {
  // Show images until new data is loaded
  if(props.face) {
    popInImages(props.face);
  } else if(props.faces) {
    let faces = getCubeFaces();
    for(let face in faces) {
      call(popInImages, face);
    }
  }
}

/*
  Does not allow concurrent fetches. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* instaProxySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchData);
  yield takeLatest('HASHTAG_FETCH_REQUESTED', fetchData);
  yield takeLatest('CHANGE_SEARCH_TYPE', setSearchType);
  yield takeLatest('USER_FETCH_PAGING_REQUESTED', fetchPages);
  yield takeLatest('HASHTAG_FETCH_PAGING_REQUESTED', fetchPages);
}

export default instaProxySaga;
