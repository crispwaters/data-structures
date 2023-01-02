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
   * Traverse grid via Breadth First Search to find a path to the target
   * @note On an unweighted graph, if a path is found, it will be the shortest path. On a weighted graph, use Dijkstra or A* to find the shortest path
   * @returns {Path} Path containing route found via Breadth First Search
   */
  bfs () {
    const globalVisited = new Set()
    const q = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    while (q.getCount() > 0) {
      /** @type {{ current: Vertex, visited: Set<Vertex>}} */
      const { current, visited } = q.dequeue()
      if (globalVisited.has(current)) continue
      globalVisited.add(current)
      visited.add(current)
      if (current === this.finish) {
        const path = new Path(this.start, this.finish)
        path.visited = visited
        path.isPathFound = true
        path.isTerminated = true
        return path
      }
      const toVisit = current.edges.filter(edge => !globalVisited.has(edge.target))
      for (const { target } of toVisit) {
        q.enqueue({ current: target, visited: new Set(visited) })
      }
    }
    const path = new Path(this.start, this.finish)
    path.isTerminated = true
    path.isPathFound = false
    return path
  }

  /**
   * Traverse grid vis Depth First Search to find a path to the target
   * @returns {Path} Path containing route found via Depth First Search
   */
  dfs () {
    const globalVisited = new Set()
    const s = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    while (s.getCount() > 0) {
      /** @type {{ current: Vertex, visited: Set<Vertex> }} */
      const { current, visited } = s.pop()
      if (globalVisited.has(current)) continue
      globalVisited.add(current)
      visited.add(current)
      if (current === this.finish) {
        const path = new Path(this.start, this.finish)
        path.visited = visited
        path.isPathFound = true
        path.isTerminated = true
        return path
      }
      const toVisit = current.edges.filter(edge => !globalVisited.has(edge.target))
      while (toVisit.length) {
        const { target } = toVisit.pop()
        s.push({ current: target, visited: new Set(visited) })
      }
    }
    const path = new Path(this.start, this.finish)
    path.isTerminated = true
    path.isPathFound = false
    return path
  }
}
