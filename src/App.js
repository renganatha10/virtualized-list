import React, { Component } from 'react';
import './App.css';
import appData from './jsonData.json';

const rowHeight = 50;
const totalNumberOfRows = 50;
const rowCount = 20;

const Row = ({ index, appData }) => {
  if (!appData[index]) {
    return <div />;
  }
  const { agency_name, email, firstname, lastname } = appData[index];

  return (
    <div
      className="row"
      style={{
        width: '100%',
        position: 'absolute',
        left: 0,
        top: index * rowHeight,
      }}
    >
      <div> {firstname} </div>
      <div> {lastname} </div>
      <div> {email} </div>
      <div> {agency_name} </div>
    </div>
  );
};

class App extends Component {
  state = {
    appData,
    totalNumberOfRows,
    rowCount,
    index: 0,
  };

  filter = filtername => {
    this.setState({
      appData: filtername,
      index: 0,
      rowCount: filtername.length > rowCount ? rowCount : filtername.length,
      totalNumberOfRows: filtername.length,
    });
  };

  reset = () => {
    this.setState({
      appData,
      totalNumberOfRows,
      rowCount: 20,
      index: 0,
    });
  };

  filterByName = eve => {
    const value = eve.target.value;
    if (value === '') {
      this.reset();
    }
    const filtername = appData.filter(item =>
      item.firstname.toLowerCase().includes(value)
    );

    this.filter(filtername);
  };

  filterByEmail = eve => {
    const value = eve.target.value;

    if (value === '') {
      this.reset();
    }

    const filtername = appData.filter(item =>
      item.email.toLowerCase().includes(value)
    );

    this.filter(filtername);
  };

  filterByAgency = eve => {
    const value = eve.target.value;
    if (value === '') {
      this.reset();
    }
    const filtername = appData.filter(item =>
      item['agency_name']
        .toString()
        .toLowerCase()
        .includes(value)
    );

    this.filter(filtername);
  };

  onScroll = eve => {
    eve.stopPropagation();

    const scroller = document.getElementById('scroller');
    const { scrollTop, scrollHeight } = scroller;

    if (scrollTop === 0) {
      this.setState({
        index: 0,
      });
      return;
    }

    const index = Math.floor(scrollTop / rowHeight);

    const totolScrollableHeight = this.state.appData.length * 50;

    const isEndReached = scrollTop > totolScrollableHeight - 1010;

    if (
      this.state.totalNumberOfRows < 50 ||
      isEndReached ||
      (index === 0 && this.state.index === index)
    ) {
      return;
    }

    this.setState({
      index,
    });

    if (scrollHeight - scrollTop < 1000) {
      this.setState({
        totalNumberOfRows: this.state.totalNumberOfRows + 50,
      });
    }
  };

  render() {
    const noOfRows = [];
    const { index, rowCount, appData, totalNumberOfRows } = this.state;
    for (let i = index; i < index + rowCount; i++) {
      noOfRows.push(i);
    }

    return (
      <div className="App">
        <div className="header">
          <p className="header-text">Virtualized List</p>
        </div>
        <div className="input-text-container">
          <input
            onChange={this.filterByName}
            placeholder="Search By First Name..."
            className="search_name"
          />
          <input
            onChange={this.filterByEmail}
            placeholder="Search By Email "
            className="search_name"
          />
          <input
            onChange={this.filterByAgency}
            placeholder="Search By Agency Name"
            className="search_name"
          />
        </div>
        <div className="row table-header">
          <div>
            <span>First Name</span>
          </div>
          <div>
            <span>Last Name </span>
          </div>
          <div>
            <span> Email</span>
          </div>
          <div>
            <span>Agency Name</span>
          </div>
        </div>
        <div onScroll={this.onScroll} id="scroller" className="scroller">
          <div
            style={{
              height: totalNumberOfRows * rowHeight,
              width: 'auto',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {noOfRows.map((item, index) => (
              <Row appData={appData} key={'i-' + item} index={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
