import React from 'react'
import {Link} from 'react-router-dom';
import './index.css';
import {connect} from 'react-redux';
import {fetchExchangesOfUse} from './../../actions/index'
import Block from '../block/block'
import Footer from '../footer/footer'
import {getInfoRequest} from '../../actions/index'
class Home extends React.Component{
    componentDidMount(){
        this.props.getInfo();
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
                    {this.props.email}
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-12">
                    <Footer/>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {email:state.email}
}

function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(Home);
