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
    this.state = {diories: [], inFocus: {geo: {}}}

    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
      this.setState({inFocus: this.state.diories[4]})
    })
  }

  render() {
    return (
      <div>
        <DiographSearchCreate onFocusClick={(dioryId) => { this.putInFocus(dioryId)}} />
        <DioryForm
          diory={this.state.inFocus}
          onDioryChange={(diory) => { this.onDioryChange(diory) }}
          onSaveClick={() => console.log(this.state.inFocus) }/>
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
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

