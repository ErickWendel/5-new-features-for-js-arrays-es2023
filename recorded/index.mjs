// stable ES, web standards and stage 3 ES proposals
import "core-js/actual/array/index.js"

// stage 2 
import "core-js/full/array/from-async.js"


import {
  describe,
  it
} from 'node:test'
import assert, {
  deepStrictEqual
} from 'node:assert'

describe("Array new feature", () => {
  describe('new immutable array functions', () => {
    it("old way tp change arrays (mutable", () => {
      const items = [1, 3, 2]

      items.sort()
      assert.deepStrictEqual(items, [1, 2, 3], "the value was mutate by sort!")

      items.reverse()
      assert.deepStrictEqual(items, [3, 2, 1], "the value was mutate by sort!")

      items.splice(1, 1)
      assert.deepStrictEqual(items, [3, 1], "the value was mutate by sort!")
    })

    it('[toSorted]', () => {
      const input = [1, 3, 2]
      const output = input.toSorted()
      deepStrictEqual(output, [1, 2, 3])
      deepStrictEqual(input, [1, 3, 2])
    })

    it('[toSpliced]', () => {
      const input = [1, 3, 2]
      const output = input.toSpliced(1, 2)
      deepStrictEqual(output, [1])
      deepStrictEqual(input, [1, 3, 2])
    })

    it('[toReversed]', () => {
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
        }
        
        ;[0, 1, 2, 3].forEach(num => num % 2 === 0 ?
          mapped.even.push(num) :
          mapped.odd.push(num)
        )

        assert.deepStrictEqual(mapped, {
          even: [ 0, 2],
          odd: [ 1, 3 ]
        })
    })

    it('new way to group items', () => {
      const result = [0, 1, 2, 3]
      .group(num => num % 2 === 0 ? 'even': 'odd')

     assert.deepEqual(result, {
      even: [0, 2],
      odd: [1, 3]
     })
    })
  })

  describe('fromAsync' , () => {
    function * main() {
      yield 'Hello'
      yield '-'
      yield 'World'
    }

    async function * asyncMain() {
      yield Promise.resolve('Hello')
      yield '-'
      yield Promise.resolve('World')
    }

    it('before [fromAsync]', async () => {
      const it = Array.from(main())
      assert.deepStrictEqual(it, [ 'Hello', '-', 'World' ])

      const asyncIn = Array.from(asyncMain())
      assert.deepStrictEqual(asyncIn, [])

      const result = []
      for await(const i of asyncMain()) result.push(i)
      assert.deepStrictEqual(result,  [ 'Hello', '-', 'World' ])
    })
    
    it('after [fromAsync', async() => {
      const results = await Array.fromAsync(asyncMain())
      assert.deepStrictEqual(results,  [ 'Hello', '-', 'World' ])
    })
  })
})