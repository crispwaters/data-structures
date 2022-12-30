import { Vertex } from './graph.vertex.js' // eslint-disable-line no-unused-vars -- Importing for JSDoc

/**
 * Edge connecting two verticies together
 */
export class Edge {
  weight
  target

  /**
   * @param {object} info
   * @param {number} info.weight Numeric weight of this edge, omit for unweighted graphs
   * @param {Vertex} info.target Ending vertex of edge
   */
  constructor ({ weight = 1, target }) {
    this.weight = weight
    this.target = target
  }
}
