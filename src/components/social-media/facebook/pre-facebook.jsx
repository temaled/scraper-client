import React, { Component } from "react";

import CommonComponents from "../../common/common";

import imgFbPageGroup from "../../../assets/img/fb-groups-or-pages.jpg";
import imgFbUser from "../../../assets/img/fb-user.jpg";

import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import getAccessToken from "../../../common/GlobalsFunctions";

class PreFacebook extends Component {
  state = {
    usersDates: 'Loading . . .', groupsDates: 'Loading . . .', currentlyScraping:[], currentlyScrapingUser: [],
  };


  componentWillMount() {
    this.fetchAndRenderData();

    this.fetchAndRenderDataPages();
    this.fetchAndRenderDataUser();
  }



  onPageAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/add', { 'link': e.target.link.value }, {
      headers: { 'x-access-token': getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.link.value = '';
        this.fetchAndRenderDataPages();
      });
  }

  onPageDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/delete', { 'link':item}, {
      headers: { 'x-access-token': getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderDataPages();
      });
  }


  onUserAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/add', { 'link': e.target.link.value }, {
      headers: { 'x-access-token': getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.link.value = '';
        this.fetchAndRenderDataUser();
      });
  }

  onUserDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/delete', { 'link': item }, {
      headers: { 'x-access-token': getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderDataUser();
      });
  }




  fetchAndRenderDataPages() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        // const list =
        //   React.createElement('div', { textAlign: 'start' },
        //     React.createElement('ul', {},
        //       jsonResponse.map((item) => React.createElement('li', {},
        //         React.createElement('form', { method: 'POST', onSubmit: this.onPageDeleteHandler },
        //           React.createElement('a', { href: item, target: '_blank' }, item),
        //           React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
        //           React.createElement('div', {}),
        //           React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
        //         React.createElement('div', {})))
        //     )
        //   );


      const list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onPageDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });



        this.setState({ currentlyScraping: list });
      } else {
        // const list = React.createElement('div', {},
        //   React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        // )
        this.setState({ currentlyScraping: [] })
      }
    });
  }

  fetchAndRenderDataUser() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        // const list =
        //   React.createElement('div', { textAlign: 'left' },
        //     React.createElement('ul', {},
        //       jsonResponse.map((item) => React.createElement('li', {},
        //         React.createElement('form', { method: 'POST', onSubmit: this.onUserDeleteHandler },
        //           React.createElement('a', { href: item, target: '_blank' }, item),
        //           React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
        //           React.createElement('div', {}),
        //           React.createElement('button', { type: 'submit', className: 'btn btn-danger btn-sm' }, '\u2715 Delete')),
        //         React.createElement('div', {})))
        //     )
        //   );


      const list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onUserDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });



        this.setState({ currentlyScrapingUser: list });
      } else {
        // const list = React.createElement('div', {},
        //   React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        // )
        this.setState({ currentlyScrapingUser: [] })
      }
    });
  }


  fetchAndRenderData() {
    fetch(APIConstants.FB_USER_API_ROOT + '/api/users/dates').then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      const list = jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1).map((item) => React.createElement('div', {},
        React.createElement('a', { href: '/facebook?id=' + item['_id'] + '&type=user' }, item['date'])
      ));
      this.setState({ usersDates: list });

    });

    fetch(APIConstants.FB_GROUP_API_ROOT + '/api/pages/dates').then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      const list = jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1).map((item) => React.createElement('div', {},
        React.createElement('a', { href: '/facebook?id=' + item._id + '&type=page' }, item['date'])
      ));
      this.setState({ groupsDates: list });

    });
  }


  render() {
    return (
      <React.Fragment>
           <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
          />


        <div style={{ textAlign: "center", marginTop: "2%" }}><h3><b>USERS PROFILE</b></h3></div>
        <CommonComponents.SearchBox action="#" />   


        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h3><b>SCRAPING REQUESTS</b></h3>
        </div>


        <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScrapingUser} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div className="container" style={{ textAlign: 'center' }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h4>
          <br />

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onUserAddHandler} name='link' />

        </div>




        <div style={{ textAlign: "center", marginTop: "10%" }}><h3><b>GROUPS AND PAGES</b></h3></div>
        <CommonComponents.SearchBox action="#" />



        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h3><b>SCRAPING REQUESTS</b></h3>
        </div>


        <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScraping} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div className="container" style={{ textAlign: 'center' }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h4>
          <br />

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onPageAddHandler} name='link' />

        </div>




        <div className="row">
          <div className="col-md-6" style={{ padding: '5%', textAlign: 'center' }}>
            <img src={imgFbUser} alt="card" height="300" />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center", marginBottom: '10%' }}>
              <h3><b>USERS</b></h3>
              {/* <p>Content for the requested users were scrapped in the following dates!</p> */}
              <p>Click on a scraping date to continue!</p>
              <br />
              <span>{this.state.usersDates}</span>
            </div>

 


          </div>
          <div className="col-md-6" style={{ padding: '5%', textAlign: 'center' }}>
            <img src={imgFbPageGroup} alt="card" height="300" />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center", marginBottom: '10%' }}>

              <h3><b>GROUPS AND PAGES</b></h3>
              {/* <p>Content for the requested pages or groups were scrapped in the following dates!</p> */}
              <p>Click on a scraping date to continue!</p>
              <br />
              <span>{this.state.groupsDates}</span>
            </div>

         
          </div>


        </div>
      </React.Fragment>
    );
  }
}

export default PreFacebook;
