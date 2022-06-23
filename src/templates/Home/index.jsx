import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { loadPosts } from '../../utils/load-posts'

export class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  };

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
  
    posts.push(...nextPosts)

    this.setState({
      posts: posts,
      page: nextPage
    })
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : 
    posts;

    return (
      <section className="container">
        <div className="search-container">

          {!!searchValue && (
            <h1>Search: {searchValue}</h1>
          )}
          <SearchInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>
        
        <br /><br /><br />
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>There are no posts</p> 
        )}

        <div className="button-container">
          {!searchValue && (
            <Button noMorePosts={noMorePosts} onClick={this.loadMorePosts} />
          )}
        </div>
      </section>
    );
  }
}
