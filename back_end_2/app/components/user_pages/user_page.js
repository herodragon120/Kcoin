import React from 'react'
import {connect} from 'react-redux'
import Nav from '../navbar/nav'
import Info from './info/info_user'
import TransactionTable from './user_info_page/transtations_table'
import ReceiceMoneyForm from './receive_money_page/receive_money_form'
import RechargeMoneyForm from './recharge_money_page/recharge_money_form'
import UserList from '../admin_pages/user_list/user_list'
import AddressList from '../admin_pages/address_list/address_list'
import TransactionList from '../admin_pages/transaction_list/transaction_list'

class UserInfoPage extends React.Component{
    render(){
        let xhtml = ""
        let local = this.props.location.pathname;
        if(local == "/user/transaction" || local == "/admin/transaction")
            xhtml = <TransactionTable/>
        if(local == "/user/rechargemoney" || local == "/admin/rechargemoney")
            xhtml = <RechargeMoneyForm/>
        if(local == "/user/receivemoney" || local == "/admin/receivemoney")
            xhtml = <ReceiceMoneyForm/>
        if(local == "/admin/userlist")
            xhtml = <UserList/>
        if(local == "/admin/addresslist")
            xhtml = <AddressList/>
        if(local == "/admin/transactionlist")
            xhtml = <TransactionList/>
        return(
            <div>
                <Nav/>
                <div className="top-content">
                    <div className="container">
                        <div className="row" style={{marginTop:"50px"}}>
                        </div>
                        <div className="row">
                            <div className="col-sm-12  form-box">
                                <div className="form-top">
                                    <div className="form-top-left">
                                        <Info/>
                                    </div>
                                </div>
                                <div className="form-bottom" style={{height:"460px"}}>
                                    {xhtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = connect()(UserInfoPage)