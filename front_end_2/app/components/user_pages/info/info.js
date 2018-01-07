import React from 'react'
import {connect} from 'react-redux'
class Info extends React.Component{
    render(){
        return(
            <div>
                <h4>Ví của bạn: sjdfhskfpoirwipowero923843209480</h4>
                <hr/>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Số dư thực tế: 90 kcoin
                <span className="glyphicon glyphicon-check" aria-hidden="true" style={{marginLeft:"20px"}}></span>&nbsp; Số dư khả dụng: 10 kcoin
            </div>
        )
    }
}

module.exports = connect()(Info)