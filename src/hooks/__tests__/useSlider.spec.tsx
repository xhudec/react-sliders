import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { IUseSlider, useSlider } from '../useSlider'
import { IRangeMarker } from '../../types'

interface ISliderProps extends IUseSlider {
  markers?: IRangeMarker[]
}

const Slider: React.FC<ISliderProps> = ({
  value,
  min,
  max,
  step,
  onChange,
  markers,
  formatValue,
}) => {
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
    value,
    min,
    max,
    step,
    onChange,
    formatValue,
  })

  return (
    <div className="slider-container">
      <span className="slider-rail" {...getRailProps()} />
      <span className="slider-track" data-testid="slider-track" {...getTrackProps()} />

      {markers?.map((marker) => {
        const { style } = getMarkerProps(marker)

        return (
          <span key={`marker-${marker.value}`} className="slider-marker" style={style}>
            {marker.label ?? (formatValue ? formatValue(marker.value) : marker.value)}
          </span>
        )
      })}

      <span className="slider-handle" data-testid="slider-handle" {...getHandleProps()} />
    </div>
  )
}

const renderSlider = (propOverrides: Partial<ISliderProps> = {}) => {
  const wrapper = render(
    <Slider min={0} max={100} value={50} onChange={() => {}} {...propOverrides} />
  )

  const getTrackElement = () => {
    return wrapper.getByTestId('slider-track')
  }

  const getHandleElement = () => {
    return wrapper.getByTestId('slider-handle')
  }

  return {
    ...wrapper,
    getTrackElement,
    getHandleElement,
  }
}

describe('useSlider', () => {
  it('should be defined', () => {
    expect(useSlider).toBeDefined()
  })

  it('should render a Slider with properly positioned thumbs and track', () => {
    const { getTrackElement, getHandleElement } = renderSlider()

    const trackElement = getTrackElement()
    const handleElement = getHandleElement()

    expect(trackElement).toHaveStyle('width: 50%')
    expect(handleElement).toHaveStyle('left: 50%')
  })

  it('should render Slider markers', () => {
    const { getByText } = renderSlider({
      markers: [
        { value: 0, label: '$0' },
        { value: 100, label: '$100' },
      ],
    })

    getByText('$0')
    getByText('$100')
  })

  describe('user interaction', () => {
    // TODO: find out how to set container size in testing environment
    it.skip('should trigger onChange with appropriate data when moving with min thumb', () => {
      const onChangeSpy = jest.fn()

      const { getHandleElement } = renderSlider({
        min: 0,
        max: 100,
        value: 0,
        onChange: onChangeSpy,
      })

      const handleElement = getHandleElement()

      act(() => {
        fireEvent.mouseDown(handleElement, { clientX: 0 })
        fireEvent.mouseMove(handleElement, { clientX: 50 })
        fireEvent.mouseUp(handleElement)
      })

      expect(onChangeSpy).toHaveBeenCalledWith([10, 100])
    })
  })
})