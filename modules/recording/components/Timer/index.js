import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.less'

const Timer = ({isShowTimer, time, isOnSmallScreen}) => {
  if (!isShowTimer) {
    return null
  }

  return (
    <div className={classNames('recording-timer', {'on-screen': isOnSmallScreen})}>
      <time>{isOnSmallScreen && 'Rec. '} {time}</time>
    </div>
  )
}

Timer.propTypes = {
  isShowTimer: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  isOnSmallScreen: PropTypes.bool
}

export default Timer
