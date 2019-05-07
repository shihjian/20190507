<template>
  <div>
    <Alert></Alert>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <Loading :active.sync="isLoading"></Loading>
      <router-link class="navbar-logo" to="/">THE TRAVEL</router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link class="nav-item nav-link" to="/login">管理者登入</router-link>
        </div>
      </div>
    </nav>
    <div
      id="carouselExampleSlidesOnly"
      class="carousel slide banner"
      data-ride="carousel"
      data-pause="false"
      data-interval="4000"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100 banner-1">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100 banner-2">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100 banner-3">
        </div>
      </div>
    </div>
    <div class="text-center text-light banner-title">
      <h3 class="h1 mb-3">來一場不一樣的旅行</h3>
      <p>旅行，能讓你付出卻變得更富有。</p>
    </div>


    
    <div class="container ml-auto mr-auto">
      <div class="row text-center">
        <div class="col-md-4 indexbox d-flex">
          <div class="d-flex align-items-center">
            <i class="fas fa-plane fa-3x"></i>
          </div>
          <div class="text-left ml-3 mb-0">
            <h4 class="h5 indexbox-text">旅遊門票</h4>
            <p>一券在手，通行無阻！</p>
          </div>
        </div>
        <div class="col-md-4 indexbox d-flex">
          <div class="d-flex align-items-center">
            <i class="far fa-calendar-minus fa-3x"></i>
          </div>
          <div class="text-left ml-3">
            <h4 class="h5 indexbox-text">一日行程</h4>
            <p>事先預訂，免煩惱！</p>
          </div>
        </div>
        <div class="col-md-4 indexbox d-flex">
          <div class="d-flex align-items-center">
            <i class="fas fa-mobile-alt fa-3x"></i>
          </div>
          <div class="text-left ml-3">
            <h4 class="h5 indexbox-text">線上預訂</h4>
            <p>隨訂隨付，免到場排隊！</p>
          </div>
        </div>
      </div>
    </div>
        <router-view></router-view>
        <CartModal/>
       
    <footer class="bg-dark py-4 pt-3">
        <div class="container d-flex justify-content-center">
            <div class="mr-3 text-warning">© Copyright 2019 THE TARVEL BY YJ</div>
                <div>
                <a href="#" class="text-warning mr-2"><i class="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100002354668302" class="text-warning mr-2"><i class="fab fa-facebook"> </i></a>
                <a href="#" class="text-warning mr-2"><i class="fab fa-twitter"></i></a>
            </div>
        </div>
    </footer> 
  </div>
</template>
    

<script>


import Allproducts from "./Allproducts";
import Alert from "./AlertMessage";
import CartModal from "../components/CartModal.vue";
import categories from "./Categories.vue";
export default {
  name: "Home",
  components: {
    Allproducts,
    Alert,
    CartModal,
    categories,

  },
  data() {
    
    return {
      products: [],
      searchText: "",
      categories: [],
      isLoading: false
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter(item => {
          const data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    }
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        console.log("取得產品列表:", response);
        vm.getUnique();
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const item = {
        product_id: id,
        qty
      };
      vm.isLoading = true;
      this.$http.post(url, { data: item }).then(response => {
        vm.isLoading = false;
        console.log("加入購物車:", response);
      });
    },
    getUnique() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach(item => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
    },

    
  },
  created() {
    this.getProducts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
