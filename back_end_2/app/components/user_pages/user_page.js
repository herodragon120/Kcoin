import React from 'react'
import {connect} from 'react-redux'
import VerticalMenu from './vertical_menu/vertical_menu'
import Info from './info/info'
import TransactionTable from './user_info_page/transtations_table'
import ReceiceMoneyForm from './receive_money_page/receive_money_form'
import RechargeMoneyForm from './recharge_money_page/recharge_money_form'
import UserList from '../admin_pages/user_list/user_list'
import AddressList from '../admin_pages/address_list/address_list'

class UserInfoPage extends React.Component{
    render(){
        let xhtml = ""
        let local = this.props.location.pathname;
        if(local == "/user/info" || local == "/admin/info")
            xhtml = <TransactionTable/>
        if(local == "/user/rechargemoney" || local == "/admin/rechargemoney")
            xhtml = <RechargeMoneyForm/>
        if(local == "/user/receivemoney" || local == "/admin/receivemoney")
            xhtml = <ReceiceMoneyForm/>
        if(local == "/admin/userlist")
            xhtml = <UserList/>
        if(local == "/admin/addresslist")
            xhtml = <AddressList/>
        return(
            <div>
                <div className="col-md-3">
                    <div className="panel panel-primary">
                        <div className="panel-body">
                            <VerticalMenu/>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="panel panel-default" >
                        <div className="panel-heading">
                            <Info/>
                        </div>
                        <div className="panel-body" style={{height:"430px"}}>
                            {/*<TransactionTable/>*/}
                            {xhtml}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

module.exports = connect()(UserInfoPage)