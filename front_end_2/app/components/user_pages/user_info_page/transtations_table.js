import React from 'react'
import './transtations_table.css'
class TransactionTable extends React.Component{
    render(){
        return(
                <div id="tran-panel">
                    <h2>Danh sách giao dịch</h2>
                    <table class="table table-hover">
                        <thead>
                        <tr> <th>#</th>
                            <th>Ví gửi</th>
                            <th>Ví nhận</th>
                            <th>Số tiền</th>
                            <th>Loại</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr> <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        )
    }
}

module.exports = TransactionTable