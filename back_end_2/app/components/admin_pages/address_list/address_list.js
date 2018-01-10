import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getAddressListRequest} from '../../../actions/admin/admin_actions'


class AddressList extends React.Component{
    onPageChanged(i) {
        this.props.getAddressList(i)
    }
    drawPaging(){
        var li = [];
        var pageCount = 5;
        var {address_list_info} = this.props
        for(let i = 1; i <= address_list_info.totalPage; i++){
            li.push(<button type="button" className="btn" onClick={()=>this.onPageChanged(i)} key={i}>{i}</button>)
        }
        return (<div >{li}</div>);
    }
    drawTable(){
        let rowListOfBoard=[];
        var {address_list_info}=this.props;
        if (address_list_info.list !== undefined){
            for(let i = 0; i < address_list_info.list.length; i++) {
                rowListOfBoard.push(
                    <tr key={i}>
                        <th scope="row" ><a>{address_list_info.list[i].email}</a></th>
                        <td>{address_list_info.list[i].address}</td>
                        <td>{address_list_info.list[i].kcoin_tt}</td>
                        <td>{address_list_info.list[i].kcoin_kd}</td>
                    </tr>
                );
            }
        }
        return rowListOfBoard;

    }
    componentWillMount(){
        this.props.getAddressList(1).then(()=>{
            console.log(this.props.address_list_info)
        })
    }
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Người dùng</th>
                        <th>Địa chỉ</th>
                        <th>Số dư thực tế</th>
                        <th>Số dư khả dụng</th>
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
    return {address_list_info:state.address_list_info}
}
function mapDispatchToProps (dispatch) {
    return {
        getAddressList: (page) => dispatch(getAddressListRequest(page))
    }
}
module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(AddressList));