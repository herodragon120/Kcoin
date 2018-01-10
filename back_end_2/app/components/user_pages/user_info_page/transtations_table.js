import React from 'react'
import {connect} from 'react-redux'
import './transtations_table.css'
import {getInfoRequest} from '../../../actions/user_pages/user_info_page/user_info_page'
class TransactionTable extends React.Component{


    drawTable(){
        let rowListOfBoard=[];
        let {receive_transactions}=this.props;
        if(receive_transactions != null){
            for(let j = 0; j < receive_transactions.length; j++) {
                let i =  receive_transactions.length - j -1
                rowListOfBoard.push(
                    <tr key={i}>
                        <th scope="row" >{receive_transactions[i].hash}</th>
                        <td>{receive_transactions[i].from}</td>
                        <td>{receive_transactions[i].value}</td>
                        <td>{receive_transactions[i].index}</td>
                    </tr>
                );
            }
        }
        return rowListOfBoard;
    }
    componentWillMount(){
        this.props.getInfo().then(()=>{
            if(this.props.is_login===false)
                this.props.history.push('/signin')
        })
    }
    render(){
        return(
                <div id="tran-panel">
                    <div>
                        <h2>Lịch sử giao dịch</h2>
                        <ul className="nav nav-tabs">
                            <li className="active"><a data-toggle="tab" href="#home">Rút tiền</a></li>
                            <li><a data-toggle="tab" href="#menu1">Nạp tiền</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="home" className="tab-pane fade in active">
                                <div id="scoll-img">
                                    <div className="scrollbar" id="style-14">
                                        <div className="force-overflow">
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Hash</th>
                                                    <th>Địa chỉ gửi</th>
                                                    <th>Số tiền</th>
                                                    <th>Output index</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu1" className="tab-pane fade">
                                <div id="scoll-img">
                                    <div className="scrollbar" id="style-14">
                                        <div className="force-overflow">
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Hash</th>
                                                    <th>Địa chỉ gửi</th>
                                                    <th>Số tiền</th>
                                                    <th>Output index</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.drawTable()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps (state) {
    return {receive_transactions:state.receive_transactions,is_login:state.is_login}
}
function mapDispatchToProps (dispatch) {
    return {
        getInfo: () => dispatch(getInfoRequest())
    }
}
module.exports= connect(mapStateToProps, mapDispatchToProps)(TransactionTable)