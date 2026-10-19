import { act } from '@testing-library/react'
import { vi } from 'vitest'

const instances = new Set<MockIntersectionObserver>()
class MockIntersectionObserver {
  readonly root = null
  readonly rootMargin: string
  readonly thresholds = [0]
  private targets = new Set<Element>()

  constructor(private callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.rootMargin = options?.rootMargin ?? '0px'
    instances.add(this)
  }
  observe = (target: Element) => { this.targets.add(target) }
  unobserve = (target: Element) => { this.targets.delete(target) }
  disconnect = () => { this.targets.clear(); instances.delete(this) }
  takeRecords = () => []
  emit(target: Element, isIntersecting: boolean) {
    if (!this.targets.has(target)) return
    this.callback([{ target, isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

export function installIntersectionObserverMock() {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
}

export function intersect(target: Element, isIntersecting = true) {
  act(() => {
    for (const observer of [...instances]) observer.emit(target, isIntersecting)
  })
}

export function resetIntersectionObservers() {
  instances.clear()
}
