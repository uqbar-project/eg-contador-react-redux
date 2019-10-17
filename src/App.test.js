import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow } from 'enzyme'
import Context from './Context'
import App from './App'
import { Log } from './domain/log'

configure({ adapter: new Adapter() })

let wrapperContador

beforeEach(() => {
  wrapperContador = mount(<Context.Provider><App /> </Context.Provider>)
})

it('el contador inicialmente está en 0', () => {
  const label = wrapperContador.find('Label')
  expect(label.text()).toBe("0")
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
  expect(wrapperContador.find('LogRow')).toHaveLength(1)
})

it('cuando el usuario presiona el botón Delete Log se elimina un log', () => {
  const btnPlus = wrapperContador.find('button#plus')
  btnPlus.simulate('click')
  expect(wrapperContador.find('LogRow')).toHaveLength(1)
  const actualIndex = Log.getLastIndex() - 1
  wrapperContador.find(`button#delete_${actualIndex}`).simulate('click')
  expect(wrapperContador.find('LogRow')).toHaveLength(0)
})