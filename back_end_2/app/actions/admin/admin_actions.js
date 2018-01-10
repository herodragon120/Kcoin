import cst from '../../constants/constants'
import {signIn} from '../user_pages/signin_page/signin_actions'
import axios from 'axios'

function getUserListRequest(page) {
    return (dispatch)=>{
        return axios.get('/admin/listuser/' + page.toString())
            .then(res=>{
                dispatch(getUserList(res.data.user_list_info))
                dispatch(signIn(res.data.wallet,"DANG_NHAP_THANH_CONG",res.data.is_admin))

            })
            .catch(err=>{
                console.log(err)
            })
    }
}

function getUserList(user_list_info) {
    return {type:cst.GET_USER_LIST,user_list_info}
}

function getAddressListRequest(page) {
    return (dispatch)=>{
        return axios.get('/admin/listaddress/' + page.toString())
            .then(res=>{
                dispatch(getAddressList(res.data.address_list_info))
                dispatch(signIn(res.data.wallet,"DANG_NHAP_THANH_CONG",res.data.is_admin))

            })
            .catch(err=>{
                console.log(err)
            })
    }
}

function getAddressList(address_list_info) {
    return {type:cst.GET_ADDRESS_LIST,address_list_info}
}

module.exports = {getUserListRequest,getAddressListRequest}