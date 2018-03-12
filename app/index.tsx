import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

import { DiographSearchCreate } from "diograph-search-create"
import { DioryForm } from "./diory-form"
import { DioryList } from "./diory-list"
import { ConnectedDioriesList } from "./connected-diories-list"

// Promise.all() requires this to work
declare var Promise: any;

class App extends React.Component {
  state
  inFocus

  constructor(props) {
    super(props)
    DiographStore.setAuthToken(DiographAuthentication.token);
    document.getElementById('files').addEventListener('change', DiographStore.createDioryFromImageFile.bind(DiographStore), false);
    this.state = {diories: [], inFocus: {geo: {}, connections: []}}

    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.onCreateDioryClick() }}>Create new diory</button>
        <DiographSearchCreate onFocusClick={(dioryId) => { this.putInFocus(dioryId)}} />
        <DioryForm
          diory={this.state.inFocus}
          onDioryChange={(diory) => { this.onDioryChange(diory) }}
          onSaveClick={() => this.saveChangesToDiory() } />
        <ConnectedDioriesList
         connectedDiories={this.state.inFocus.connectedDiories}
         connections={this.state.inFocus.connections}
         onDeleteConnectionClick={(fromDioryId, toDioryId) => { this.onDeleteConnectionClick(fromDioryId, toDioryId) }}
         onConnectedDioryClick={(connectedDioryId) => { this.putInFocus(connectedDioryId) }} />
        <DioryList
          diories={this.state.diories}
          onFocusClick={(dioryId) => { this.putInFocus(dioryId)}}
          onConnectDioriesClick={(toDioryId) => { this.onConnectDioriesClick(toDioryId) }}
          onDeleteDioryClick={(dioryId) => { this.onDeleteDioryClick(dioryId) }} />
      </div>
    )
  }

  async putInFocus(dioryId) {
    let promises = []
    let connections = []
    let dioryInFocus = await DiographStore.getDiory(dioryId)
    dioryInFocus.connectedDiories.forEach(connectedDiory => {
      let connectionPromise = DiographStore.getConnection(dioryId, connectedDiory.id).then(connection => {
        connections.push(connection)
      })
      promises.push(connectionPromise)
    })

    await Promise.all(promises)
    dioryInFocus.connections = connections
    this.setState({inFocus: dioryInFocus})
  }

  onDioryChange(d) {
    let diory = this.state.inFocus
    // Exception case: nested geo property
    if (d["geo"]) {
      if (d["geo"]["latitude"]) { d["geo"]["longitude"] = diory["geo"]["longitude"] }
      if (!d["geo"]["latitude"]) { d["geo"]["latitude"] = diory["geo"]["latitude"] }
      d["geo"]["type"] = diory["geo"]["type"]
      d["geo"]["geoRadius"] = diory["geo"]["geoRadius"]
    }
    // Merge object d with diory
    for (var attrname in d) { diory[attrname] = d[attrname]; }
    this.setState({inFocus: diory})
  }

  onCreateDioryClick() {
    let dioryObj = {
      name: "New diory " + (new Date).toString().substr(0,21)
    }
    DiographStore.createDiory(dioryObj).then(createdDiory => {
      this.putInFocus(createdDiory.id)
      this.refreshDioryList()
    })
  }

  saveChangesToDiory() {
    let diory = this.state.inFocus
    delete diory.connections
    delete diory.connectedDiories
    DiographStore.updateDiory(diory.id, diory).then(updatedDiory => {
      this.putInFocus(updatedDiory.id)
      this.refreshDioryList()
    })
  }

  onConnectDioriesClick(toDioryId) {
    let fromDioryId = this.state.inFocus.id
    DiographStore.connectDiories(fromDioryId, toDioryId).then(connectionObject => {
      this.putInFocus(connectionObject.fromDiory.id)
    })
  }

  onDeleteDioryClick(dioryId) {
    DiographStore.deleteDiory(dioryId).then(() => {
      this.putInFocus(this.state.inFocus.id)
      this.refreshDioryList()
    })
  }

  onDeleteConnectionClick(fromDioryId, toDioryId) {
    DiographStore.deleteConnection(fromDioryId, toDioryId).then(() => {
      this.putInFocus(fromDioryId)
    })
  }

  refreshDioryList() {
    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
    })
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

