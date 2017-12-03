import * as React from 'react';

export interface ConnectedDioriesListProps {
  connectedDiories: any,
  connections: any,
  onDeleteConnectionClick: any
}

export class ConnectedDioriesList extends React.Component<ConnectedDioriesListProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    let connectedDiories = this.props.connectedDiories ? this.props.connectedDiories : []
    let connections = this.props.connections ? this.props.connections : []
    return <div>
      <div className="connected-diories-count">Connected diories: {connectedDiories.length}</div><br/>
      {connections.map((connection, index) => {
        return <div className="connection" key={index}>
          - ID: {connection.id}, fromDioryId: {connection.fromDioryId}, toDioryId: {connection.toDioryId}
          <a onClick={() => { if(confirm("Delete the connection (id: " + connection.id + ")?")) { this.props.onDeleteConnectionClick(connection.fromDioryId, connection.toDioryId) } }}> [ X ] </a>
        </div>;
      })}
    </div>
  }

}
