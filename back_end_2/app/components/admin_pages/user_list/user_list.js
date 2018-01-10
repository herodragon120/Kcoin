import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getUserListRequest} from '../../../actions/admin/admin_actions'


class UserList extends React.Component{
    onPageChanged(i) {
        this.props.getUserList(i)
    }
    drawPaging(){
        var li = [];
        var pageCount = 5;
        var {user_list_info} = this.props
        for(let i = 1; i <= user_list_info.totalPage; i++){
            li.push(<button type="button" className="btn" onClick={()=>this.onPageChanged(i)} key={i}>{i}</button>)
        }
        return (<div >{li}</div>);
    }
    drawTable(){
        let rowListOfBoard=[];
        var {user_list_info}=this.props;
        if (user_list_info.list !== undefined){
            for(let i = 0; i < user_list_info.list.length; i++) {
                rowListOfBoard.push(
                    <tr key={i}>
                        <th scope="row" ><a>{user_list_info.list[i].email}</a></th>
                        <td>{user_list_info.list[i].kcoin_tt}</td>
                        <td>{user_list_info.list[i].kcoin_kd}</td>
                    </tr>
                );
            }
        }
        return rowListOfBoard;
    }
    componentWillMount(){
        this.props.getUserList(1)
    }
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Người dùng</th>
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
    return {user_list_info:state.user_list_info}
}
function mapDispatchToProps (dispatch) {
    return {
        getUserList: (page) => dispatch(getUserListRequest(page))
    }
}
module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));