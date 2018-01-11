import React from 'react'
import {connect} from 'react-redux';
class SendMoneyForm extends React.Component{
    render(){
        return(
            <div>
                <br/><br/><br/>
                <h1 className="text-center page-title">Địa chỉ nhận tiền của bạn</h1>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-offset-2 col-sm-5">
                            <input type="text"  value={this.props.user_address} disabled style={{width:"550px",height:"40px"}}/>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {user_address:state.user_address}
}


module.exports= connect(mapStateToProps,null)(SendMoneyForm);