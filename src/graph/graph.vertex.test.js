import test from 'ava'
import { Edge } from './graph.edge.js'
import { Vertex } from './graph.vertex.js'

test('Add weighted edge to vertex', t => {
  const vertex = new Vertex()
  const target = new Vertex()
  vertex.addEdge({ weight: 3, target })
  t.is(vertex.edges.length, 1)
  t.is(vertex.edges[0].weight, 3)
  t.is(vertex.edges[0].target, target)
})

test('Add unweighted edge to vertex', t => {
  const vertex = new Vertex()
  const target = new Vertex()
  vertex.addEdge({ target })
  t.is(vertex.edges.length, 1)
  t.is(vertex.edges[0].weight, 1)
  t.is(vertex.edges[0].target, target)
})

test('Add edge to self', t => {
  const vertex = new Vertex()
  vertex.addEdge({ target: vertex })
  t.is(vertex.edges.length, 1)
  t.is(vertex.edges[0].weight, 1)
  t.is(vertex.edges[0].target, vertex)
})

test('Remove existing edge', t => {
  const vertex = new Vertex()
  const target = new Vertex()
  vertex.addEdge({ target })
  t.true(vertex.removeEdge(vertex.edges[0]))
  t.is(vertex.edges.length, 0)
})

test('Remove non-existent edge returns false', t => {
  const vertex = new Vertex()
  const target = new Vertex()
  vertex.addEdge({ target })
  target.addEdge({ target: vertex })
  t.false(target.removeEdge(vertex.edges[0]))
  t.is(vertex.edges.length, 1)
  t.is(target.edges.length, 1)
})

test('Delete marks vertex as deleted', t => {
  const vertex = new Vertex()
  vertex.delete()
  t.true(vertex.isDeleted())
})

test('Cannot perform actions on deleted vertex', t => {
  const vertex = new Vertex()
  const target = new Vertex()
  const edge = new Edge({ target })
  vertex.delete()
  t.throws(() => vertex.addEdge({ target }))
  t.throws(() => vertex.removeEdge(edge))
  t.throws(() => vertex.delete())
})

test('Delete updates edges correctly', t => {
  const a = new Vertex()
  const b = new Vertex()
  const c = new Vertex()
  const d = new Vertex()
  a.addEdge({ target: b, weight: 1 })
  a.addEdge({ target: c, weight: 2 })
  b.addEdge({ target: c, weight: 3 })
  b.addEdge({ target: d, weight: 4 })
  c.addEdge({ target: d, weight: 5 })
  b.delete()
  t.is(a.edges.length, 1)
  t.is(a.edges[0].target, c)
  t.is(b.edges.length, 0)
  t.is(c.edges.length, 1)
  t.is(c.edges[0].target, d)
  t.true(b.isDeleted())
  t.false(d.isDeleted())
  d.delete()
  t.is(a.edges.length, 1)
  t.is(b.edges.length, 0)
  t.is(c.edges.length, 0)
  t.is(d.edges.length, 0)
  t.true(d.isDeleted())
})
