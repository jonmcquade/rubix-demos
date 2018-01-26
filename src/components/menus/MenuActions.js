// Export Constants
export const TOGGLE_MENU_PERSPECTIVE = 'TOGGLE_MENU_PERSPECTIVE';
export const TOGGLE_MENU_THEME = 'TOGGLE_MENU_THEME';
export const FLATTEN_OBJECT = 'FLATTEN_OBJECT';
export const RESTORE_OBJECT = 'RESTORE_OBJECT';
export const ZOOM_OUT = 'ZOOM_OUT';
export const ZOOM_IN = 'ZOOM_IN';
export const RESET_MENU_STATE = 'RESET_MENU_STATE';
export const SET_MOBILE_THEME = 'SET_MOBILE_THEME';
export const SET_DESKTOP_THEME = 'SET_DESKTOP_THEME';

// Export Actions
export function resetMenuState(menu) {
  return {
    type: 'RESET_MENU_STATE'
  };
}

export function toggleMenu(id) {
  return {
    type: 'TOGGLE_MENU_' + id.toUpperCase(),
  };
}

export function setMobileTheme() {
  return {
    type: SET_MOBILE_THEME,
  }
}

export function setDesktopTheme() {
  return {
    type: SET_DESKTOP_THEME,
  }
}
