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
    return this.#bdfs(
      q => q.dequeue(),
      (q, visited, edges) => {
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
    return this.#bdfs(
      s => s.pop(),
      (s, visited, edges) => {
        while (edges.length) {
          const { target } = edges.pop()
          s.push({ current: target, visited: new Set(visited) })
        }
      }
    )
  }

  /**
   * Abstract implementation of BFS and DFS
   * @param {(list: LinkedList) => { current: Vertex, visited: Set<Vertex> }} getVertex
   * @param {(list: LinkedList, visited: Set<Vertex>, edges: Edge[]) => void} addVerticies
   */
  #bdfs (getVertex, addVerticies) {
    const globalVisited = new Set()
    const qs = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    while (qs.getCount() > 0) {
      const { current, visited } = getVertex(qs)
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
      addVerticies(qs, visited, current.edges.filter(edge => !globalVisited.has(edge.target)))
    }
    const path = new Path(this.start, this.finish)
    path.isTerminated = true
    path.isPathFound = false
    return path
  }
}
