/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'

var minTime = moment()
  .add(-6, 'months')
  .valueOf()
var maxTime = moment()
  .add(6, 'months')
  .valueOf()

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

const format = "DD.MM.YYYY"
const holidays = [moment("01.01.2018", format), moment("06.01.2018", format), moment("30.03.2018", format),
  moment("01.04.2018", format), moment("02.04.2018", format), moment("01.05.2018", format),
  moment("10.05.2018", format), moment("20.05.2018", format), moment("21.05.2018", format),
  moment("31.05.2018", format), moment("15.08.2018", format), moment("26.10.2018", format),
  moment("01.11.2018", format), moment("08.12.2018", format), moment("24.12.2018", format),
  moment("25.12.2018", format), moment("26.12.2018", format), moment("31.12.2018", format)]

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = moment()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(1, 'day')
      .toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time) => {
    console.log('Canvas context menu', group, moment(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: dragTime,
                end: dragTime + (item.end - item.start),
                group: group.id
              })
            : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: edge === 'left' ? time : item.start,
                end: edge === 'left' ? item.end : time
              })
            : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  moveResizeValidator = (action, item, time) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  verticalLineClassNamesForTime = (timeStart, timeEnd) => {
    const currentTimeStart = moment(timeStart)
    const currentTimeEnd = moment(timeEnd)

    for (let holiday of holidays) {
      if (holiday.isSame(currentTimeStart, "day") && holiday.isSame(currentTimeEnd, "day")) {
        return ["holiday"]
      }
    }
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={150}
        sidebarContent={<div>Above The Left</div>}
        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onCanvasClick={this.handleCanvasClick}
        onCanvasDoubleClick={this.handleCanvasDoubleClick}
        onCanvasContextMenu={this.handleCanvasContextMenu}
        onItemClick={this.handleItemClick}
        onItemSelect={this.handleItemSelect}
        onItemContextMenu={this.handleItemContextMenu}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onItemDoubleClick={this.handleItemDoubleClick}
        //onTimeChange={this.handleTimeChange}
        moveResizeValidator={this.moveResizeValidator}
        minZoom={1 * 60 * 60 * 1000}
        maxZoom={15 * 365.24 * 86400 * 1000}
        verticalLineClassNamesForTime={this.verticalLineClassNamesForTime}
      />
    )
  }
}
