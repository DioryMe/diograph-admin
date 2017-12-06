import * as React from 'react';

export interface ConnectedDioriesListItemProps {
  connectedDiory: any,
  connection: any,
  onDeleteConnectionClick: any,
  onConnectedDioryClick: any
}

export class ConnectedDioriesListItem extends React.Component<ConnectedDioriesListItemProps, undefined> {

  render() {
    let connectedDiory = this.props.connectedDiory
    let connection = this.props.connection
    return <div>

      <div className="connected-diory" key={"diory" + connectedDiory.id}
        onClick={() => { this.props.onConnectedDioryClick(connectedDiory.id)} }>
        {connectedDiory.name}
      </div>

      <div className="connection" key={"connection" + connection.id}>
        - ID: {connection.id}, fromDioryId: {connection.fromDioryId}, toDioryId: {connection.toDioryId}
        <a onClick={() => { if(confirm("Delete the connection (id: " + connection.id + ")?")) { this.props.onDeleteConnectionClick(connection.fromDioryId, connection.toDioryId) } }}> [ X ] </a>
      </div>

    </div>
  }

}
