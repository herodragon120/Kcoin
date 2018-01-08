import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getDetailBlockRequest,getBlockRequest} from '../../actions/user_pages/home_page/home_actions'
class Block extends React.Component{
    handleClick(i) {
        this.props.getDetailBlock(i)
            .then(()=>{
                this.props.history.push('/'+ i.toString())
            })
    }
    drawTable(){
        let rowListOfBoard=[];
        var {block}=this.props;
        for(let i =0; i < block.length; i++) {
            rowListOfBoard.push(
                <tr key={i}>
                    <th scope="row" >{block[i].index}</th>
                    <td><a href="#" onClick={() => this.handleClick(i)}>{block[i].hash}</a></td>
                    <td>{block[i].transactions}</td>
                    <td>{block[i].timestamp}</td>
                    <td>{block[i].difficulty}</td>
                    <td>{block[i].nonce}</td>
                    <td>{block[i].version}</td>
                </tr>
            );
        }
        return rowListOfBoard;
    }
    componentWillMount(){
        this.props.getBlock()
    }
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Block hash</th>
                        <th>Giao dịch</th>
                        <th>Thời gian</th>
                        <th>Độ khó</th>
                        <th>Nonce</th>
                        <th>Phiên bản</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.drawTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {block:state.block,detail_block:state.detail_block}
}
function mapDispatchToProps (dispatch) {
    return {
        getDetailBlock: (id) => dispatch(getDetailBlockRequest(id)),
        getBlock: () => dispatch(getBlockRequest())
    }
}
module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(Block));