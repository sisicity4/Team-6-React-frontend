import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    fillRect: () => null,
    clearRect: () => null,
    getImageData: () => ({ data: [] }),
    putImageData: () => null,
    createImageData: () => [],
    setTransform: () => null,
    drawImage: () => null,
    save: () => null,
    fillText: () => null,
    restore: () => null,
    beginPath: () => null,
    moveTo: () => null,
    lineTo: () => null,
    closePath: () => null,
    stroke: () => null,
    translate: () => null,
    scale: () => null,
    rotate: () => null,
    arc: () => null,
    fill: () => null,
    measureText: () => ({ width: 0 }),
    transform: () => null,
    rect: () => null,
    clip: () => null,
  }),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener: () => null,
      removeListener: () => null,
    }
  }
