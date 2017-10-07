import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

import { DiographSearchCreate } from "diograph-search-create"
import { DioryForm } from "./diory-form"
import { DioryList } from "./diory-list"

class App extends React.Component {
  state
  inFocus

  constructor(props) {
    super(props)
    DiographStore.setAuthToken(DiographAuthentication.token);
    this.state = {diories: [], inFocus: {name: "cool", geo: {}}}

    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
      this.setState({inFocus: this.state.diories[4]})
    })
  }

  render() {
    return (
      <div>
        <DiographSearchCreate onFocusClick={(dioryId) => { this.putInFocus(dioryId)}} />
        <DioryForm diory={this.state.inFocus} onDioryChange={(diory) => { this.onDioryChange(diory) }} />
        <DioryList diories={this.state.diories} onFocusClick={(dioryId) => { this.putInFocus(dioryId)}} />
      </div>
    )
  }

  putInFocus(dioryId) {
    let diory = DiographStore.getDiory(dioryId).then((diory) => {
      this.setState({inFocus: diory})
    })
  }

  onDioryChange(d) {
    let latitude, longitude, dioryCopy, dCopy
    let diory = this.state.inFocus
    if (d["geo"]) {
      dCopy = JSON.parse(JSON.stringify(d))
      dioryCopy = JSON.parse(JSON.stringify(diory))
      latitude = dioryCopy["geo"]["latitude"]
      longitude = dioryCopy["geo"]["longitude"]
    }
    // Merge object d with diory
    for (var attrname in d) { diory[attrname] = d[attrname]; }
    // Exception case: geo
    if (d["geo"]) {
      if (dCopy["geo"]["latitude"]) { diory["geo"]["longitude"] = longitude }
      if (dCopy["geo"]["longitude"]) { diory["geo"]["latitude"] = latitude }
    }
    this.setState({inFocus: diory})
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

