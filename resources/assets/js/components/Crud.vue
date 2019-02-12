<template>
    <div class="crud">
        <div class="col-md-3">
        <a :href="link"><img :src="image"/></a>
        <center><a :href="link"><h3>{{ name | properCase }}</h3></a></center>
      </div>
    </div>
</template>
<script>
  export default {
    computed: {
      image() {
        return `/img/${this.color}.png`;
      },
      link() {
        return `https://twitch.tv/${this.name}`
      }
    },
    methods: {
      update(val) {
        this.$emit('update', this.id, val.target.selectedOptions[0].value);
      },
      del() {
        this.$emit('delete', this.id);
      }
    },
    props: ['id', 'color', 'name'],
    filters: {
      properCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  };
</script>
