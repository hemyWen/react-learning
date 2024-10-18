import React from "react";

export default class Child2 extends React.Component {
  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    return this.props.count !== nextProps.count;
  }
  render() {
    console.log(this.props.count);
    return <div>{this.props.count}</div>;
  }
}
