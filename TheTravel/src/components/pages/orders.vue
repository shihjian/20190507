<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h3 class="mt-4">訂單管理列表 Order Managment</h3>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th width="100">顧客名稱</th>
          <th width="120">購買款項</th>
          <th width="160">應付金額</th>
          <th width="160">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{item.create_at | date }}</td>
          <td>{{item.user.name}}</td>
          <td >
            <ul>
              <li v-for="(product, index) in item.products" :key="index" class="mb">{{product.product.title}}：
                {{product.qty}}{{product.product.unit}} </li><br>
            </ul>
              
          </td>
          <td >{{ item.total | currency }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <pagination :page-data="pagination" @changepage="getOrders"></pagination> -->
  </div>
</template>

<script>
export default {
  data() {
      return {
        orders: [],
        pagination: {},
        isLoading: false,
        tempOrder: {
          user: { name: '', }
        }
      };
  },

  methods: {
      getOrders( page = 1 ) {
        // 取得訂單列表
        const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.isLoading = false;
          if (response.data.success) {
            vm.orders = response.data.orders;
            vm.pagination = response.data.pagination;
          };
        });
  },
  },
    created() {
      this.getOrders();
    },
};
</script>




