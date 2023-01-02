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
    return this.search(
      () => {
        while (q.getCount() > 0) {
          if (!globalVisited.has(q.first().current)) {
            return true
          }
          q.dequeue()
        }
        return false
      },
      () => {
        const { current, visited } = q.dequeue()
        globalVisited.add(current)
        visited.add(current)
        return { current, visited }
      },
      (visited, edges) => {
        for (const { target } of edges) {
          q.enqueue({ current: target, visited: new Set(visited) })
        }
      }
    )
  }

  /**
   * Traverse grid vis Depth First Search to find a path to the target
   * @returns {Path} Path containing route found via Depth First Search
   */
  dfs () {
    const globalVisited = new Set()
    const s = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    return this.search(
      () => {
        while (s.getCount() > 0) {
          if (!globalVisited.has(s.peek().current)) {
            return true
          }
          s.pop()
        }
        return false
      },
      () => {
        const { current, visited } = s.pop()
        globalVisited.add(current)
        visited.add(current)
        return { current, visited }
      },
      (visited, edges) => {
        while (edges.length) {
          const { target } = edges.pop()
          if (globalVisited.has(target)) continue
          s.push({ current: target, visited: new Set(visited) })
        }
      }
    )
  }

  /**
   * Abstract search implementation
   * @param {() => boolean} hasNext true if there is another vertex to visit, false otherwise
   * @param {() => { current: Vertex, visited: Set<Vertex> }} getVertex get next vertex to visit
   * @param {(visited: Set<Vertex>, edges: Edge[]) => void} addVerticies add verticies to collection of possible verticies to visit
   */
  search (hasNext, getVertex, addVerticies) {
    while (hasNext()) {
      const { current, visited } = getVertex()
      if (current === this.finish) {
        const path = new Path(this.start, this.finish)
        path.visited = visited
        path.isPathFound = true
        path.isTerminated = true
        return path
      }
      addVerticies(visited, current.edges)
    }
    const path = new Path(this.start, this.finish)
    path.isTerminated = true
    path.isPathFound = false
    return path
  }
}
