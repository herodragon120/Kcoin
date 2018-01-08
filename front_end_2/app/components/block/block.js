import React from 'react';
import Tbody from './tbody'


class Block extends React.Component{
    render(){
        return (
            <div>
                <table className="table table-striped block-table">
                    <thead>
                    <tr>
                        <th>Chiều cao</th>
                        <th>Tuổi tác</th>
                        <th>Giao dịch</th>
                        <th>Tổng số đã gửi</th>
                        <th>Chuyển tiếp theo</th>
                        <th>Kích thước</th>
                        <th>Cân nặng</th>
                    </tr>
                    </thead>
                    <Tbody/>
                </table>
            </div>
        )
    }
}

module.exports = Block;