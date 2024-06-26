import deepFreeze from 'deep-freeze'
import counterReducer from './reducer.js'
import { test, describe, beforeEach} from 'node:test'
import assert from 'assert'

describe('unicafe reducer', () => {

  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    assert.deepStrictEqual(newState, initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    assert.deepStrictEqual(newState,{
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    assert.deepStrictEqual(newState,{
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    assert.deepStrictEqual(newState,{
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero resets', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 5,
      ok: 2,
      bad: 0
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    assert.deepStrictEqual(newState,{
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})