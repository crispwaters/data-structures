import test from 'ava'
import { LinkedList } from './linked-list.js'

test('LinkedList creats empty list when no array is provided', t => {
  const list = new LinkedList()
  t.is(list.getCount(), 0)
  t.deepEqual(list.toArray(), [])
})

test('LinkedList creates list from initial array', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.is(list.getCount(), arr.length)
  t.deepEqual(list.toArray(), arr)
})

test('LinkedList.add adds new values at end of list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  list.add(3)
  t.is(list.getCount(), arr.length + 1)
  t.deepEqual(list.toArray(), [...arr, 3])
})

test('LinkedList.remove removes first occurance of value', t => {
  const arr = [1, 2, 'foo', 'bar', 'foo']
  const list = new LinkedList(arr)
  t.true(list.remove('foo'))
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [1, 2, 'bar', 'foo'])
})

test('LinkedList.remove removes first occurance of provided criteria', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.true(list.remove((val) => typeof val === 'string'))
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [1, 2, 'bar'])
})

test('LinkedList.remove returns false if no elements were removed', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.false(list.remove(3))
  t.is(list.getCount(), arr.length)
  t.deepEqual(list.toArray(), arr)
})

test('LinkedList.removeAt removes element at provided index', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.true(list.removeAt(0))
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [2, 'foo', 'bar'])
})

test('LinkedList.removeAt returns false if no elements were removed', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.false(list.removeAt(arr.length))
  t.is(list.getCount(), arr.length)
  t.deepEqual(list.toArray(), arr)
})
