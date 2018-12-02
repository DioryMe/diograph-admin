import * as React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { ConnectedDioriesList } from '../app/connected-diories-list'
import * as Adapter from 'enzyme-adapter-react-16';

describe('<ConnectedDioriesList />', () => {
  let component
  let dioryInFocusId = 1
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
    connectedDiories: [{id: 2, name: "Another diory"}, {id: 3, name: "Third diory"}],
    connections: [{id: 1, fromDioryId: 1, toDioryId: 2}, {id: 2, fromDioryId: 1, toDioryId: 3}]
  }
  const connectedDiories = diory.connectedDiories
  const connections = diory.connections

  const onDeleteConnectionClick = () => { }
  const onConnectedDioryClick = (id) => { dioryInFocusId = id }

  configure({ adapter: new Adapter() })

  beforeEach(() => {
    this.jsdom = require('jsdom-global')()

    component = mount(
      <ConnectedDioriesList
        connectedDiories={connectedDiories}
        connections={connections}
        onDeleteConnectionClick={onDeleteConnectionClick}
        onConnectedDioryClick={onConnectedDioryClick}
      />
    )
  })

  it('shows the number of connected diories', () => {
    expect(component.find('.connected-diories-count').text()).toEqual("Connected diories: " + connectedDiories.length)
  })

  it('connections toDioryIds match to connectedDioryIds', () => {
    let connectionToDioryIds = connections.map((connection) => { return connection.toDioryId })
    let connectedDioryIds = connectedDiories.map((connectedDiory) => { return connectedDiory.id })
    expect(connectionToDioryIds.length).toEqual(connectedDioryIds.length)
    connectionToDioryIds.forEach(toDioryId => {
      expect(connectedDioryIds).toContain(toDioryId)
    })
  })

  it('shows as many connected diory elements as there are connected diories', () => {
    expect(component.find('.connected-diory').length).toEqual(connectedDiories.length)
  })

  it('shows diory name in the connected diory element', () => {
    expect(component.find('.connected-diory').first().text()).toEqual(connectedDiories[0].name)
  })

  it('shows as many connection elements as there are connections', () => {
    expect(component.find('.connection').length).toEqual(connections.length)
  })

  it('calls onConnectedDioryClick() when clicking connected diory name', () => {
    component.find('.connected-diory').first().simulate('click');
    expect(dioryInFocusId).toEqual(connectedDiories[0].id)
  })


})
