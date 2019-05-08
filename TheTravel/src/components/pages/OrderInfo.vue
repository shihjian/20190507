<template>
    <div>
        <div class="form-row text-center">
            <div class="col-12 col-sm">
                <div class="alert alert-success alert-rounded" role="alert">
                    1. 輸入訂單資料
                </div>
            </div>
            <div class="col-12 col-sm">
                <div class="alert alert-light alert-rounded" role="alert">
                    2. 金流付款
                </div>
            </div>
            <div class="col-12 col-sm">
                <div class="alert alert-light alert-rounded" role="alert">
                    3. 完成！
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card mt-5 mb-4 border-0">
                    <div class="card-header">
                        <h4 class="h4 mb-0 text-center">訂單資訊</h4>
                    </div>
                </div>
                    <table  class="table mt-5 ml-auto mr-auto">
                                <thead>
                                    <tr>
                                    <th scope="col" width="80" class="text-center"></th>
                                    <th scope="col">品名</th>
                                    <th scope="col" width="100" class="text-center">數量</th>
                                    <th scope="col" width="100" class="text-center">單價</th>
                                    <th scope="col" width="100" class="text-center">小計</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="cartItem in cartProducts" :key="cartItem.id">
                                        <td class="text-center"><button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(cartItem.id)"><i class="far fa-trash-alt"></i></button></td>
                                        <td>
                                            {{ cartItem.product.title }}

                                        </td>
                                        <td class="text-center">{{ cartItem.qty }}</td>
                                        <td class="text-right">{{ cartItem.product.price | currency }}</td>
                                        <td class="text-right">{{ cartItem.total | currency }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" class="text-right">總計</td>
                                        <td class="text-right">{{ finalTotal.final_total | currency }}</td>
                                    </tr>
                                </tfoot>
                    </table>

                <div class="card mt-5 mb-4 border-0">
                    <div class="card-header">
                        <h4 class="h4 mb-0 text-center">訂購人資訊</h4>
                    </div>
                </div>
                <div class="my-5 justify-content-center">
                    <form >
                        <div class="form-group">
                            <label for="useremail">Email</label>
                            <input type="email" class="form-control" name="email" id="useremail"
                                
                                v-model="form.user.email" v-validate="'required'" placeholder="請輸入 Email">
                            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                        </div>
                    
                        <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input type="text" class="form-control" name="name" id="username"
                                :class="{'is-invalid':errors.has('name')}"
                                v-model="form.user.name" v-validate="'required'" placeholder="請輸入姓名">
                            <span class="text-danger" v-if="errors.has('name')">請輸入正確姓名</span>
                        </div>

                        <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input type="tel" class="form-control" name="tel" id="usertel"
                                :class="{'is-invalid':errors.has('tel')}"
                                v-model="form.user.tel" v-validate="'required'" placeholder="請輸入電話">
                            <span class="text-danger" v-if="errors.has('tel')" >電話不能留空。</span>
                        </div>
                    
                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input type="address" class="form-control" name="address" id="useraddress"
                                :class="{'is-invalid':errors.has('address')}"
                                v-model="form.user.address" v-validate="'required'" placeholder="請輸入地址">
                            <span class="text-danger" v-if="errors.has('tel')">地址不能留空。</span>
                        </div>
                    
                        <div class="form-group">
                        <label for="usercontent">留言</label>
                        <textarea name="" id="usercontent" class="form-control" cols="30" rows="10" v-model="form.user.message"></textarea>
                        </div>
                        <div class="text-right">
                        <button class="btn btn-secondary" @click.prevent="CreateOrder">送出訂單</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
    export default{
        data(){
            return{
                cartProducts: [],
                cartTotalPrice: 0,
                finalTotal:{},
                form:{
                    user:{
                        name:'',
                        email:'',
                        tel:'',
                        address:'',
                    },
                    message:'',
                },
               
            }
        },
        methods: {
            getCart(){
                const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                // vm.isLoading=true;
                this.$http.get(api).then(response => {
                vm.cartProducts = response.data.data.carts;
                vm.finalTotal =  response.data.data;
                console.log(response.data);
                // vm.isLoading=false;
                });
            },

            removeCartItem(id){
                const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
                const vm = this;
                // vm.isLoading=true;
                this.$http.delete(api).then(response => {
                // vm.cartProducts = response.data.data.carts;
                console.log(response.data);
                this.getCart();
                // vm.isLoading=false;
                });
            },

            CreateOrder(){
                const vm = this;
                const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
                const order = vm.form;
                // vm.isLoading=true;
                this.$validator.validate().then((result) => {
                if (result) {
                
                this.$http.post(api,{data: order}).then(response => {
                // vm.cartProducts = response.data.data.carts;
                if(response.data.success){
                    vm.$router.push(`/customer_checkout/payment/${response.data.orderId}`)
                }
                console.log('訂單建立',response);
                // vm.isLoading=false;
                });    
                }else{
                    console.log('欄位不完整');
                }
            });

            },
        },
        created(){
            this.getCart();
        }
    }
</script>
