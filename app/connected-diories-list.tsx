import * as React from 'react';
import { ConnectedDioriesListItem } from "./connected-diories-list-item"

export interface ConnectedDioriesListProps {
  connectedDiories: any,
  connections: any,
  onDeleteConnectionClick: any,
  onConnectedDioryClick: any
}

export class ConnectedDioriesList extends React.Component<ConnectedDioriesListProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    let connectedDiories = this.props.connectedDiories ? this.props.connectedDiories : []
    let connections = this.props.connections ? this.props.connections : []

    let connectedDioriesList = []
    connectedDiories.forEach((c, index) => {
      connectedDioriesList.push(
        <ConnectedDioriesListItem key={"connected-diories-list-item" + index}
          connectedDiory={connectedDiories[index]}
          connection={connections[index]}
          onConnectedDioryClick={this.props.onConnectedDioryClick}
          onDeleteConnectionClick={this.props.onDeleteConnectionClick}
        />
      )
    })

    return <div>
      <div className="connected-diories-count">Connected diories: {connectedDiories.length}</div><br/>
      {connectedDioriesList}
    </div>
  }

}
