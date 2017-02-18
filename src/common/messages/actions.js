
const texts = {
  'add-tag': {
    'error-already-added': 'Already added',
    'error': 'Tagging failed',
    'success': 'Tagged successfully',
    'error-too-short': 'Tag is too short',
    'error-too-long': 'Tag is longer than 20',
  },
  'new-user-email': {
    'invalid-email': 'Check your email',
    'already-added': 'This email has already been added',
    'success': 'Thanks! Email added!',
  },
};

export function showMessage(mType, mSpec, autohide) {
  return ({ dispatch }) => {
    const text = texts[mType][mSpec];
    if (autohide) {
      setTimeout(() => {
        dispatch({
          type: 'HIDE_MESSAGE',
          mType,
        });
      }, 4000);
    }
    return {
      type: 'SHOW_MESSAGE',
      mType,
      mObject: {
        text,
        autohide,
      },
    };
  };
}

export function hideMessage(mType) {
  return {
    type: 'HIDE_MESSAGE',
    mType,
  };
}
