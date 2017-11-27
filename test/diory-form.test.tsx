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
    connectedDiories: [{}, {}]
  }
  const onDioryChange = (value) => { changedValue = value }
  const onSaveClick = () => { saveClicked = true }
  configure({ adapter: new Adapter() })

  beforeEach(() => {
    changedValue = undefined
    saveClicked = false
    component = mount(<DioryForm diory={diory} onDioryChange={onDioryChange} onSaveClick={onSaveClick} />)
  })

  // Helper tests //

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

  // Props diory //

  it('sets diory from props', () => {
    expect(component.prop('diory')).toEqual(diory)
  })

  it('puts name value to name input if given', () => {
    let nameInputText = component.find('input[name="name"]').props().value;
    expect(nameInputText).toEqual("Name")
  })

  // Calling onDioryChange //

  it('calls onDioryChange when input value is changed', () => {
    component.find('input[name="name"]').simulate('change', {target: {value: 'My new value'}});
    expect(changedValue).toEqual({name: "My new value"})
  })

  // Calling onSaveClick //

  it('calls onSaveClick when save is clicked', () => {
    component.find('button[name="saveButton"]').simulate('click');
    expect(saveClicked).toBeTruthy()
  })

  // Connected diories //

  it('shows the number of connected diories', () => {
    expect(component.find('.connected-diories').text()).toEqual("2")
  })

  fit('shows as many elements as there are connected diories', () => {
    expect(component.find('.connected-diory-form').length).toEqual(2)
  })

})
