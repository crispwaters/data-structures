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

test('LinkedList.removeAll removes all occurances of value', t => {
  const arr = [1, 2, 'foo', 'bar', 'foo']
  const list = new LinkedList(arr)
  t.is(list.removeAll('foo'), 2)
  t.is(list.getCount(), arr.length - 2)
  t.deepEqual(list.toArray(), [1, 2, 'bar'])
})

test('LinkedList.removeAll removes all occurances of provided criteria', t => {
  const arr = [1, 2, 'foo', 'bar', 3, 4]
  const list = new LinkedList(arr)
  t.is(list.removeAll((val) => typeof val === 'number' && val % 2 === 1), 2)
  t.is(list.getCount(), arr.length - 2)
  t.deepEqual(list.toArray(), [2, 'foo', 'bar', 4])
})

test('LinkedList.add works after all elements have been removed', t => {
  const arr = [1, 2, 'foo', 'bar', 3, 4]
  const list = new LinkedList(arr)
  t.is(list.removeAll((val) => true), arr.length)
  list.add('foobar')
  t.is(list.getCount(), 1)
  t.deepEqual(list.toArray(), ['foobar'])
})

test('LinkedList.removeAt removes element at provided index', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.true(list.removeAt(1))
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [1, 'foo', 'bar'])
})

test('LinkedList.removeAt returns false if no elements were removed', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.false(list.removeAt(arr.length))
  t.is(list.getCount(), arr.length)
  t.deepEqual(list.toArray(), arr)
})

test('LinkedList.push adds new value to end of list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  list.push(3)
  t.is(list.getCount(), arr.length + 1)
  t.deepEqual(list.toArray(), [...arr, 3])
})

test('LinkedList.push works from empty list', t => {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  t.is(list.getCount(), 3)
  t.deepEqual(list.toArray(), [1, 2, 3])
})

test('LinkedList.peek returns last value, does not modify list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.is(list.peek(), 'bar')
  t.is(list.getCount(), arr.length)
  t.deepEqual(list.toArray(), [...arr])
})

test('LinkedList.pop returns and removes last value from list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.is(list.pop(), 'bar')
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [1, 2, 'foo'])
})

test('LinkedList.pop on empty list returns undefined', t => {
  const list = new LinkedList()
  t.is(list.getCount(), 0)
  t.is(list.pop(), undefined)
})

test('LinkedList.enqueue adds new value to end of list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  list.enqueue(3)
  t.is(list.getCount(), arr.length + 1)
  t.deepEqual(list.toArray(), [...arr, 3])
})

test('LinkedList.enqueue works from empty list', t => {
  const list = new LinkedList()
  list.enqueue(1)
  list.enqueue(2)
  list.enqueue(3)
  t.is(list.getCount(), 3)
  t.deepEqual(list.toArray(), [1, 2, 3])
})

test('LinkedList.dequeue returns and removes first value from list', t => {
  const arr = [1, 2, 'foo', 'bar']
  const list = new LinkedList(arr)
  t.is(list.dequeue(), 1)
  t.is(list.getCount(), arr.length - 1)
  t.deepEqual(list.toArray(), [2, 'foo', 'bar'])
})

test('LinkedList.dequeue on empty list returns undefined', t => {
  const list = new LinkedList()
  t.is(list.getCount(), 0)
  t.is(list.dequeue(), undefined)
})

test('LinkedList.first returns first element', t => {
  const list = new LinkedList([1, 2, 3])
  t.is(list.first(), 1)
})

test('LinkedList.first returns undefined on empty list', t => {
  const list = new LinkedList()
  t.is(list.first(), undefined)
})

test('LinkedList.last returns last element', t => {
  const list = new LinkedList([1, 2, 3])
  t.is(list.last(), 3)
})

test('LinkedList.last returns undefined on empty list', t => {
  const list = new LinkedList()
  t.is(list.last(), undefined)
})
