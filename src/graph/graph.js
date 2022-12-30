import { getLogger, LOG_LEVELS } from '../logger/logger.js'
import { Vertex } from './graph.vertex.js'

export const GRAPH_VERTEX_LOGGER_KEY = 'GRAPH_VERTEX_LOGGER'

const logger = getLogger(GRAPH_VERTEX_LOGGER_KEY)
logger.setLevel(LOG_LEVELS.none)

/**
 * Encapsulation of verticies and the edges connecting them
 */
export class Graph {
  #isDirected

  verticies = []

  /**
   * @param {object} options
   * @param {boolean} options.isDirected true if the graph is directed, false otherwise.
   */
  constructor ({ isDirected = false } = {}) {
    this.#isDirected = isDirected
  }

  /**
   * Creates a new vertex
   * @returns {Vertex} newly created vertex
   */
  addVertex () {
    const vertex = new Vertex()
    this.verticies.push(vertex)
    return vertex
  }

  /**
   * Removes a vertex from this graph
   * @param {Vertex} vertex vertext to remove
   * @returns {boolean} true if removed, false otherwise
   */
  removeVertex (vertex) {
    const index = this.verticies.indexOf(vertex)
    if (index <= -1) {
      logger.warn(vertex, 'not available for removal from', this)
      return false
    }
    vertex.delete()
    logger.verbose(vertex, 'removed from', this)
    this.verticies.splice(index, 1)
    return true
  }
}
