import React from 'react'
import {connect} from 'react-redux'
import SummaryTable from './summary_table'

class DetailBlockPage extends React.Component{
    render(){
        return(
            <div className="container">
                <div>
                    <h3>Block</h3>
                    <h4>{this.props.detail_block.hash}</h4>
                    <hr/>
                    <h4>Summary</h4>
                    <SummaryTable/>
                </div>
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
module.exports= connect(mapStateToProps, null)(DetailBlockPage);