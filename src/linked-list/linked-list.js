import { getLogger, LOG_LEVELS } from '../logger/logger.js'
import { Element } from './linked-list.element.js'

export const LINKED_LIST_LOGGER_KEY = 'LINKED_LIST_LOGGER'

const logger = getLogger(LINKED_LIST_LOGGER_KEY)
logger.setLevel(LOG_LEVELS.none)

export class LinkedList {
  /** @type {Element?} element at first position */
  #head
  /** @type {Element?} element at last position */
  #tail
  /** number of elements in list */
  #count = 0

  /**
   * @param {any[]} arr Array of values in list
   */
  constructor (arr = []) {
    for (const val of arr) {
      this.add(val)
    }
  }

  /**
   * @returns {number} number of elements in list
   */
  getCount () {
    return this.#count
  }

  /**
   * @returns {any[]} array of values contained by elements in list
   */
  toArray () {
    const arr = []
    let cursor = this.#head
    while (cursor) {
      arr.push(cursor.val)
      cursor = cursor.next
    }
    return arr
  }

  /**
   * Adds a new element to the end of the list
   * @param {any} val value to add
   */
  add (val) {
    const element = new Element(val)
    if (!this.#head) this.#head = element
    if (this.#tail) {
      const cursor = this.#tail
      cursor.next = element
      element.prev = cursor
    }
    this.#tail = element
    this.#count++
  }

  /**
   * Removes the first element that meets the provided criteria
   * @param {any} toRemove value to remove or a function indicating what value to remove
   * @return {boolean} true if an element was removed, false otherwise
   */
  remove (toRemove) {
    let cursor = this.#head
    let i = 0
    while (cursor) {
      if (
        toRemove instanceof Function
          ? toRemove(cursor.val) === true
          : toRemove === cursor.val
      ) {
        logger.verbose('Removing element with value', cursor.val, 'at position', i)
        this.#removeElement(cursor)
        return true
      }
      cursor = cursor.next
      i++
    }
    return false
  }

  /**
   * Removes all elements that meet the provided criteria
   * @param {any} toRemove value to remove or a function indicating what value to remove
   * @return {number} number of elements removed
   */
  removeAll (toRemove) {
    let cursor = this.#head
    let i = 0
    const elementsToRemove = []
    while (cursor) {
      if (
        toRemove instanceof Function
          ? toRemove(cursor.val) === true
          : toRemove === cursor.val
      ) {
        logger.verbose('Found removable element with value', cursor.val, 'at position', i)
        elementsToRemove.push(cursor)
      }
      cursor = cursor.next
      i++
    }
    for (const element of elementsToRemove) {
      this.#removeElement(element)
    }
    return elementsToRemove.length
  }

  /**
   * Removes the element at the provided index
   * @param {number} index index of element to remove
   * @return {boolean} true if an element was removed, false otherwise
   */
  removeAt (index) {
    if (index >= this.#count) return false
    let cursor = this.#head
    for (let i = 0; i < index; i++) {
      cursor = cursor.next
    }
    this.#removeElement(cursor)
    return true
  }

  /**
   * Removes the provided element from the list
   * @param {Element} element {@link Element} to remove
   */
  #removeElement (element) {
    if (element === this.#head && element === this.#tail) {
      this.#count = 0
      this.#head = null
      this.#tail = null
      return
    } else if (element === this.#head) {
      this.#head = element.next
      delete this.#head.prev
    } else if (element === this.#tail) {
      this.#tail = element.prev
      delete this.#tail.next
    } else {
      element.prev.next = element.next
      element.next.prev = element.prev
    }
    this.#count--
  }
}
