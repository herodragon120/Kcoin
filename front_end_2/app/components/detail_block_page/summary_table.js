import React from 'react';
import {connect} from 'react-redux'
class SummaryTable extends React.Component{

    drawTable(){
        var {detail_block}=this.props;
        let  rowListOfBoard =
            <tbody>
                <tr key="1">
                    <th scope="row" >Stt</th>
                    <td>{detail_block.index}</td>
                </tr>
                <tr key="2">
                    <th scope="row" >Hash</th>
                    <td>{detail_block.hash}</td>
                </tr>
                <tr key="3">
                    <th scope="row" >Thời gian</th>
                    <td>{detail_block.timestamp}</td>
                </tr>
                <tr key="4">
                    <th scope="row" >Độ khó</th>
                    <td>{detail_block.difficulty}</td>
                </tr>
                <tr key="5">
                    <th scope="row" >Phiên bản</th>
                    <td>{detail_block.version}</td>
                </tr>
            </tbody>
        return rowListOfBoard;
    }
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Tên thuộc tính</th>
                        <th>Giá trị</th>
                    </tr>
                    </thead>
                    {this.drawTable()}
                </table>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {detail_block:state.detail_block}
}
// function mapDispatchToProps (dispatch) {
//     return {
//         getDetailBlock: (id) => dispatch(getDetailBlockRequest(id))
//     }
// }
module.exports= connect(mapStateToProps, null)(SummaryTable);