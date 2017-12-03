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
       return <li key={ index }>
         <a onClick={() => { this.props.onFocusClick(diory.id)} } >{ diory.name }</a>
         <a onClick={() => { if(confirm('Connect to the diory in focus?')) { console.log("Diory (id: " + diory.id + ") connected to diory in focus") } }}> [ + ] </a>
         <a onClick={() => { if(confirm('Delete the item?')) { console.log("Diory deleted (id:" + diory.id + ")") } }}> [ X ] </a>
       </li>;
      })}
    </ul>
  }

}
