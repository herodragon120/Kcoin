import React from 'react'
import {connect} from 'react-redux'
import VerticalMenu from '../vertical_menu/vertical_menu'
import Info from '../info/info'
import TransactionTable from './transtations_table'
class UserInfoPage extends React.Component{
    render(){
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
                            <TransactionTable/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

module.exports = connect()(UserInfoPage)