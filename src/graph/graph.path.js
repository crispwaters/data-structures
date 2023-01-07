import { Vertex } from './graph.vertex.js' // eslint-disable-line no-unused-vars -- Importing for JSDoc
import { Edge } from './graph.edge.js' // eslint-disable-line no-unused-vars -- Importing for JSDoc
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
    return this.search({
      hasNext: () => {
        while (q.getCount() > 0) {
          if (!globalVisited.has(q.first().current)) {
            return true
          }
          q.dequeue()
        }
        return false
      },
      getVertex: () => {
        /** @type {{ current: Vertex, visited: Set<Vertex> }} */
        const { current, visited } = q.dequeue()
        globalVisited.add(current)
        visited.add(current)
        return { current, visited }
      },
      addVerticies: ({ current: { edges }, visited }) => {
        for (const { target } of edges) {
          if (globalVisited.has(target)) continue
          q.enqueue({ current: target, visited: new Set(visited) })
        }
      }
    })
  }

  /**
   * Traverse grid vis Depth First Search to find a path to the target
   * @returns {Path} Path containing route found via Depth First Search
   */
  dfs () {
    const globalVisited = new Set()
    const s = new LinkedList([{ current: this.start, visited: new Set(globalVisited) }])
    return this.search({
      hasNext: () => {
        while (s.getCount() > 0) {
          if (!globalVisited.has(s.peek().current)) {
            return true
          }
          s.pop()
        }
        return false
      },
      getVertex: () => {
        /** @type {{ current: Vertex, visited: Set<Vertex> }} */
        const { current, visited } = s.pop()
        globalVisited.add(current)
        visited.add(current)
        return { current, visited }
      },
      addVerticies: ({ current: { edges }, visited }) => {
        for (let i = edges.length - 1; i >= 0; i--) {
          const { target } = edges[i]
          if (globalVisited.has(target)) continue
          s.push({ current: target, visited: new Set(visited) })
        }
      }
    })
  }

  /**
   * Traverse grid via Dijkstra's Algorith to find a path with the shortest distance
   * @returns {Path} Path containing route found via Dijkstra's Algorithm
   */
  dijkstra () {
    const globalVisited = new Set([this.start])
    const pq = new LinkedList()
    const distances = new Map()
    distances.set(this.start, 0)
    const getTotalWeight =
    /**
     * @param {Vertex} from
     * @param {Edge} edge
     * @returns {number}
     */
    (from, edge) => distances.get(from) + edge.weight
    for (const edge of this.start.edges) {
      distances.set(edge, edge.weight)
      pq.addMinPriority({ current: edge.target, edge, from: this.start, visited: new Set(globalVisited) }, edge.weight)
    }
    return this.search({
      hasNext: () => {
        while (pq.getCount() > 0) {
          if (!globalVisited.has(pq.first().current)) {
            return true
          }
          pq.dequeue()
        }
      },
      getVertex: () => {
        const cur = pq.dequeue()
        const { current, visited, edge, from } = cur
        globalVisited.add(current)
        visited.add(current)
        distances.set(current, getTotalWeight(from, edge))
        return cur
      },
      addVerticies: ({ current, visited }) => {
        for (const edge of current.edges) {
          if (globalVisited.has(edge.target)) continue
          pq.addMinPriority({ current: edge.target, edge, from: current, visited: new Set(visited) }, getTotalWeight(current, edge))
        }
      }
    })
  }

  /**
   * Abstract search implementation
   * @param {object} funcs
   * @param {() => boolean} funcs.hasNext true if there is another vertex to visit, false otherwise
   * @param {() => { current: Vertex, visited: Set<Vertex> }} funcs.getVertex get next vertex to visit
   * @param {(params: { current: Vertex, visited: Set<Vertex> }) => void} funcs.addVerticies add verticies to collection of possible verticies to visit
   */
  search ({ hasNext, getVertex, addVerticies }) {
    while (hasNext()) {
      const cur = getVertex()
      const { current, visited } = cur
      if (current === this.finish) {
        const path = new Path(this.start, this.finish)
        path.visited = visited
        path.isPathFound = true
        path.isTerminated = true
        return path
      }
      addVerticies(cur)
    }
    const path = new Path(this.start, this.finish)
    path.isTerminated = true
    path.isPathFound = false
    return path
  }
}
