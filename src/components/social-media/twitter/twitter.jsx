import React, { Component } from "react";

import CommonComponents from "../../common/common";

import realdonaldtrump from "../../../assets/img/scraped/realdonaldtrump.jpg";
import tigraywillwin from "../../../assets/img/scraped/tigraywillwin.jpg";
import h8oicpmj5cu21ws from "../../../assets/img/scraped/h8oicpmj5cu21ws.jpg";
import eoap5q8gql11egl from "../../../assets/img/scraped/eoap5q8gql11egl.jpg";
import tigraiadey from "../../../assets/img/scraped/tigraiadey.jpg";
import shegerfm from "../../../assets/img/scraped/shegerfm.jpg";

import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Twitter extends Component {
  state = {
    currentlyScraping: 'Loading . . .',
    availablePages: 'Loading . . .'
  };

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataAvailable();
  }


  onUsernameAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/add', { 'username': e.target.username.value }, {
      headers:{'x-access-token':getAccessToken()}
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

  onUsernameDeleteHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/delete', { 'username': e.target.username.value }, {
      headers:{'x-access-token':getAccessToken()}
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
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list =
        React.createElement('div', {},
          React.createElement('ul', {},
            jsonResponse.map((item) => React.createElement('li', {},
              React.createElement('form', { method: 'POST', onSubmit: this.onUsernameDeleteHandler },
                React.createElement('a', { href: 'https://www.twitter.com/' + item, target: '_blank' }, item),
                React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
                React.createElement('div', {}),
                React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, 'Delete')),
              React.createElement('div', {})))
          )
        );


      this.setState({ currentlyScraping: list });
    });
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TWITTER_API_ROOT + '/twitter/all-users', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      console.log(response);
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
          React.createElement('span', {}, item.Joined_date.replace('Joined ', '')),
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

        <ToastContainer />
        <CommonComponents.SearchBox action="/twitter/search" />
        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>AVAILABLE PAGES</b>
          </h2>
        </div>
        <div className='row' style={{ maxHeight: "100vh", overflowY: "scroll" }}> {this.state.availablePages}</div>

        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>MOST POPULAR</b>
          </h2>
        </div>
        <div className="row">
          <CommonComponents.FreqCard
            link="/twitter/page/realdonaldtrump"
            btn_text="Go To Tweets"
            title="Donald J. Trump"
            image={realdonaldtrump}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/tigraywillwin"
            btn_text="Go To Tweets"
            title="ስሑል ኣብርሃ"
            image={tigraywillwin}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/h8oicpmj5cu21ws"
            btn_text="Go To Tweets"
            title="ሪም ትግራይ"
            image={h8oicpmj5cu21ws}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/eoap5q8gql11egl"
            btn_text="Go To Tweets"
            title="ምፅላል ተፈሪ"
            image={eoap5q8gql11egl}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/tigraiadey"
            btn_text="Go To Tweets"
            title="ትግራይ ዓደይ"
            image={tigraiadey}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/shegerfm"
            btn_text="Go To Tweets"
            title="ሸገር 102.1"
            image={shegerfm}
            sm="twitter"
            type='nodata'
          />
        </div>
        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }} id="scraping-requests-div">
          <h2 style={{ color: "#555555" }}>
            <b>SCRAPING REQUESTS</b>
          </h2>
        </div>

        <div>
          <h4 style={{ color: "#444444" }}>CURRENTLY SCRAPING</h4>
          <p>The twitter scraper is currently working on the following usernames</p>
          {this.state.currentlyScraping}
        </div>
        <div style={{ margin: "5%" }}></div>

        <div style={{ textAlign: 'start' }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}>ADD NEW REQUEST</h4>
          <p>Enter username to start scraping</p>
          {/* <CommonComponents.AddRequestField hint="Enter username here" action={APIConstants.REQUESTS_API_ROOT + "/scraping/twitter/add"} name='username' /> */}
          <CommonComponents.AddRequestField hint="Enter username here" on_submit={this.onUsernameAddHandler} name='username' />

        </div>

        <div style={{ margin: "5%" }}></div>

      </div>
    );
  }
}

export default Twitter;
