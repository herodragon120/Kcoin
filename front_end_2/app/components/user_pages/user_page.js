import React from 'react'
import {connect} from 'react-redux'
import VerticalMenu from './vertical_menu/vertical_menu'
import Info from './info/info'
import TransactionTable from './user_info_page/transtations_table'
import ReceiceMoneyForm from './receive_money_page/receive_money_form'
import RechargeMoneyForm from './recharge_money_page/recharge_money_form'
import SendMoneyForm from './send_money_page/send_money_form'

import {getInfoRequest} from '../../actions/user_pages/user_info_page/user_info_page'
class UserInfoPage extends React.Component{
    render(){
        let xhtml = ""
        let local = this.props.location.pathname;
        if(local=="/user/info")
            xhtml = <TransactionTable/>
        if(local=="/user/sendmoney")
            xhtml = <SendMoneyForm/>
        if(local=="/user/rechargemoney")
            xhtml = <RechargeMoneyForm/>
        if(local=="/user/receivemoney")
            xhtml = <ReceiceMoneyForm/>
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