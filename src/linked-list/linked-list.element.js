/**
 * An element in a LinkedList
 */
export class Element {
  /** @type {Element?} previous element */
  prev
  /** @type {Element?} next element */
  next
  /** @type {any} value of this {@link Element} */
  val

  /**
   * @param {any} val value contained by this element
   */
  constructor (val) {
    this.val = val
  }
}

export class PriorityElement extends Element {
  /** @type {number} numeric priority */
  priority

  constructor (val, priority) {
    super(val)
    this.priority = priority
  }
}
