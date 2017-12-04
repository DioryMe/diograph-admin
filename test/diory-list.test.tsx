import * as React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { DioryList } from '../app/diory-list'
import * as Adapter from 'enzyme-adapter-react-16';

describe('<DioryList />', () => {
  let component
  let dioryInFocusId = 0
  const diory = {
    id: 1,
    name: "Name",
    type: "Type",
    background: "Background",
    url: "Url",
    geo: {
      latitude: "12",
      longitude: "34"
    },
    date: "Date",
    connectedDiories: [{}, {}],
    connections: [{}, {}]
  }
  const diories = [diory, diory, diory]
  const onFocusClick = (id) => { dioryInFocusId = id }
  const onConnectDioriesClick = () => { }
  const onDeleteDioryClick = () => { }

  configure({ adapter: new Adapter() })

  beforeEach(() => {
    component = mount(
      <DioryList
        diories={diories}
        onFocusClick={onFocusClick}
        onConnectDioriesClick={onConnectDioriesClick}
        onDeleteDioryClick={onDeleteDioryClick}
      />
    )
  })

  it('shows as many diory-list-items as there are diories', () => {
    expect(component.find('.diory-list-item').length).toEqual(diories.length)
  })

  it('calls onFocusClick() when clicking diory name', () => {
    component.find('.diory-list-item > a.diory-name').first().simulate('click');
    expect(dioryInFocusId).toEqual(diories[0].id)
  })

})
