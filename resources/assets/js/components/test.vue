<template>
<section id="live">
    <div class="container-fluid">
    <div class="now_live_number" style="margin-left: 150px;">  
      <h2>Dabar transliuoja</h2>
      <h4 class="text-muted">Šiuo metu transliuoja: {{count}} streameriai</h4>
    </div>

    
         <div class="row" style="margin-left: 150px; margin-top: 25px;" v-cloak data-server-rendered="true" >
		    <div class="col-md-2" v-for="stream in streamsFilter" v-if="channel.online" @click="selectChannel(key)" v-cloak>
		      <a v-bind:href="'https://www.twitch.tv/'+stream.channel.display_name" target="_blank"><img :src="stream.preview.large" width="277px" height="360px"  class="stream_img" v-if="stream.preview"></a>
		      <img class="bottomleft2" src="img/dot.png">
		      <div class="bottomleft" v-text="key"></div>
		      <div class="bottomright">{{ stream.viewers }}</div>
		    </div>
		 </div>
    </div>
  </section>
</template>

<script>
export default{
	data: function(){
		return{
			twitchStreamers: ["gretasweet", "MykolasGX", "dariuscxz", "knok1zygis", "prefis", "Sponsorius", "ArnasSTB", "Gandras", "ChosenOneLOL", "Kibirine", "Casualation", "vBaeK"],
			streams: [],
			query: '',
			streamsFilterKey: 'online',
			twitch_url: 'https://api.twitch.tv/kraken/',
			twitch_api_key: '?client_id=7lfa2cbsvfklqjmq3gurmqv2d1gw28'
		}
	},
	created: function() {
			this.$nextTick(function () {
				this.loadStreams(this.twitchStreamers);
			});
	},
	computed: {
		streamsFilter() {
			return this[this.streamsFilterKey];
		},
		all() {
			return this.streams.filter((x) => (x.channel.display_name.indexOf(this.query) !== -1))
		},
		online() {
			return this.streams.filter((x) => (x.channel.display_name.indexOf(this.query) !== -1) && (x.channel.status !== 'offline'))
		},
		offline() {
			return this.streams.filter((x) => (x.channel.display_name.indexOf(this.query) !== -1) && (x.channel.status === 'offline'))
		}
	},
	methods: {
		loadStreams: function(user) {
			var _self = this;
			var result = [];
			user.forEach(function(channel) {
				_self.$http.get(_self.twitchURL('streams', channel))
					.then(function (response) {
						var game, status, output;
						if(response.$data.stream === null) {
							game = 'Offline';
							status = 'offline';
							output = { channel: {'status': status, 'display_name': channel.toLowerCase(), 'game': game}};
							result.push(output);
						} else if(response.$data.stream === undefined) {
							game = 'Account closed';
							status = 'offline';
							output = { channel: {'status': status, 'display_name': channel.toLowerCase(), 'game': game}};
							result.push(output);
						} else {
							response.$data.stream.channel.display_name = response.$data.stream.channel.display_name.toLowerCase();
							game = response.$data.stream.game;
							status = 'online';
							result.push(response.$data.stream);
						}
				});
			});
			this.streams = result.sort();
		},
		twitchURL: function(type, user) {
			return this.twitch_url + type + "/" + user + this.twitch_api_key;
		}
	}
};
</script>