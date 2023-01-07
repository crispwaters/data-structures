import test from 'ava'
import { Path } from './graph.path.js'
import { Vertex } from './graph.vertex.js'

test('BFS returns path', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: finish })
  a.addEdge({ target: c })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: a })
  c.addEdge({ target: finish })
  // #endregion

  const expected = new Set([start, a, finish])
  // #endregion

  const path = new Path(start, finish).bfs()
  t.true(path.isPathFound)
  t.true(path.isTerminated)
  const iExpected = expected.values()
  const iActual = path.visited.values()
  let rExpected = iExpected.next()
  let rActual = iActual.next()
  while (!rExpected.done && !rActual.done) {
    t.is(rActual.value, rExpected.value)
    rExpected = iExpected.next()
    rActual = iActual.next()
  }
  t.true(rExpected.done, rExpected.value)
  t.true(rActual.done, rActual.value)
})

test('BFS marks path not found when no path exists to target', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: c })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: a })
  // #endregion
  // #endregion

  const path = new Path(start, finish).bfs()
  t.false(path.isPathFound)
  t.true(path.isTerminated)
})

test('BFS does not alter the graph', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: finish })
  a.addEdge({ target: c })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: a })
  c.addEdge({ target: finish })
  // #endregion
  // #endregion

  new Path(start, finish).bfs()
  t.is(start.edges.length, 2)
  t.true(start.edges.some(({ target }) => target === a))
  t.true(start.edges.some(({ target }) => target === b))
  t.is(a.edges.length, 2)
  t.true(a.edges.some(({ target }) => target === finish))
  t.true(a.edges.some(({ target }) => target === c))
  t.is(b.edges.length, 2)
  t.true(b.edges.some(({ target }) => target === a))
  t.true(b.edges.some(({ target }) => target === c))
  t.is(b.edges.length, 2)
  t.true(c.edges.some(({ target }) => target === a))
  t.true(c.edges.some(({ target }) => target === finish))
  t.is(finish.edges.length, 0)
})

test('DFS returns path', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()
  const d = new Vertex()
  const e = new Vertex()
  const f = new Vertex()
  const g = new Vertex()
  const h = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: g })
  a.addEdge({ target: h })
  a.addEdge({ target: b })
  a.addEdge({ target: d })
  a.addEdge({ target: f })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: d })
  c.addEdge({ target: f })
  d.addEdge({ target: e })
  e.addEdge({ target: f })
  f.addEdge({ target: finish })
  g.addEdge({ target: h })
  // #endregion

  const expected = new Set([start, a, b, c, d, e, f, finish])
  // #endregion

  const path = new Path(start, finish).dfs()
  t.true(path.isPathFound)
  t.true(path.isTerminated)
  const iExpected = expected.values()
  const iActual = path.visited.values()
  let rExpected = iExpected.next()
  let rActual = iActual.next()
  while (!rExpected.done && !rActual.done) {
    t.is(rActual.value, rExpected.value)
    rExpected = iExpected.next()
    rActual = iActual.next()
  }
  t.true(rExpected.done)
  t.true(rActual.done)
})

test('DFS marks path not found when no path exists to target', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: c })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: a })
  // #endregion
  // #endregion

  const path = new Path(start, finish).dfs()
  t.false(path.isPathFound)
  t.true(path.isTerminated)
})

test('DFS does not alter the graph', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()
  const d = new Vertex()
  const e = new Vertex()
  const f = new Vertex()
  const g = new Vertex()
  const h = new Vertex()

  // #region edges
  start.addEdge({ target: a })
  start.addEdge({ target: b })
  a.addEdge({ target: g })
  a.addEdge({ target: h })
  a.addEdge({ target: b })
  a.addEdge({ target: d })
  a.addEdge({ target: f })
  b.addEdge({ target: a })
  b.addEdge({ target: c })
  c.addEdge({ target: d })
  c.addEdge({ target: f })
  d.addEdge({ target: e })
  e.addEdge({ target: f })
  f.addEdge({ target: finish })
  g.addEdge({ target: h })
  // #endregion
  // #endregion

  new Path(start, finish).dfs()
  t.is(start.edges.length, 2)
  t.true(start.edges.some(({ target }) => target === a))
  t.true(start.edges.some(({ target }) => target === b))
  t.is(a.edges.length, 5)
  t.true(a.edges.some(({ target }) => target === g))
  t.true(a.edges.some(({ target }) => target === h))
  t.true(a.edges.some(({ target }) => target === b))
  t.true(a.edges.some(({ target }) => target === d))
  t.true(a.edges.some(({ target }) => target === f))
  t.is(b.edges.length, 2)
  t.true(b.edges.some(({ target }) => target === a))
  t.true(b.edges.some(({ target }) => target === c))
  t.is(c.edges.length, 2)
  t.true(c.edges.some(({ target }) => target === d))
  t.true(c.edges.some(({ target }) => target === f))
  t.is(d.edges.length, 1)
  t.true(d.edges.some(({ target }) => target === e))
  t.is(e.edges.length, 1)
  t.true(e.edges.some(({ target }) => target === f))
  t.is(f.edges.length, 1)
  t.true(f.edges.some(({ target }) => target === finish))
  t.is(g.edges.length, 1)
  t.true(g.edges.some(({ target }) => target === h))
  t.is(h.edges.length, 0)
})

test('Dijkstra finds shortest path on weighted graph', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()
  const d = new Vertex()

  // #region edges
  start.addEdge({ target: a, weight: 5 })
  start.addEdge({ target: b, weight: 1 })
  a.addEdge({ target: finish, weight: 10 })
  b.addEdge({ target: c, weight: 2 })
  b.addEdge({ target: a, weight: 3 })
  c.addEdge({ target: d, weight: 3 })
  d.addEdge({ target: finish, weight: 4 })
  d.addEdge({ target: a, weight: 1 })
  // #endregion

  const expected = new Set([start, b, c, d, finish])
  // #endregion

  const path = new Path(start, finish).dijkstra()
  t.true(path.isPathFound)
  t.true(path.isTerminated)
  const iExpected = expected.values()
  const iActual = path.visited.values()
  let rExpected = iExpected.next()
  let rActual = iActual.next()
  while (!rExpected.done && !rActual.done) {
    t.is(rActual.value, rExpected.value)
    rExpected = iExpected.next()
    rActual = iActual.next()
  }
  t.true(rExpected.done, rExpected.value)
  t.true(rActual.done, rActual.value)
})

test('Dijkstra does not alter the graph', t => {
  // #region setup
  const start = new Vertex()
  const finish = new Vertex()
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()
  const d = new Vertex()

  // #region edges
  start.addEdge({ target: a, weight: 5 })
  start.addEdge({ target: b, weight: 1 })
  a.addEdge({ target: finish, weight: 10 })
  b.addEdge({ target: c, weight: 2 })
  b.addEdge({ target: a, weight: 3 })
  c.addEdge({ target: d, weight: 3 })
  d.addEdge({ target: finish, weight: 4 })
  d.addEdge({ target: a, weight: 1 })
  // #endregion
  // #endregion

  new Path(start, finish).dijkstra()
  t.is(start.edges.length, 2)
  t.true(start.edges.some(({ target }) => target === a))
  t.true(start.edges.some(({ target }) => target === b))
  t.is(a.edges.length, 1)
  t.true(a.edges.some(({ target }) => target === finish))
  t.is(b.edges.length, 2)
  t.true(b.edges.some(({ target }) => target === a))
  t.true(b.edges.some(({ target }) => target === c))
  t.is(c.edges.length, 1)
  t.true(c.edges.some(({ target }) => target === d))
  t.is(d.edges.length, 2)
  t.true(d.edges.some(({ target }) => target === a))
  t.true(d.edges.some(({ target }) => target === finish))
  t.is(finish.edges.length, 0)
})
