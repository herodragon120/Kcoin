import React from 'react'
import {Link} from 'react-router-dom';
import './index.css';
import {connect} from 'react-redux';
import Block from '../block/block'
import Footer from '../footer/footer'
import {getBlockRequest} from '../../actions/user_pages/home_page/home_actions'
class Home extends React.Component{
    componentDidMount(){
        this.props.getBlock()
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


function mapStateToProps (state) {
    return {block:state.block}
}

function mapDispatchToProps (dispatch) {
    return {
        getBlock: () => dispatch(getBlockRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(Home);
