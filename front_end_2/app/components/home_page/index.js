import React from 'react'
import {Link} from 'react-router-dom';
import './index.css';
import {connect} from 'react-redux';
import Block from '../block/block'
import Footer from '../footer/footer'
class Home extends React.Component{
    componentDidMount(){
    }
    render(){
        return(
            <div className="home-page">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <h3 >KHỐI MỚI NHẤT</h3>
                    <hr/>
                    <Block/>
                    <h4  style={{float:"right"}}><Link to="/">Xem thêm</Link></h4>
                    <div style={{clear:"right"}}></div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-12">
                    <Footer/>
                </div>
            </div>
        );
    }
}


module.exports= connect()(Home);
