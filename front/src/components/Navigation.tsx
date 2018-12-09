import * as React from 'react';
// import { TitleLable } from './TitleLabel';

export class Navigation extends React.Component {
  public render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="index.html">
            SB Admin v2.0
          </a>
          {/* <TitleLable name="This is lable" />
          <TitleLable name="This is lable2" color="#7f7f7f" /> */}
        </div>
        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
              <li>
                <a href="index.html">
                  <i className="fa fa-dashboard fa-fw" /> Recognition Image
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
