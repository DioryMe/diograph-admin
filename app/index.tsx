import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"
import { DioryForm } from "./diory-form"

class App extends React.Component {
  state
  inFocus

  constructor(props) {
    super(props)
    DiographStore.setAuthToken(DiographAuthentication.token);
    this.state = {diories: [], inFocus: {name: "cool", geo: {}}}

    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
      this.setState({inFocus: this.state.diories[6]})
    })
  }

  render() {
    return (
      <div>
        <DioryForm diory={this.state.inFocus} />
        <ul>
         {this.state.diories.map((diory, index) => {
           return <li onClick={() => { this.setState({inFocus: diory})} } key={ index }>{ diory.name }</li>;
         })}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

