import * as React from 'react';
const style: React.CSSProperties = {
  color: 'red',
  fontWeight: 600
};

export class TitleLable extends React.Component<{ name: string; color?: string }, {}> {
  public render() {
    const oStyle = this.props.color ? { color: this.props.color } : {};
    return <label style={{ ...style, ...oStyle }}>{this.props.name}</label>;
  }
}
