import React from 'react';
import {Link} from 'react-router-dom';
import BlockNew from './Block/BlockNew';

class HomePage extends React.Component{
  render(){
    return (
      <div className="block-chain">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <span>KHỐI MỚI NHẤT</span>
                <Link to="/" className="f-16">Xem thêm</Link>
              </div>
              <BlockNew/>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

module.exports = HomePage;
