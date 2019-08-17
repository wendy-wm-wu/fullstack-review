import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  //AJAX POST request based on user's search term
  //data type is an object with term with user as key and term as value because we expect the server to reach out to the API and retrieve an object that represents the user's repos


  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: {user: term},
      success: (data) => {
        console.log('success searching repos');
        this.fetchRepos();
      },
      error: (data) => console.log('error searching repos')
    });
  }

  //when repos are fetched, you are changing the state of the repos to reflect the new fetched repos from the server

  fetchRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({
          repos: data,
        })
      },
      error: (data) => console.log('error fetching repos')
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <table>
      <RepoList repos={this.state.repos}/>
      </table>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));