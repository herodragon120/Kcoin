import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getTransactionListRequest} from '../../../actions/admin/admin_actions'


class TransactionList extends React.Component{
    onPageChanged(i) {
        this.props.getTranList(i)
    }
    drawPaging(){
        var li = [];
        var pageCount = 5;
        var {transaction_list_info} = this.props
        for(let i = 1; i <= transaction_list_info.totalPage; i++){
            li.push(<button type="button" className="btn" onClick={()=>this.onPageChanged(i)} key={i}>{i}</button>)
        }
        return (<div >{li}</div>);
    }
    drawTable(){
        let rowListOfBoard=[];
        var {transaction_list_info}=this.props;
        if (transaction_list_info.list !== undefined){
            for(let i = 0; i < transaction_list_info.list.length; i++) {
                let hash = transaction_list_info.list[i].hash.substring(0,25)+ '....'
                let from = transaction_list_info.list[i].from.substring(0,25)+ '....'
                let to = transaction_list_info.list[i].to.substring(0,25)+ '....'
                rowListOfBoard.push(
                    <tr key={i}>
                        <th scope="row" ><a>{hash}</a></th>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>{transaction_list_info.list[i].value}</td>
                        <td>{transaction_list_info.list[i].time}</td>
                    </tr>
                );
            }
        }
        return rowListOfBoard;
    }
    componentWillMount(){
        this.props.getTranList(1)
    }
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Hash</th>
                        <th>Địa chỉ gửi</th>
                        <th>Địa chỉ nhận</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.drawTable()}
                    </tbody>
                </table>
                {this.drawPaging()}
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {transaction_list_info:state.transaction_list_info}
}
function mapDispatchToProps (dispatch) {
    return {
        getTranList: (page) => dispatch(getTransactionListRequest(page))
    }
}
module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(TransactionList));