import React from 'react'
import {connect} from 'react-redux'
import {getInfoRequest} from '../../../actions/user_pages/user_info_page/user_info_page'
import {withRouter} from 'react-router'

class Info extends React.Component{

    componentWillMount(){
        this.props.getInfo().then(()=>{
        })
    }
    render(){
        let xhtml = this.props.is_admin === 0 ? null
            :<div><span className="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Số lượng user: {this.props.num_user}</div>
        return(
            <div>
                <h4>Ví của bạn: {this.props.wallet}</h4>
                <hr/>
                {xhtml}
                <div>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Số dư thực tế: {this.props.kcoin_tt} kcoin
                </div>
                <div>
                    <span className="glyphicon glyphicon-check" aria-hidden="true"></span>&nbsp; Số dư khả dụng: {this.props.kcoin_kd} kcoin
                </div>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {wallet:state.wallet,
        kcoin_tt:state.kcoin_tt,
        kcoin_kd:state.kcoin_kd,
        num_user:state.num_user,
        is_admin:state.is_admin
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(Info));