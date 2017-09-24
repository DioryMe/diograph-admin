import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

class App extends React.Component {
  state

  constructor(props) {
    super(props)
    DiographStore.setAuthToken(DiographAuthentication.token);
    this.state = {diories: []}

    DiographStore.getAllDiories().then((result) => {
      this.setState({diories: result})
    })
  }

  render() {
    return (
      <ul>
       {this.state.diories.map((diory, index) => {
         return <li key={ index }>{ diory.name }</li>;
       })}
      </ul>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

