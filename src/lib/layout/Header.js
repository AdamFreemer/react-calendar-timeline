import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimelineElementsHeader from './TimelineElementsHeader'

class Header extends Component {
  static propTypes = {
    hasRightSidebar: PropTypes.bool.isRequired,
    showPeriod: PropTypes.func.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    topHeaderLabelFormats: PropTypes.object.isRequired,
    middleHeaderLabelFormats: PropTypes.object.isRequired,
    bottomHeaderLabelFormats: PropTypes.object.isRequired,
    stickyOffset: PropTypes.number,
    stickyHeader: PropTypes.bool.isRequired,
    topHeaderLabelHeight: PropTypes.number.isRequired,
    middleHeaderLabelHeight: PropTypes.number.isRequired,
    bottomHeaderLabelHeight: PropTypes.number.isRequired,
    useThreeRowHeader: PropTypes.bool.isRequired,
    registerScroll: PropTypes.func.isRequired,
    leftSidebarHeader: PropTypes.node,
    rightSidebarHeader: PropTypes.node,
    headerRef: PropTypes.func.isRequired
  }

  render() {
    const {
      leftSidebarHeader,
      rightSidebarHeader,
      width,
      stickyOffset,
      stickyHeader,
      headerRef
    } = this.props

    const headerStyle = {
      top: stickyHeader ? stickyOffset || 0 : 0
    }

    const headerClass = stickyHeader ? 'header-sticky' : ''

    return (
      <div
        className={`rct-header-container ${headerClass}`}
        data-test-id="timeline-elements-container"
        ref={headerRef}
        style={headerStyle}
      >
        {leftSidebarHeader}
        <div
          style={{ width }}
          data-test-id="timeline-elements-header-container"
        >
          <TimelineElementsHeader
            data-test-id="timeline-elements-header"
            {...this.props}
          />
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

export default Header
