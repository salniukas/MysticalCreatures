
<template>
<section id="live">
    <div class="container-fluid">
    <div class="now_live_number" style="margin-left: 150px;">  
      <h2>Dabar transliuoja</h2>
      <h4 class="text-muted">Šiuo metu transliuoja: {{channels.length}} streameriai</h4>
    </div>

    
         <div class="row" style="margin-left: 150px; margin-top: 25px;" v-cloak data-server-rendered="true" v-if="channels.length" >
		    <div class="col-md-2" v-for="(channel, index) in channels" @click="selectChannel(channel)" :key="index" v-cloak>
		      <a :href="channel.url"><img :src="channel.channel.logo" width="277px" height="360px"  class="stream_img" ></a>
		      <img class="bottomleft2" src="img/dot.png">
		      <div class="bottomleft">{{ channel.channelName }}</div>
		      <div class="bottomright">{{ channel.stream.viewers }}</div>
		    </div>
		 </div>
    </div>
  </section>
</template>
<script>
export default {
    data: () => ({
        // The channelList contains the list of channels
        channelList: ['gretasweet', "MykolasGX", "dariuscxz", "knok1zygis", "prefis", 'Sponsorius', "ArnasSTB", "Gandras", "ChosenOneLOL", "Kibirine","stelaqck", "jonenso", "destiny_bbx"],
        channels: [],
        selectedChannel: null,
        channelToAdd: '',
        apiURL: "https://api.twitch.tv/kraken",
        apiKey: "jbs5utramn16lwkpnnpetvkdt6o6nu",
    }),
 
    mounted() {
        console.log('API: ' + this.apiKey);
        console.log('channels: ' + this.channels);
 
        this.loadChannels();
    },
 
    methods: {
        // Open a channel's URL in a new window
        openChannel(key) {
            window.open("https://www.twitch.tv/" + key);
        },
 
        // Add a channel to the list`
        addChannel() {
            // Make sure channel doesn't already exist
            const channelName = this.channelToAdd.trim().toLowerCase();
            this.channelToAdd = '';
 
            const channelExists = !!this.channels
                .find(({ name }) => name === channelName);
 
            if (channelExists) {
                console.log(`Channel ${channelName} already exists`);
            } else {
                // Retrieve channel information
                this.getChannelData(channelName);
            }
        },
 
        // Select a live channel to view stream info
        selectChannel(key) {
            this.selectedChannel = this.selectedChannel === key
                ? null
                : key;
        },
 
        // Load the channel list into 'channels'
        loadChannels() {
            this.$data.channelList.forEach(this.getChannelData);
            console.log('AWDQW: ' + channelList.forEach(this.getChannelData));
             console.log('AWDQW22:' + this.channelList);
        },
 
        // Get channel information from the Twitch API
        getChannelData(channelName) {
            // Get stream data
            const streamUrl = this.apiURL + "/streams/" + channelName + "?client_id=" + this.apiKey;
 
            $.getJSON(streamUrl, ({ stream }) => {
                if (!stream) {
                    return;
                }
               
                // Get channel data
                const channelUrl = this.apiURL + "/channels/" + channelName + "?client_id=" + this.apiKey;
 				
                $.getJSON(channelUrl, channel => {
                    this.channels.push({
                        channel,
                        channelName,
                        stream: {
                            game: stream.game,
                            created_at: stream.created_at,
                            viewers: stream.viewers,
                            preview: stream.preview.medium,
                        },
                    });
                });
            });
        }
    }
};
</script>