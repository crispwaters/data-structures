import test from 'ava'
import { Edge } from './graph.edge.js'
import { Vertex } from './graph.vertex.js'

test('Create weighted edge', t => {
  const target = new Vertex()
  const edge = new Edge({ weight: 7, target })
  t.is(edge.weight, 7)
  t.is(edge.target, target)
})

test('Create unweighted edge', t => {
  const target = new Vertex()
  const edge = new Edge({ target })
  t.is(edge.weight, 1)
  t.is(edge.target, target)
})
