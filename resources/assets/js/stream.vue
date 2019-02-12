<template>
    <div class="col-md-2">
      <a :href="channel.url"><img :src="channel.logo" width="277px" height="360px"  class="stream_img" ></a>
      <img class="bottomleft2" src="img/dot.png">
      <div class="bottomleft" v-text="key"></div>
      <div class="bottomright">{{ channel.stream.viewers }}</div>
    </div>
</template>

<script>
export default {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// *******
// Classes
// *******
var Channel = function Channel() {
  _classCallCheck(this, Channel);

  this.online = false;
  this.stream = null;
},

var Stream = function Stream(game, created, viewers, previewImg) {
  _classCallCheck(this, Stream);

  this.game = game;
  this.viewers = viewers;
  this.created = created;
  this.previewImg = previewImg;
},
// ***
// Vue
// ***


  data:{
    // The channelList contains the list of channels
	ChannelList: ["gretasweet", "MykolasGX", "dariuscxz", "knok1zygis", "prefis", "Sponsorius", "ArnasSTB", "Gandras", "ChosenOneLOL", "Kibirine", "sugoibash"],
	channels: {},
	selectedChannel: null,
	channelToAdd: '',
	apiURL: "https://api.twitch.tv/kraken",
	apiKey: "uk587j71kwpneedyqycec739qyg83u",
	count: 0
  },
  mounted: function mounted() {
    self = this;
    // Create the channels object based on the channelList
    this.channelList.forEach(function (channel) {
      // Vue.set is required here for Vue to detect the property addition
      Vue.set(self.channels, channel.toLowerCase(), new Channel());
    });
    this.loadChannels();
  },

  methods: {
    // Open a channel's URL in a new window
    // openChannel: function openChannel(key) {
    //   window.open("https://www.twitch.tv/" + key);
    // },
    // // Add a channel to the list
    // addChannel: function addChannel() {
    //   // Make sure channel doesn't already exist
    //   var channelName = this.channelToAdd.trim().toLowerCase();
    //   this.channelToAdd = '';
    //   var channelExists = false;
    //   for (var key in this.channels) {
    //     if (channelName == key) channelExists = true;
    //   }
    //   if (!channelExists) {
    //     // Retrieve channel information
    //     this.getChannelData(channelName);
    //   } else {
    //     console.log("Channel already exists");
    //   }
    // },
    // // Select a live channel to view stream info
    // selectChannel: function selectChannel(key) {
    //   if (this.selectedChannel == key) this.selectedChannel = null;else this.selectedChannel = key;
    // },
    // // Load the channel list into 'channels'
    // loadChannels: function loadChannels() {
    //   for (var key in this.channels) {
    //     this.getChannelData(key);
    //   }
    // },
    // // Get channel information from the Twitch API
    // getChannelData: function getChannelData(key) {
    //   self = this;
    //   // Get channel data
    //   var url = self.apiURL + "/channels/" + key + "?client_id=" + self.apiKey;

    //   $.getJSON(url, function (data) {
    //     Vue.set(self.channels, data.name, new Channel());
    //     self.channels[data.name].game = data.game;
    //     Vue.set(self.channels[data.name], "url", data.url);
    //     Vue.set(self.channels[data.name], "logo", data.logo);
    //     Vue.set(self.channels[data.name], "followers", data.followers);
    //     Vue.set(self.channels[data.name], "status", data.status);
    //     Vue.set(self.channels[data.name], "views", data.views);
    //   });
    //   // Get stream data
    //   url = self.apiURL + "/streams/" + key + "?client_id=" + self.apiKey;
    //   $.getJSON(url, function (data) {
    //     if (data.stream != null) {
    //       self.channels[data.stream.channel.name].online = true;
    //       self.count = self.count + 1;
    //       // Vue.set is required here for Vue to detect the property addition
    //       Vue.set(self.channels[data.stream.channel.name], "stream", new Stream(data.stream.game,data.stream.created_at, data.stream.viewers, data.stream.preview.medium));
    //     }
    //   });
    // }
  }
}
</script>