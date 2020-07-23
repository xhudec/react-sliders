import React from 'react'
import { mount, unmount } from 'cypress-react-unit-test'

import { TestRangeSlider, ITestRangeSliderProps } from '../fixtures/components/RangeSlider'
import '../fixtures/components/styles.css'

import { IRangeMarker } from '../../src/types'

const demoMarkers: IRangeMarker[] = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
]

const demoFormatter = (value: number) => `$${value}`

const mountSlider = (propsOverrides: Partial<ITestRangeSliderProps> = {}) => {
  mount(
    <div className="example-container">
      <TestRangeSlider
        min={0}
        max={100}
        markers={demoMarkers}
        formatValue={demoFormatter}
        {...propsOverrides}
      />
    </div>
  )
}

const WINDOW_SIZE = 1000
const MARGIN = 32
const HANDLE_OFFSET = 12
const MIDDLE_X = WINDOW_SIZE / 2 - MARGIN - HANDLE_OFFSET

describe('useRangeSlider', () => {
  afterEach(() => {
    unmount()
  })

  it('should render a self-controlled RangeSlider', () => {
    mountSlider()

    cy.findByTestId('slider-handle-min').as('handle-min')
    cy.findByTestId('slider-handle-max').as('handle-max')

    cy.get('@handle-min').should('have.attr', 'role', 'slider')
    cy.get('@handle-min').should('have.attr', 'aria-valuemin', '0')
    cy.get('@handle-min').should('have.attr', 'aria-valuemax', '100')
    cy.get('@handle-min').should('have.attr', 'aria-valuenow', '0')
    cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$0')

    cy.get('@handle-max').should('have.attr', 'role', 'slider')
    cy.get('@handle-max').should('have.attr', 'aria-valuemin', '0')
    cy.get('@handle-max').should('have.attr', 'aria-valuemax', '100')
    cy.get('@handle-max').should('have.attr', 'aria-valuenow', '100')
    cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$100')

    cy.findByText('$0').should('exist')
    cy.findByText('$20').should('exist')
    cy.findByText('$40').should('exist')
    cy.findByText('$60').should('exist')
    cy.findByText('$80').should('exist')
    cy.findByText('$100').should('exist')
  })

  describe.skip('mouse & touch', () => {
    it('should properly set slider value based on mouse movement', () => {})

    it('should properly set slider value based on touch movement', () => {})
  })

  describe.skip('keyboard', () => {
    it('should increase slider value by pressing right or up arrow on keyboard', () => {})

    it('should decrease slider value by pressing left or down arrow on keyboard', () => {})

    it('should increase slider value by pressing page down on keyboard', () => {})

    it('should decrease slider value by pressing page up on keyboard', () => {})

    it('should set slider value to max by pressing end on keyboard', () => {})

    it('should set slider value to min by pressing home on keyboard', () => {})
  })
})
