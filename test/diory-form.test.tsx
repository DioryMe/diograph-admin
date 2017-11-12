import * as React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { DioryForm } from '../app/diory-form'
import * as Adapter from 'enzyme-adapter-react-16';

describe('<DioryForm />', () => {
  let component, changedValue, saveClicked
  const diory = {
    name: "Name",
    type: "Type",
    background: "Background",
    url: "Url",
    geo: {
      latitude: "12",
      longitude: "34"
    },
    date: "Date",
    connectedDiories: []
  }
  const onDioryChange = (value) => { changedValue = value }
  const onSaveClick = () => { saveClicked = true }
  configure({ adapter: new Adapter() })

  beforeEach(() => {
    changedValue = undefined
    saveClicked = false
    component = mount(<DioryForm diory={diory} onDioryChange={onDioryChange} onSaveClick={onSaveClick} />)
  })

  it('onSaveClick turns saveClicked to true', () => {
    expect(saveClicked === false).toBeTruthy();
    onSaveClick()
    expect(saveClicked === true).toBeTruthy();
  })

  it('onDioryChange changes the changedValue', () => {
    expect(changedValue === undefined).toBeTruthy();
    onDioryChange("changed value")
    expect(changedValue).toEqual("changed value");
  })

  it('sets diory from props', () => {
    expect(component.prop('diory')).toEqual(diory)
  })

  it('puts name value to name input if given', () => {
  })

  it('calls onDioryChange when input value is changed', () => {
    component.find('input[name="name"]').simulate('change', {target: {value: 'My new value'}});
    expect(changedValue).toEqual({name: "My new value"})
  })

  it('calls onSaveClick when save is clicked', () => {
  })

})
