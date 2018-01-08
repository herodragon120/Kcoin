import React from 'react'
import {connect} from 'react-redux';
//dien ham action
class RechargeMoneyForm extends React.Component{
    render(){
        return(
            <div>
                <h1 className="text-center page-title">Nạp Tiền</h1>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Đến</label>
                        <div className="col-sm-6">
                            <input ref="txt_wallet" type="text" className="form-control" id="inputEmail3" placeholder="Nhập ví nhận tiền"/>
                        </div>
                        <div className="col-sm-3"></div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Số tiền</label>
                        <div className="col-sm-6">
                            <input ref="txt_money" type="text" className="form-control" id="inputPassword3" placeholder="Nhập số tiền"/>
                        </div>
                        <div className="col-sm-3"></div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Mô tả</label>
                        <div className="col-sm-6">
                            <textarea ref="txt_des" className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
                        </div>
                        <div className="col-sm-3"></div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-offset-2 col-sm-5">
                            <button type="submit" className="btn btn-default">Chuyển Tiền</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}
module.exports = connect()(RechargeMoneyForm)