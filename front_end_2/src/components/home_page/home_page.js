import React from 'react';
import {Link} from 'react-router-dom';
import BlockNew from './BlockNew';
import Footer from '../footer/footer';

class HomePage extends React.Component{
    render(){
        return (
            <div>
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
                <Footer/>
            </div>

        )
    }
}

module.exports = HomePage;
