<template>
    <div>
        <div class="form-row text-center">
            <div class="col-12 col-sm">
                <div class="alert alert-secondary alert-rounded" role="alert">
                    1. 輸入訂單資料
                </div>
            </div>
            <div class="col-12 col-sm">
                <div class="alert alert-success alert-rounded" role="alert">
                    2. 金流付款
                </div>
            </div>
            <div class="col-12 col-sm">
                <div class="alert alert-secondary alert-rounded" role="alert" >
                    3. 完成！
                </div>
            </div>
        </div>

        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="payOrder">
                <p class="h5 text-center">訂單明細</p>
                <table class="table">
                    <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                            <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total | currency }}</td>
                        </tr>
                    </tfoot>
                </table>

                <p class="h5 text-center">訂購人資料</p>
                <table class="table">
                    <tbody>
                        <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                            <th>付款狀態</th>
                            <td>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success">付款完成</span>
                            </td>
                        </tr>
                    </tbody>
                </table>                    
                <div class="text-right" v-if="order.is_paid === false">
                    <button class="btn btn-danger">確認付款去</button>
                </div>
            </form>
        </div>
        <h5 class="h5 text-center mt-5 mb-5" v-if="order.is_paid === true">感謝您的預訂，祝您旅途愉快！</h5>
        <div style="text-align: right" v-if="order.is_paid === true">
            <router-link to="/" class="btn btn-outline-primary">返回首頁</router-link>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default{
    data(){
            return{
                order: {
                    user: {},
                },
                orderId: '',
                isLoading: false,
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    },
                    message: '',
                }
            }
        },
    methods:{
        getOrder(){
                    const vm = this;
                    const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;                    
                    vm.isLoading=true;
                    this.$http.get(api).then((response) => {
                    vm.order = response.data.order;
                    console.log(response);
                    vm.isLoading=false;
                    });
        },

        payOrder(){
                    const vm = this;
                    const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;                    
                    vm.isLoading=true;
                    this.$http.post(api).then((response) => {
                    console.log(response);
                    if(response.data.success){
                        vm.getOrder()
                    }
                    vm.isLoading=false;
                    });
        },
    },
    created(){
        this.orderId=this.$route.params.orderId;
        this.getOrder()
        // console.log(this.orderId)
    }
}
</script>