import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {guiTienRequest} from '../../../actions/user_pages/signin_page/signin_actions'
//dien ham action
class RechargeMoneyForm extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var {txt_address,txt_money} = this.refs;
        this.props.guiTien(txt_address,txt_money)
            .then(()=>{
            console.log("xu ly xong")
            })
    }
    render(){
        return(
            <div>
                <h1 className="text-center page-title">Rút Tiền</h1>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Đến</label>
                        <div className="col-sm-6">
                            <input ref="txt_address" type="text" className="form-control" id="inputEmail3" placeholder="Nhập ví nhận tiền"/>
                        </div>
                        <div className="col-sm-3"></div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Số tiền</label>
                        <div className="col-sm-6">
                            <input ref="txt_money" type="text" className="form-control"  placeholder="Nhập số tiền"/>
                        </div>
                        <div className="col-sm-3"></div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-offset-2 col-sm-6">
                            <button type="submit" className="btn btn-default">Chuyển Tiền</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {err_mess:state.err_mess}
}

function mapDispatchToProps (dispatch) {
    return {
        guiTien: (address,pass) => dispatch(guiTienRequest(address,pass))
    }
}

module.exports= connect(mapStateToProps, mapDispatchToProps)(withRouter(RechargeMoneyForm));