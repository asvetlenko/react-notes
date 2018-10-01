import React from 'react'
import PropTypes from 'prop-types'

import StartButtonContainer from '../../containers/StartButtonContainer'
import PauseButtonContainer from '../../containers/PauseButtonContainer'
import StopButtonContainer from '../../containers/StopButtonContainer'
import TimerContainer from '../../containers/TimerContainer'

import './styles.less'

const Recording = ({ styles }) => {
  return (
    <section style={styles} className='recording-navbar'>
      <StartButtonContainer />
      <PauseButtonContainer />
      <StopButtonContainer />
      <TimerContainer />
    </section>
  )
}

Recording.propTypes = {
  styles: PropTypes.object.isRequired
}

export default Recording
