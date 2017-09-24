import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

class App extends React.Component {
  state

  constructor(props) {
    super(props)
    DiographStore.setAuthToken(DiographAuthentication.token);
  }

  render() {
    return (
      <div>Lorem ipsum</div>
    )
  }

}

DiographAuthentication.onLogin = () => {
  render()
}

DiographAuthentication.onLogout = () => {
  clear()
}

function clear() {
  ReactDOM.render(
    <div><p>Please authenticate.</p></div>,
    document.getElementById('app')
  );
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}

render()
