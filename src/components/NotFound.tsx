import { Component } from 'react';
import notFound from '../assets/not-found.png';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h2>Nothing found... Try it once more!</h2>
        <img className="image" src={notFound} alt="not-found" />
      </div>
    );
  }
}

export default NotFound;
