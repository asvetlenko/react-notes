import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.less'

const Button = ({isShowButton, isEnableButton, handleClickAction, buttonType}) => {
  if (!isShowButton) {
    return null
  }

  return (
    <div
      className={classNames('recording-button', {'disabled': !isEnableButton})}
      onClick={handleClickAction}
    >
      <span className={`tabeeb-icon-rec-${buttonType}`} />
    </div>
  )
}

Button.propTypes = {
  isShowButton: PropTypes.bool.isRequired,
  isEnableButton: PropTypes.bool.isRequired,
  handleClickAction: PropTypes.func.isRequired,
  buttonType: PropTypes.string.isRequired
}

export default Button
