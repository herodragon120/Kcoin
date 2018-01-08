import React from 'react'
import {connect} from 'react-redux'
import {getInfoRequest} from '../../../actions/user_pages/user_info_page/user_info_page'
import {withRouter} from 'react-router'

class Info extends React.Component{

    componentDidMount(){
        this.props.getInfo()
    }
    render(){
        if(this.props.wallet==null)
            this.props.history.push('/')
        return(
            <div>
                <h4>Ví của bạn: {this.props.wallet}</h4>
                <hr/>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Số dư thực tế: {this.props.kcoin_tt} kcoin
                <span className="glyphicon glyphicon-check" aria-hidden="true" style={{marginLeft:"20px"}}></span>&nbsp; Số dư khả dụng: {this.props.kcoin_kd} kcoin
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {wallet:state.wallet,kcoin_tt:state.kcoin_tt,kcoin_kd:state.kcoin_kd}
}

function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(Info));