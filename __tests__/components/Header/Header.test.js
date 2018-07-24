import React from 'react'
import { shallow, mount } from 'enzyme'
import { sel } from 'test-utility'
import Header from 'lib/layout/Header'
import {
  defaultTopHeaderLabelFormats,
  defaultMiddleHeaderLabelFormats,
  defaultBottomHeaderLabelFormats
} from 'lib/default-config'

const defaultProps = {
  hasRightSidebar: false,
  showPeriod: () => {},
  canvasTimeStart: 10000,
  canvasTimeEnd: 20000,
  canvasWidth: 1000,
  minUnit: 'day',
  timeSteps: {},
  width: 400,
  topHeaderLabelFormats: defaultTopHeaderLabelFormats,
  middleHeaderLabelFormats: defaultMiddleHeaderLabelFormats,
  bottomHeaderLabelFormats: defaultBottomHeaderLabelFormats,
  stickyOffset: 5,
  stickyHeader: true,
  topHeaderLabelHeight: 15,
  middleHeaderLabelHeight: 15,
  bottomHeaderLabelHeight: 15,
  registerScroll: () => {},
  headerRef: () => {}
}

const selectors = {
  headerElementsContainer: sel('timeline-elements-header-container'),
  headerElements: sel('timeline-elements-header')
}

describe('Header', () => {
  describe('timeline-elements-header', () => {
    it('accepts headerRef callback', () => {
      const headerRefMock = jest.fn()

      const props = {
        ...defaultProps,
        headerRef: headerRefMock
      }

      mount(<Header {...props} />)

      expect(headerRefMock).toHaveBeenCalledTimes(1)

      const mockCallParam = headerRefMock.mock.calls[0][0]

      expect(mockCallParam.dataset.testid).toBe('timeline-elements-container')
    })

    it('container recieves width property', () => {
      const props = {
        ...defaultProps,
        width: 1500
      }

      const wrapper = shallow(<Header {...props} />)

      expect(
        wrapper.find(selectors.headerElementsContainer).props().style.width
      ).toBe(props.width)
    })

    it('elements header receives all props', () => {
      const wrapper = shallow(<Header {...defaultProps} />)

      expect(wrapper.find(selectors.headerElements).props()).toMatchObject(
        defaultProps
      )
    })
  })
  describe('sticky header', () => {
    it('sets "header-sticky" class if stickyHeader is true', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().className).toMatch('header-sticky')
    })
    it('does not set "header-sticky" class if stickyHeader is false', () => {
      const props = {
        ...defaultProps,
        stickyHeader: false
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().className).not.toMatch('header-sticky')
    })
    it('style.top is 0 if stickyHeader is false', () => {
      const props = {
        ...defaultProps,
        stickyHeader: false,
        stickyOffset: 10
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(0)
    })
    it('style.top is set to stickyOffset if stickyHeader is true', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true,
        stickyOffset: 10
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(props.stickyOffset)
    })
    it('style.top is set to 0 if stickyHeader is true and no stickyOffset is passed in', () => {
      const props = {
        ...defaultProps,
        stickyHeader: true,
        stickyOffset: null
      }

      const wrapper = shallow(<Header {...props} />)

      expect(wrapper.props().style.top).toBe(0)
    })
    it('should update headers format when subHeaderLabelFormats and subHeaderLabelFormats change', () => {
      const wrapper = mount(<Header {...defaultProps} />)
      expect(
        wrapper
          .find('.rct-label-group')
          .text()
          .includes('January 1970')
      ).toBeTruthy()
      expect(
        wrapper
          .find('.rct-label')
          .text()
          .includes('Thursday, 1st')
      ).toBeTruthy()
      wrapper.setProps({
        headerLabelFormats: {
          yearShort: 'YY',
          yearLong: 'YYYY',
          monthShort: 'YY',
          monthMedium: 'YYYY',
          monthMediumLong: 'YYYY',
          monthLong: 'YYYY',
          dayShort: 'L',
          dayLong: 'dddd',
          hourShort: 'HH',
          hourMedium: 'HH:00',
          hourMediumLong: 'L, HH:00',
          hourLong: 'dddd, LL, HH:00',
          time: 'LLL'
        },
        subHeaderLabelFormats: {
          yearShort: 'YY',
          yearLong: 'YYYY',
          monthShort: 'MM',
          monthMedium: 'MMM',
          monthLong: 'MMMM',
          dayShort: 'D',
          dayMedium: 'dd',
          dayMediumLong: 'ddd',
          dayLong: 'dddd',
          hourShort: 'HH',
          hourLong: 'HH:00',
          minuteShort: 'mm',
          minuteLong: 'HH:mm'
        }
      })
      expect(
        wrapper
          .find('.rct-label-group')
          .text()
          .includes('1970')
      ).toBeTruthy()
      expect(
        wrapper
          .find('.rct-label')
          .text()
          .includes('Thursday')
      ).toBeTruthy()
    })
  })
})
