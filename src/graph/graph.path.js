import { Vertex } from './graph.vertex.js' // eslint-disable-line no-unused-vars -- Importing for JSDoc
import { LinkedList } from '../linked-list/linked-list.js'

export class Path {
  /** @type {Set<Vertex>} */
  visited
  /** @type {Vertex} */
  start
  /** @type {Vertex} */
  finish
  /** @type {boolean} */
  isPathFound = false
  /** @type {boolean} */
  isTerminated = false

  /**
   * @param {Vertex} start starting point
   * @param {Vertex} finish end point
   */
  constructor (start, finish) {
    this.start = start
    this.finish = finish
  }

  /**
   * Traverse grid via BFS to find the path containing the least steps to the target
   * @note On an unweighted graph, if a path is found, it will be the sortest path. On a weighted graph, use Dijkstra or A* to find the shortest path
   * @returns {Path} Path containing shortest route found via breadth first search
   */
  bfs () {
    if (this.isTerminated) return this
    const globalVisited = new Set([this.start])
    const q = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    while (q.getCount() > 0) {
      /** @type {{ current: Vertex, visited: Set<Vertex>}} */
      const { current, visited } = q.dequeue()
      if (current === this.finish) {
        this.visited = visited
        this.isPathFound = true
        this.isTerminated = true
        return this
      }
      const toVisit = current.edges.filter(edge => !globalVisited.has(edge.target))
      for (const { target } of toVisit) {
        globalVisited.add(target)
        q.enqueue({ current: target, visited: new Set(visited).add(target) })
      }
    }
    this.isTerminated = true
    this.isPathFound = false
    return this
  }
}
