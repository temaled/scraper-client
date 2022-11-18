import React, { Component } from "react";

import CommonComponents from "../../common/common";

import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Twitter extends Component {
  state = {
    currentlyScraping: [],
    currentlyScrapingKeyword:[],
    availablePages: 'Loading . . .'
  };

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataAvailable();
  }


  onUsernameAddHandler =  (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/add', { 'username': e.target.username.value, 'type':'username' }, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.username.value = '';
        this.fetchAndRenderData();
      });
  }

  onUsernameDeleteHandler = (item, _type) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/delete', { 'username': item, 'type':'username'}, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderData();
      });
  }



  onKeywordAddHandler =  (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/add', { 'keyword': e.target.keyword.value, 'type':'keyword' }, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.keyword.value = '';
        this.fetchAndRenderData();
      });
  }

  onKeywordDeleteHandler = (item, _type) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/delete', { 'keyword': item, 'type':'keyword'}, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderData();
      });
  }


  onStartNowHandler = (item, _type) => {
    console.log(item);
    console.log('sending start now request.... ');
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/start-now', { 'keyword': item, 'type':'keyword'}, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderData();
      });
  }
 

  fetchAndRenderData() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/get?type=username', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'actions': <div><button className="btn btn-sm btn-danger" onClick={() => { this.onUsernameDeleteHandler(item, 'username') }}>Delete</button>&emsp;<a href={'https://www.twitter.com/@' + item} target="_blank" className="btn btn-sm btn-warning" >Open</a></div> };
      });

      this.setState({ currentlyScraping: list });
    });


    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/get?type=keyword', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'actions': <div><button className="btn btn-sm btn-danger" onClick={() => { this.onKeywordDeleteHandler(item, 'keyword') }}>Delete</button>&emsp;<a href='#?'  className="btn btn-sm btn-primary" >View Scraped</a>&emsp;<button onClick={() => { this.onStartNowHandler(item, 'keyword') }} className="btn btn-sm btn-success" >Start Now</button></div> };
      });

      this.setState({ currentlyScrapingKeyword: list });
    });
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TWITTER_API_ROOT + '/twitter/all-users', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {

      const list = jsonResponse.map((item) => React.createElement('div', { className: 'col-md-3', },
        React.createElement('h5', {}, item.Fullname + ' ON ' + item.Date_of_Scraping),
        React.createElement('p', {},
          React.createElement('b', {}, 'Username: '),
          React.createElement('a', { href: 'https://www.twitter.com/' + item.UserName, target: 'blank' }, item.UserName),
        ),
        React.createElement('p', {},
          React.createElement('b', {}, 'About: '),
          React.createElement('span', {}, item.Description),
        ),
        React.createElement('p', {},
          React.createElement('b', {}, 'Tweets: '),
          React.createElement('span', {}, item.Tweets),
        ),
        React.createElement('p', {},
          React.createElement('b', {}, 'Followers: '),
          React.createElement('span', {}, item['Number of Followers']),
        ),
        React.createElement('p', {},
          React.createElement('b', {}, 'Following: '),
          React.createElement('span', {}, item['Number of Followings']),
        ),
        React.createElement('p', {},
          React.createElement('b', {}, 'Joined Date: '),
          React.createElement('span', {}, item.Joined_Date.replace('Joined ', '')),
        ),
        React.createElement('a', { className: 'btn btn-sm btn-primary', href: '/twitter/page/' + item.UserName.substring(1) + '?doc-id=' + item._id }, 'Go To Tweets \u279c'
        ),
        React.createElement('div', { style: { marginTop: "15%" } })
      ));





      this.setState({ availablePages: list });

    });
  }

  render() {
    return (
      <div style={{ margin: "1% 4% 0 4%" }}>
        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />


        <div style={{ textAlign: "center", marginTop: "2%" }}> <h3><b>TWITTER</b></h3><a href={APIConstants.STATISTICS_API_ROOT + "/app/dashboards#/view/3ea81100-63f2-11ec-b6bf-37cf416580cd?_a=(viewMode:edit)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))"} target="_blank">GET STATISTICS</a></div>
        <CommonComponents.SearchBox action="/twitter/search" />
        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>AVAILABLE PAGES</b>
          </h2>
        </div>
        <div className='row' style={{ maxHeight: "100vh", overflowY: "scroll" }}> {this.state.availablePages}</div>
       

        <br/>
        <hr/>
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h3><b>SCRAPING REQUESTS</b></h3>
        </div>
        <br/>

      <div className="row">
        <div className="col-md-6">
          <div className="text-center"><h5><b>By Twitter Username</b></h5></div>
          <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScraping} />
          <div style={{ margin: "5%" }}></div>

          <div style={{ textAlign: 'center' }} id="add-requests-div">
            <h5 style={{ color: "#444444" }}><b>ADD NEW USERNAME REQUEST</b></h5>
            <br />

            <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onUsernameAddHandler} name='username' />

          </div>
        </div>
        </div>
        <div className="col-md-6">
          <div className="text-center"><h5><b>By Keyword</b></h5></div>
          <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScrapingKeyword} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div style={{ textAlign: 'center' }} id="add-requests-keyword-div">
          <h5 style={{ color: "#444444" }}><b>ADD NEW KEYWORD REQUEST</b></h5>
          <br />

          <CommonComponents.AddRequestField hint="Enter keyword here" on_submit={this.onKeywordAddHandler} name='keyword' />

        </div>

        </div>
      </div>
      
      <br/>
      <br/>
      <br/>
      </div>
    );
  }
}

export default Twitter;
