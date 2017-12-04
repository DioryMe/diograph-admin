import * as React from 'react';

export interface DioryListProps {
  diories: any,
  onFocusClick: any,
  onConnectDioriesClick: any,
  onDeleteDioryClick: any
 }

export class DioryList extends React.Component<DioryListProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <ul>
      {this.props.diories.map((diory, index) => {
       return <li className="diory-list-item" key={ index }>
         <a className="diory-name" onClick={() => { this.props.onFocusClick(diory.id)} } >{ diory.name }</a>
         <a className="connect-diory" onClick={() => { if(confirm('Connect to the diory in focus?')) { this.props.onConnectDioriesClick(diory.id) } }}> [ + ] </a>
         <a className="delete-diory" onClick={() => { if(confirm('Delete the diory?')) { this.props.onDeleteDioryClick(diory.id) } }}> [ X ] </a>
       </li>;
      })}
    </ul>
  }

}
