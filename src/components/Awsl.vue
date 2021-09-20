<template>
  <div v-if="pic_infos.length">
    <water-fall gap="10px" width="320px" :data="pic_infos" :delay="true">
      <template #default="item">
        <el-card :body-style="{ padding: '2px' }" shadow="hover">
          <img
            style="width: 100%"
            :src="item.url"
            @click="
              () => {
                visiableImg = true;
                srcList = item.srcList;
              }
            "
          />
          <div style="padding: 14px">
            <el-link :href="item.wb_url" target="_blank">查看原博</el-link>
          </div>
        </el-card>
      </template>
    </water-fall>
    <br />
    <br />
    <div v-if="loading == false">滑动加载更多</div>
    <a-back-top />
  </div>
  <div v-else>暂无数据</div>
  <el-image-viewer
    v-if="visiableImg"
    hide-on-click-modal
    @close="
      () => {
        visiableImg = false;
      }
    "
    :url-list="srcList"
  />
</template>

<script>
import axios from "axios";
import WaterFall from "kuan-vue-waterfall";

export default {
  components: {
    WaterFall,
  },
  data() {
    return {
      pic_infos: [],
      total: 0,
      loading: false,
      visiableImg: false,
      srcList: [],
    };
  },
  mounted() {
    this.fetchCount();
    this.fetchData(20, 0);
    window.addEventListener("scroll", () => {
      const scrollY =
        document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴上的滚动距离

      const vh =
        document.compatMode === "CSS1Compat"
          ? document.documentElement.clientHeight
          : document.body.clientHeight; // 页面的可视高度（能看见的）

      const allHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ); // 页面的总高度（所有的）

      if (scrollY + vh >= allHeight) {
        // 当滚动条滑到页面底部
        this.loadMore();
      }
    });
  },
  methods: {
    fetchData(limit, offset) {
      axios.get("/list?limit=" + limit + "&offset=" + offset).then((res) => {
        let pic_infos = res.data.map((item) => {
          let pic_info = item.pic_info;
          return {
            key: pic_info.pic_id,
            url: pic_info.large.url,
            srcList: [pic_info.mw2000.url],
            wb_url: item.wb_url,
          };
        });
        this.pic_infos = [...this.pic_infos, ...pic_infos];
      });
    },
    fetchCount() {
      axios.get("/list_count").then((res) => {
        this.total = res.data;
      });
    },
    loadMore() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (this.total > this.pic_infos.length) {
        this.fetchData(5, this.pic_infos.length);
      }
      setTimeout(() => {}, 1000);
      this.loading = false;
    },
  },
};
</script>
