import React from 'react';
import { connect } from 'react-redux';
import HomeGrid from './HomeGrid';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className="Home">
      <h3>Welcome, {username}</h3>
      <HomeGrid />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
