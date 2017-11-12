import * as React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { DioryForm } from '../app/diory-form'
import * as Adapter from 'enzyme-adapter-react-16';

describe('<DioryForm />', () => {
  let component
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
  const onDioryChange = () => { console.log("CHANGE")}
  const onSaveClick = () => { console.log("SAVE")}
  configure({ adapter: new Adapter() })

  beforeEach(() => {
    component = mount(<DioryForm diory={diory} onDioryChange={onDioryChange} onSaveClick={onSaveClick} />)
  })

  it('sets diory from props', () => {
    expect(component.prop('diory')).toEqual(diory)
  })

})
