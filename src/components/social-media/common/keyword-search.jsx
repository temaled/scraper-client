import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

import CommonComponents from "../../common/common";
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIConstants from '../../../constants/constants'
import globalFunctions from "../../../common/GlobalsFunctions";
 
class KeywordSearch extends Component {
  
  state = {
    searchResults: '',
    fbPageIncluded:false,
    fbUserIncluded:false,
    twitterIncluded:true,
    tgChannelIncluded:true,
    tgGroupIncluded:true,
    liveSearchPlatform:"facebook",
    searchButton:<button className="btn btn-lg btn-success" type="submit">
                    Search
                  </button>,
    liveSearchResult:<div></div>
  };



  componentWillMount() {
    
  }
 
  handleIncludeFbPageChanged = (e) => {
    const value = e.target.checked;
    this.setState({ fbPageIncluded: value });
  }

  handleIncludeFbUserChanged = (e) => {
    const value = e.target.checked;
    this.setState({ fbUserIncluded: value });
  }
 
  handleIncludeTwitterChanged = (e) => {
    const value = e.target.checked;
    this.setState({ twitterIncluded: value });
  }

  handleIncludeTelegramChannelChanged = (e) => {
    const value = e.target.checked;
    this.setState({ tgChannelIncluded: value });
  }  
  
  handleIncludeTelegramGroupChanged = (e) => {
    const value = e.target.checked;
    this.setState({ tgGroupIncluded: value });
  }
  
  setLivesearchPlatform = (event) => {
    console.log(event.target.value);
    this.setState({liveSearchPlatform:event.target.value});
  }

  handleLiveSearchSubmit = (e) => {
    e.preventDefault();
    var targetKeyword = e.target.q.value;
    if (!targetKeyword){
      toast.warning('Enter Keyword!');
    }else{

      this.setState({ searchButton:<button disabled className="btn btn-outline-success">
      <span className="spinner-grow spinner-grow-sm"></span>
      &ensp;Crawling..
    </button> })

      if (this.state.liveSearchPlatform == 'facebook'){
        fetch(APIConstants.COMMON_API_ROOT+'/common/keyword/facebook', {
          method: 'POST',
          headers: new Headers({
            'x-access-token': globalFunctions.getAccessToken(),
            'Content-Type': 'application/json'
          }),
          body:  JSON.stringify({
            id: targetKeyword
          })
        }).then((response) => {
          return response.json();
        }).then((jsonResponse) => {
          jsonResponse = jsonResponse.body;
            const dataRep = [
              {
                label: "#",
                field: "number",
                sort: "asc",
                width: 20,
              },
              {
                label: "Post Content",
                field: "content",
                sort: "disabled",
                maxWidth: 100,
                width: 100,
              },
              {
                label: "Posted By",
                field: "by",
                sort: "asc",
                width: 50,
              },
              {
                label: "Likes",
                field: "likes",
                sort: "asc",
                width: 50,
              },
              {
                label: "Shares",
                field: "shares",
                sort: "asc",
                width: 50,
              },
              {
                label: 'DateTime',
                field: "datetime",
                sort: "asc",
                width: 100,
              }
            ];
            var rowsData = [];
            for (var i=0;i<jsonResponse.length;i++){
              rowsData.push({
                number:(i+1),
                content:jsonResponse[i].postContent,
                by:jsonResponse[i].poster,
                likes:jsonResponse[i].numberOfLikes,
                shares:jsonResponse[i].numberOfShares,
                datetime:jsonResponse[i].timeOfPost
              })
            }
            const tableData = {columns:dataRep, rows:rowsData}
            this.setState({ searchButton:<button className="btn btn-lg btn-success" type="submit"> Search </button>,
            
            liveSearchResult: <div className="container"><div className="text-center mt-5"><h5><b>Scraped {jsonResponse.length} Posts from Facebook</b></h5></div><MDBDataTable striped bordered hover data={tableData}/></div>
          
          });
        });

      }else if (this.state.liveSearchPlatform == 'twitter'){
        fetch(APIConstants.COMMON_API_ROOT+'/common/keyword/live-search/', {
          method: 'POST',
          headers: new Headers({
            'x-access-token': globalFunctions.getAccessToken(),
            'Content-Type': 'application/json'
          }),
          body:  JSON.stringify({
            keyword: targetKeyword,
            twitterEnabled: 'true'
          })
        }).then((response) => {
          return response.json();
        }).then((jsonResponse) => {
            console.log(jsonResponse);
        });
      }

          
    }
  }


  render() {
    return (
      <div style={{ margin: "1% 4% 0 4%" }}>
        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />

        <div className="row">
          <div className="col-md-3" style={{marginTop:"8%"}}>
            <label style={{fontSize:"larger", color:"grey"}}>
                <input
                  name="facebook-group"
                  type="checkbox"
                  disabled
                  checked={this.state.fbUserIncluded} 
                  onChange={this.handleIncludeFbUserChanged} />
                  &ensp;Include Facebook Users'
              </label><br/>
              <label style={{fontSize:"larger", color:"grey"}}>
                <input
                  name="facebook-user"
                  type="checkbox"
                  disabled
                  checked={this.state.fbPageIncluded} 
                  onChange={this.handleIncludeFbPageChanged} />
                  &ensp;Include Facebook Pages'
              </label><br/>
              <label style={{fontSize:"larger"}}>
                <input
                  name="twitter"
                  type="checkbox"
                  checked={this.state.twitterIncluded} 
                  onChange={this.handleIncludeTwitterChanged} />
                  &ensp;Include Twitter
              </label><br/>
           
              <label style={{fontSize:"larger"}}>
              <input
                name="telegram"
                type="checkbox"
                checked={this.state.tgChannelIncluded} 
                onChange={this.handleIncludeTelegramChannelChanged} />
                &ensp;Include Telegram Channels'
            </label><br/>
            <label style={{fontSize:"larger"}}>
              <input
                name="telegram"
                type="checkbox"
                checked={this.state.tgGroupIncluded} 
                onChange={this.handleIncludeTelegramGroupChanged} />
                &ensp;Include Telegram Groups'&ensp;&ensp;
            </label>
           
          </div>
          <div className="col-md-9">

          <div style={{ textAlign: "center", marginTop: "10%" }}> <h3 className="text-warning"><b>LOCAL SEARCH&ensp;<small style={{fontSize:"15px"}}></small></b></h3></div>
        <CommonComponents.SearchBox action='/common/keyword/search' 
                                    ifbu={this.state.fbUserIncluded}
                                    ifbp={this.state.fbPageIncluded}
                                    itw={this.state.twitterIncluded}
                                    itgc={this.state.tgChannelIncluded}
                                    itgg={this.state.tgGroupIncluded}
                                    />
       
  
          </div>
        </div>

        <div className="row" style={{marginTop:"10%"}}>
          <div className="col-md-3" style={{paddingTop:"5%"}}>
          <label style={{fontSize:"larger"}}>
                <input
                  name="live-search-platform"
                  type="radio"
                  value="facebook"
                  defaultChecked
                  onChange={this.setLivesearchPlatform} />
                  &ensp;Live Search from <b>Facebook</b>
              </label><br/>
              <label style={{fontSize:"larger"}}>
                <input
                  name="live-search-platform"
                  type="radio"
                  value="twitter"
                  onChange={this.setLivesearchPlatform} />
                  &ensp;Live Search from <b>Twitter</b>
              </label><br/>

          </div>
          <div className="col-md-9">
          <div style={{ textAlign: "center"}}> <h3 className="text-success"><b>LIVE SEARCH</b></h3></div>
       
 
       <div className="container">
       <br />
       <div className="row justify-content-center">
         <div className="col-12 col-md-10 col-lg-8">
           <form
             method="POST"
             className="card card-sm"
             onSubmit={this.handleLiveSearchSubmit}
           >
             <div className="card-body row no-gutters align-items-center">
               <div className="col">
                 <input
                   className="form-control form-control-lg borderless"
                   type="search"
                   name="q"
                   placeholder="&#xF002;&emsp; Enter Keyword  "
                   style={{ fontFamily: "Arial, FontAwesome" }}
                 /> 

                 <input type="hidden" name="ifbu" value={this.state.fbUserIncluded} />
                 <input type="hidden" name="ifbp" value={this.state.fbPageIncluded} />
                 <input type="hidden" name="itw" value={this.state.twitterIncluded} />
                 <input type="hidden" name="itgc" value={this.state.tgChannelIncluded} />
                 <input type="hidden" name="itgg" value={this.state.tgGroupIncluded} />
               </div>
               <div className="col-auto">
                {this.state.searchButton}
               </div>
             </div>
           </form>
         </div>
       </div>
     </div>
          </div>
        </div>

        {/* <MDBDataTable striped bordered hover data={this.state.tableData} /> */}
        {this.state.liveSearchResult}
      
      </div>
    );
  }
}

export default KeywordSearch;