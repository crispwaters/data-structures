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
