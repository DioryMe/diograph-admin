import * as React from 'react';

export interface DioryListProps { diories: any }

export class DioryList extends React.Component<DioryListProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <ul>
      {this.props.diories.map((diory, index) => {
       return <li onClick={() => { this.setState({inFocus: diory})} } key={ index }>{ diory.name }</li>;
      })}
    </ul>
  }

}
