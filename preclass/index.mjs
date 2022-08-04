// https://github.com/zloirock/core-js#array-grouping

// stable ES, web standards and stage 3 ES proposals
import "core-js/actual/array/index.js";
// stage 2
import "core-js/full/array/from-async.js";

import {  deepStrictEqual, deepEqual } from 'assert'
import { describe, it } from 'node:test';

describe('Array new features', () => {
  describe('new immutable array functions', () => {
    it('old way to change arrays (mutable)', () => {
      const items = [1, 3, 2]
      items.sort() // [1, 2, 3]
  
      deepStrictEqual(items, [1, 2, 3], "the value was actually changed by [1, 2, 3]")
  
      items.reverse() // [3, 2, 1]
      deepStrictEqual(items, [3, 2, 1], "now it's [3 , 2, 1]")
  
      items.splice(1, 1)
      deepStrictEqual(items, [3, 1], "now it's [3, 1]")
    });

    it('[toSorted] ', () => {
      const input = [1, 3, 2]
      const output = input.toSorted()
      deepStrictEqual(output, [1, 2, 3])
      deepStrictEqual(input, [1, 3, 2])
    })

    it('[toSpliced] ', () => {
      const input = [1, 3, 2]
      const output = input.toSpliced(2, 2)
      deepStrictEqual(output, [1, 3])
      deepStrictEqual(input, [1, 3, 2])
    })

    it('[toReversed] ', () => {
      const input = [1, 3, 2]
      const output = input.toReversed()
      deepStrictEqual(output, [2, 3, 1])
      deepStrictEqual(input, [1, 3, 2])
    })

    it('[with]', () => {
      const input = [1, 3, 2]
      const output = input.with(0, 10).with(1, 20).with(2, 30)
      deepStrictEqual(output, [10, 20, 30])
      deepStrictEqual(input, [1, 3, 2])
    })
  })

  describe('groupping', () => {

    it('old way to group items', () => {
      const mapped = {
        even: [],
        odd: []
      };

      [0, 1, 2, 3].forEach(num => num % 2 == 0 ?
        mapped.even.push(num) :
        mapped.odd.push(num)
      )
      deepStrictEqual(mapped, {
        even: [0, 2],
        odd: [1, 3]
      })

    })

    it('new way to group items', () => {
      const result = [0, 1, 2, 3]
        .group(num => num % 2 === 0 ? 'even' : 'odd');

      deepEqual(result, {
        even: [0, 2],
        odd: [1, 3]
      })
    })
  })

  describe('fromASync', () => {
    function* main() {
      yield 'Hello'
      yield '-'
      yield 'World'
    }

    async function* asyncMain() {
      yield Promise.resolve('Hello')
      yield '-'
      yield Promise.resolve('World')
    }

    it('before [fromAsync]', async () => {
      const it = Array.from(main())
      deepStrictEqual(it, ['Hello', '-', 'World'], 'sync iterators')
      
      const asyncIt = Array.from(asyncMain())
      deepStrictEqual(asyncIt, [])

      const results = []
      for await (const i of asyncMain()) results.push(i)
      deepStrictEqual(results, ['Hello', '-', 'World'], 'async iterators forOf')
    })

    it('after [fromAsync]', async () => {
      const results = await Array.fromAsync(asyncMain())
      deepStrictEqual(results, ['Hello', '-', 'World'], 'async iterators fromAsync')
    })
  })
});