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
