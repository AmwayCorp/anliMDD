import api from '../api';
import StorageService from './StorageService'

/**
 * Service to abstract api calls to one file - to be used in middleware
 */
class ApiSerice {


    constructor() {
    //    this.api_url = 'http://52.82.35.187:5000'; //'http://52.82.35.187:5000'
        this.api_url = 'http://localhost:80';
        // this.api_url = "http://52.82.15.213:5000";//新配置环境
        // this.api_url = 'http://52.83.75.191:5000';//老版本保存
    }

    /**
     * Service function to avoid repetition of fetch everywhere
     * @param {string} url - url to fetch
     * @param {string} method - method get or post
     * @param {string|boolean} token  - authentication token
     * @param {object|null} params - params payload
     */
    async apiCall(url, method = 'GET', token = false, params = null) {
        let payload = {
            method,
            mode: 'cors',
            headers: this.buildHeaders(token),
        }
        if (params) {
            payload.body = JSON.stringify(params);
        }
        const res = await fetch(`${this.api_url}${url}`, payload);
        const status = res.status;
        const body = await res.json();
        return { status, body };
    }

    /**
     * Build  http headers object
     * @param {string|boolean} token 
     */
    buildHeaders(token = false) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (token) {
            headers.append('Authorization', `Token ${token}`);
        }

        return headers;
    }

    /**
     * Throw common error on not successful status
     * @param {object} response 
     * @param {bool} auth - check for unauth error or not
     */
    handleCommonError(response, auth = false) {
        if(response.status === 401 && auth) {
            StorageService.removeToken()
            window.location(api.login)
        }
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(response.status)
        }
        return;
    }   

    async register(params) { //registration
        const reg = await this.apiCall(api.sign_up, 'POST', false, params);
        return reg;
    }

    async login(params) { //login
    // console.log('EXECUTE URL', api.login)
        const res = await this.apiCall(api.login, 'POST', false, params);
        this.handleCommonError(res);
        return res.body;
    }

    async logout(token) { //login
        const res = await this.apiCall(api.logout, 'POST', false, null, token);
        return res.status;
    }

    async verify_token(token = false) { //verify token on load
        const res = await this.apiCall(api.verify_token, 'POST', false, { token });
        this.handleCommonError(res);
        return res.status;
    }

    async current_user(token = false) { //load current user profile
        if (!token) {
            throw new Error('Error loading profile. Missing token!')
        }
        const res = await this.apiCall(api.current_user, 'GET', token);
        this.handleCommonError(res);
        return res.body;
    }

    async get_user(id = null) { //get user by id
        const res = await this.apiCall(`${api.user}/${id}`);
        this.handleCommonError(res);
        return res.body;
    }

    async edit_user(id = 0, token = false, params) { //edit user by id/params
        if (!token) {
            throw new Error('Error editing profile. Missing token!')
        }
        const res = await this.apiCall(
            `${api.user}/${id}/`,
            'PUT',
            token,
            params
        );
        return res;
    }

    async get_users(params, token) { //get users list
        const res = await this.apiCall(api.users, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async search_users(params, token) { //get users list
        const res = await this.apiCall(api.search, 'POST', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_performance_data1(params, token) {
        const res = await this.apiCall(api.performance_data1, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_performance_data2(params, token) {
        const res = await this.apiCall(api.performance_data2, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_performance_data2_tt(params, token) {
        const res = await this.apiCall(api.performance_data2_tt, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_performance_data3(params, token) {
        const res = await this.apiCall(api.performance_data3, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_performance_data2_com(params, token) {
        const res = await this.apiCall(api.performance_data2_com, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_renewal_data(params, token) {
        const res = await this.apiCall(api.abo_renewal_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_pin_data(params, token) {
        const res = await this.apiCall(api.abo_pin_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_non_pin_data(params, token) {
        const res = await this.apiCall(api.abo_non_pin_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_retention_data(params, token) {
        const res = await this.apiCall(api.abo_retention_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_qualification_data(params, token) {
        const res = await this.apiCall(api.abo_qualification_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_abo_newqual_data(params, token) {
        const res = await this.apiCall(api.abo_newqual_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_leader_data1(params, token) {
        const res = await this.apiCall(api.abo_leader_data1, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_growth_sust_data(params, token) {
        const res = await this.apiCall(api.growth_sust_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_growth_sales_seg_data(params, token) {
        const res = await this.apiCall(api.growth_sales_seg_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_growth_pop_seg_data(params, token) {
        const res = await this.apiCall(api.growth_pop_seg_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_growth_buyer_data(params, token) {
        const res = await this.apiCall(api.growth_buyer_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_growth_table_data(params, token) {
        const res = await this.apiCall(api.growth_table_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_abo_bonus_data(params, token) {
        const res = await this.apiCall(api.abo_bonus_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_qmonth_pv_data(params, token) {
        const res = await this.apiCall(api.abo_qmonth_pv_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_abo_gar1_data(params, token) {
        const res = await this.apiCall(api.abo_gar1_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_gar2_data(params, token) {
        const res = await this.apiCall(api.abo_gar2_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_migbot_data(params, token) {
        const res = await this.apiCall(api.abo_migbot_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_abo_migtop_data(params, token) {
        const res = await this.apiCall(api.abo_migtop_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_abo_pinpop_data(params, token) {
        const res = await this.apiCall(api.abo_pinpop_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_daily_sales_data(params, token) {
        const res = await this.apiCall(api.daily_sales_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_daily_rec_data(params, token) {
        const res = await this.apiCall(api.daily_rec_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_daily_tab_sal_data(params, token) {
        const res = await this.apiCall(api.daily_tab_sal_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_daily_tab_rec_data(params, token) {
        const res = await this.apiCall(api.daily_tab_rec_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_daily_com_data(params, token) {
        const res = await this.apiCall(api.daily_comments_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_daily_salevents_data(params, token) {
        const res = await this.apiCall(api.daily_sal_events_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_social_repbuy_data(params, token) {
        const res = await this.apiCall(api.social_rep_buy_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_foaprod_data(params, token) {
        const res = await this.apiCall(api.social_foa_prod_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_pop_data(params, token) {
        const res = await this.apiCall(api.social_pop_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_conv_data(params, token) {
        const res = await this.apiCall(api.social_conv_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_ref_data(params, token) {
        const res = await this.apiCall(api.social_ref_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_key_driver_data(params, token) {
        const res = await this.apiCall(api.key_driver_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_busimp_data(params, token) {
        const res = await this.apiCall(api.social_bus_imp_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_social_busimp35_data(params, token) {
        const res = await this.apiCall(api.social_bus_imp35_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_busimpmon_data(params, token) {
        const res = await this.apiCall(api.social_bus_impmon_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_earnseg_data(params, token) {
        const res = await this.apiCall(api.social_earn_seg_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_earndur_data(params, token) {
        const res = await this.apiCall(api.social_earn_dur_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_3esal_data(params, token) {
        const res = await this.apiCall(api.social_3e_sal_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_earnattr_data(params, token) {
        const res = await this.apiCall(api.social_earn_attr_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_buyloy_data(params, token) {
        const res = await this.apiCall(api.social_buy_loy_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_buypen_data(params, token) {
        const res = await this.apiCall(api.social_buy_pen_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_prodfirst_data(params, token) {
        const res = await this.apiCall(api.social_prod_first_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_attrrate_data(params, token) {
        const res = await this.apiCall(api.social_attr_rate_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_social_rndpart_data(params, token) {
        const res = await this.apiCall(api.social_rnd_part_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_social_partdist_data(params, token) {
        const res = await this.apiCall(api.social_part_dist_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_social_sopsal_data(params, token) {
        const res = await this.apiCall(api.social_sop_sal_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_manual_inputs(params, token) {
        const res = await this.apiCall(api.manual_inputs, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
    
    async get_manual_inputs(params, token) {
        const res = await this.apiCall(api.manual_inputs, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }
//二期开发内容
    async get_abo_cis_kpi_data(params, token) {
        const res = await this.apiCall(api.abo_cis_kpi_data, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_query_daily_sales_line_2(params, token) {
        const res = await this.apiCall(api.query_daily_sales_line_2, 'GET', token, params);
        this.handleCommonError(res);
        return res.body;
    }

}

export default new ApiSerice()
