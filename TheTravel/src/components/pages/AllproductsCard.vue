<template>
    <div>
      
        <div class="row mt-4">
            <div class="col-md-4 mb-4 price" v-for="item in products" :key="item.id">
            <div class="h6 text-secondary right-origin-price" v-if="item.price">NT$ {{ item.origin_price }}</div>
            <div class="h5 right-price" v-if="item.price">NT$ {{ item.price }}</div>
                <div class="card border-0 shadow-sm h-100 animated">
                    <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title">
                            <i class="fas fa-paw"></i>
                            <a href="#" class="h5 text-dark" @click.prevent="getProduct(item.id)">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="text-right align-items-baseline">
                            <div class="h5 text-secondary" v-if="!item.price">NT$ {{ item.origin_price }}</div>
                            <!-- <del class="h6 text-secondary" v-if="item.price">NT$ {{ item.origin_price }}</del>
                            <div class="h5" v-if="item.price">NT$ {{ item.price }}</div> -->
                        </div>
                    </div>
                    <div class="card-footer d-flex bg-dark">
                        <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm ml-auto" @click="addtoCart(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Alert from "../AlertMessage";
export default {
    components: {
    Alert,
  },
  data() {
    return {
      products:[],
      productsTotal:{},
      productsTotal:{},
      tempProduct:{}, //送出欄位內容
      pagination:{}, //分頁
      isNew:false,
      status:{
        loadingItem:'',
      },
      isLoading:false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading=true;
      this.$http.get(api).then(response => {
      console.log(response.data);
      vm.isLoading=false;
      vm.products = response.data.products;
      vm.pagination = response.data.pagination;
      console.log('取得遠端', response.data);
      });
    },
    getProduct(id){
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
      // console.log(response.data)      
      vm.$router.push(`itemdata/${response.data.product.id}`);
      vm.status.loadingItem='';
      })
    },
    addtoCart(id,qty = 1 ){
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart={
        product_id:id,
        qty
      };
      this.$http.post(api,{data:cart}).then((response) => {
      // console.log(response.data)
      if (response.data.success) {
      this.$bus.$emit("CartModal:getCart");
    
      console.log('成功')
      }
      vm.status.loadingItem='';
      vm.getCart();
      });
      
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

  },
  created() {
    this.getProducts();

  },
};
</script>