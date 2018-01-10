import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
class VerticalMenu extends React.Component{
    render(){
        var xhtml = this.props.is_admin === 0?
            <ul className="nav nav-pills nav-stacked nav-pills-stacked-example">
                <li role="presentation" className="active">
                    <a>HOME</a>
                </li>
                <li role="presentation">
                    <Link to="/user/info">Giao dịch</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/receivemoney">Nhận tiền</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/rechargemoney">Rút tiền</Link>
                </li>
            </ul>
            :
            <ul className="nav nav-pills nav-stacked nav-pills-stacked-example">
                <li role="presentation" className="active">
                    <a>HOME</a>
                </li>
                <li role="presentation">
                    <Link to="/admin/info">Giao dịch</Link>
                </li>
                <li role="presentation">
                    <Link to="/admin/receivemoney">Nhận tiền</Link>
                </li>
                <li role="presentation">
                    <Link to="/admin/rechargemoney">Rút tiền</Link>
                </li>
                <li role="presentation">
                    <Link to="/admin/userlist">Danh sách người dùng</Link>
                </li>
                <li role="presentation">
                    <Link to="/admin/transactionlist">Danh sách giao dịch</Link>
                </li>
                <li role="presentation">
                    <Link to="/admin/addresslist">Danh sách địa chỉ</Link>
                </li>
            </ul>
        return(
            <div>{xhtml}</div>
        )
    }
}

function mapStateToProps (state) {
    return {is_signin:state.is_signin,is_admin:state.is_admin}
}

function mapDispatchToProps (dispatch) {
    return {
        logOut: () => dispatch(logoutRequest())
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(VerticalMenu));