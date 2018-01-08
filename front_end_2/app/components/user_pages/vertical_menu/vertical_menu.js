import React from 'react'
import {Link, NavLink} from 'react-router-dom';

class VerticalMenu extends React.Component{
    render(){
        return(
            <ul className="nav nav-pills nav-stacked nav-pills-stacked-example">
                <li role="presentation" className="active">
                    <a>HOME</a>
                </li>
                <li role="presentation">
                    <Link to="/user/info">Giao dịch</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/sendmoney">Chuyển tiền</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/receivemoney">Nhận tiền</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/rechargemoney">Nạp tiền</Link>
                </li>
            </ul>
        )
    }
}

module.exports = VerticalMenu