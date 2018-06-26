import React from 'react'
import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import Contador from './components/contador'
import LogContador from './components/logContador'
import { createStore } from 'redux'
import { increment } from './redux/actions'
import { INCREMENT, reducerContador } from './redux/store'

configure({ adapter: new Adapter() })

let wrapperContador
let store

beforeEach(() => {
  store = createStore(reducerContador, { value: 0, logs: [] })
  wrapperContador = mount(<Contador store={store} />)
})
it('el contador inicialmente está en 0', () => {
  const label = wrapperContador.find('Label')
  expect(label.text()).toBe("0")
})
it('acción de incrementar', () => {
  expect(increment()).toEqual({ type: INCREMENT })
})
it('cuando el usuario presiona el botón + el contador pasa a estar en 1', () => {
  const btnPlus = wrapperContador.find('button#plus')
  btnPlus.simulate('click')
  const label = wrapperContador.find('Label')
  expect(label.text()).toBe("1")
})
it('cuando el usuario presiona el botón - el contador pasa a estar en -1', () => {
  const btnMinus = wrapperContador.find('button#minus')
  btnMinus.simulate('click')
  const label = wrapperContador.find('Label')
  expect(label.text()).toBe("-1")
})
it('cuando el usuario presiona el botón + se agrega un log', () => {
  const btnPlus = wrapperContador.find('button#plus')
  btnPlus.simulate('click')
  expect(store.getState().logs.length).toBe(1)
})
it('cuando el usuario presiona el botón Delete Log se elimina un log', () => {
  const btnPlus = wrapperContador.find('button#plus')
  btnPlus.simulate('click')
  const logs = store.getState().logs
  expect(logs.length).toBe(1)
  const logId = logs[0].id
  const wrapperLogContador = mount(<LogContador store={store} />)
  wrapperLogContador.find("button#delete_" + logId).simulate('click')
  expect(store.getState().logs.length).toBe(0)
})