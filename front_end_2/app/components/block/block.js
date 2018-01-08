import React from 'react';
import {connect} from 'react-redux'
class Block extends React.Component{
    drawTable(){
        let rowListOfBoard=[];
        var {block}=this.props;
        for(let i =0; i < block.length; i++) {

            rowListOfBoard.push(
                <tr key={i}>
                    <th scope="row" >{block[i].index}</th>
                    <td>{block[i].hash}</td>
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
    return {block:state.block}
}

module.exports= connect(mapStateToProps, null)(Block);