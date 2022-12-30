import { getLogger, LOG_LEVELS } from '../logger/logger.js'
import { Edge } from './graph.edge.js'

export const GRAPH_VERTEX_LOGGER_KEY = 'GRAPH_VERTEX_LOGGER'

const logger = getLogger(GRAPH_VERTEX_LOGGER_KEY)
logger.setLevel(LOG_LEVELS.none)

/**
 * Vertex in a graph
 */
export class Vertex {
  /** @type {Edge[]} */
  edges = []
  /** @type {{vertex: Vertex, edge: Edge}[]} */
  #prev = []
  #isDeleted = false

  /**
   * Adds an edge to another vertex
   * @param {object} info
   * @param {number?} info.weight Numeric value representing the edge weight, omit for unweighted graphs
   * @param {Vertex} info.target Vertex edge is connected to
   */
  addEdge ({ weight, target }) {
    this.#checkIsDeleted()
    const edge = new Edge({ weight, target })
    this.edges.push(edge)
    target.#prev.push({ vertex: this, edge })
  }

  /**
   * Removes an edge from this vertex
   * @param {Edge} edge edge to remove
   * @returns {boolean} true if removed, false otherwise
   */
  removeEdge (edge) {
    this.#checkIsDeleted()
    const index = this.edges.indexOf(edge)
    if (index <= -1) {
      logger.warn(edge, 'not available for removal from', this)
      return false
    }
    logger.verbose(edge, 'removed from', this)
    this.edges.splice(index, 1)
    const vertex = edge.target
    const prevIndex = vertex.#prev.findIndex((prev) => prev.edge === edge)
    vertex.#prev.splice(prevIndex, 1)
    return true
  }

  /**
   * Remove all edge references to and from this vertex and mark it as deleted
   */
  delete () {
    this.#checkIsDeleted()
    for (const edge of [...this.edges]) {
      this.removeEdge(edge)
    }
    for (const { vertex, edge } of [...this.#prev]) {
      vertex.removeEdge(edge)
    }
    this.#prev.length = 0
    this.edges.length = 0
    this.#isDeleted = true
  }

  /**
   * Checks if a vertex has been deleted
   * @returns {boolean} true if vertex is deleted, false otherwise
   */
  isDeleted () {
    return this.#isDeleted
  }

  #checkIsDeleted () {
    if (this.#isDeleted) throw new Error('This vertex is deleted, action cannot be performed')
  }
}
