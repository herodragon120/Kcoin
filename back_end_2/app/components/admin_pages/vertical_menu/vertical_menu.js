import React from 'react'
import {Link, NavLink} from 'react-router-dom';

class VerticalMenu extends React.Component{
    render(){
        return(
            <ul className="nav nav-pills nav-stacked nav-pills-stacked-example">
                <li role="presentation" className="active">
                    <Link to="/">HOME</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/info">Thống kê hệ thống</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/sendmoney">Quản lý tài khoản</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/receivemoney">Quản lý giao dịch</Link>
                </li>
                <li role="presentation">
                    <Link to="/user/rechargemoney">Quản lý địa chỉ</Link>
                </li>
            </ul>
        )
    }
}

module.exports = VerticalMenu