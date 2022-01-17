<template>
  <div
    class="gameover flex flex-col items-center justify-evenly max-w-[420px] min-w-[340px] overflow-hidden shadow-xl rounded-xl px-4 py-10 text-bold"
  >
    <h2 class="font-semibold text-center text-2xl mb-4">You scored</h2>
    <div
      class="flex flex-col mb-2 justify-center items-center p-10 w-28 h-28 ring-4 ring-white border-white rounded-full"
    >
      <span class="text-3xl">{{ lastScore }}%</span>
    </div>
    <p>Share your score :</p>
    <div class="flex flex-row w-[30%] justify-center my-4">
      <ShareNetwork
        v-for="network in networks"
        :key="network.network"
        class="flex flex-col items-center justify-center p-1"
        :network="network.network"
        :style="{ backgroundColor: network.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitter-user="sharing.twitterUser"
      >
        <i :class="`bx bxl-${network.network} text-xl`"></i>
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastScore: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: {},
      tags: [],
      prev: null,
      next: null,
      sharing: {
        url: "http://localhost:3000/",
        title: "Hey look at my score " + this.lastScore + "% on",
        description: "Can you do better on this quiz ?",
        quote: "",
        hashtags: "cinequiz,hubvisory",
        twitterUser: this.userName,
      },
      networks: [
        { network: "facebook", icon: ["fab", "facebook-f"], color: "#1877f2" },
        { network: "twitter", icon: ["fab", "twitter"], color: "#1da1f2" },
        { network: "whatsapp", icon: ["fab", "whatsapp"], color: "#25d366" },
      ],
    };
  },
};
</script>

<style scoped>
.gameover {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
}
</style>
