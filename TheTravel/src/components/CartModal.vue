<template>
    <div>
        <div @click="openCart">
            <img src="..\assets\img\shopping-cart.png" class="cart-position" alt="">
            <span class="badge badge-danger cart-number-position">{{ productsTotal }}</span>
        </div>
        <!-- Modal -->
        <div class="modal fade bd-example-modal-lg" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-5">
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
                                            <div class="text-success mt-1" v-if="cartItem.coupon" style="font-size: 12px;"> 已套用優惠券</div>
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
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="moveToPay">結帳去</button>
                    </div>
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
                cartProducts: {},
                productsTotal:{},
                cartTotalPrice: 0,
                finalTotal:{},
               
            }
        },
        methods: {
            openCart(){
                $('#cartModal').modal('show');
                this.getCart();
            },

            getCart(){
                const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                vm.isLoading=true;
                this.$http.get(api).then(response => {
                vm.cartProducts = response.data.data.carts;
                vm.productsTotal=response.data.data.carts.length;
                vm.finalTotal =  response.data.data;
                console.log('getCart',response.data);
                vm.isLoading=false;
                
                });
                
            },

            removeCartItem(id){
                const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
                const vm = this;
                // vm.isLoading=true;
                this.$http.delete(api).then(response => {
                // vm.cartProducts = response.data.data.carts;
                // console.log(response.data);
                this.getCart();
                // vm.isLoading=false;
                });
            },


            moveToPay(){
                $('#cartModal').modal('hide');
                this.$router.push('/customer_checkout');
            }

        },
        created(){
            this.getCart();
        }
    }
</script>