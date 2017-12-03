import * as React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { ConnectedDioriesList } from '../app/connected-diories-list'
import * as Adapter from 'enzyme-adapter-react-16';

describe('<ConnectedDioriesList />', () => {
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
    connectedDiories: [{}, {}],
    connections: [{}, {}]
  }
  const connection = {
    id: 1,
    fromDioryId: 1
    toDioryId: 2
  }
  let connectedDiories = [diory, diory]
  let connections = [connection, connection]
  configure({ adapter: new Adapter() })

  beforeEach(() => {
    component = mount(
      <ConnectedDioriesList
        connectedDiories={connectedDiories}
        connections={connections}
      />
    )
  })

  // Connected diories //

  it('shows the number of connected diories', () => {
    expect(component.find('.connected-diories-count').text()).toEqual("Connected diories: " + connectedDiories.length)
  })

  it('shows as many elements as there are connected diories', () => {
    expect(component.find('.connection').length).toEqual(connections.length)
  })

})
