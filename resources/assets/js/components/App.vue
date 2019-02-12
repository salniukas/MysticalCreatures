<template>
  <div id="app" v-cloak>
  <section id="hi">
    <div class="container-fluid">
    <div class="row">
      <img src="img/logo.png" class="col-md-2 col-sm-4 col-xs-5" style="margin-left: 110px;">
      <ul class="col-md-5 col-sm-6" style="margin-top: 130px; margin-left: 250px;">
        <li><a href="#">PAGRINDINIS</a></li>
        <li><a href="#">DABAR TRANSLIUOJA</a></li>
        <li><a href="#">BENDRUOMENĖ</a></li>
        <li><a href="#">PATEKIMAS</a></li>
        <li><a href="#">KONTAKTAI</a></li>
      </ul>
      <a href="https://discord.gg/nAjcM2"><button class="btn" style="margin-top: 120px;">Discord</button></a>
      </div>
    </div>
  </section>

  <stream></stream>

  <section id="community">
    <div class="container-fluid" style="margin-top: 50px;">
      <div><center><h1>Bendruomenė</h1></center></div>
      <div class="row" style="margin-top: 25px; margin-left: 150px; margin-bottom: 50px;">
      <crud-component
                  v-for="crud in cruds"
                  v-bind="crud"
                  :key="crud.id"
                  @update="update"
                  @delete="del"
      ></crud-component>
      </div>
    </div>
  </section>


  <section id="how">
    <div class="container-fluid">
      <div style="margin-top: 200px;"><center><h1>Kaip Patekti?</h1></center></div>
      <div style="margin-top: 20px;">
        <center><p class="text-center0" style="padding-bottom: 150px;">Patekimas į „Mistines Būtybes” yra labai paprastas<br><br>

        Turite atitikti šiuos reikalavimus:<br>Mažiausiai 1000 sekėjų.<br>
		Laikosi „Twitch“ svetainės taisyklių.<br>
		Socialiai atsakinga veikla. (Nėra piktybinių patyčių, rasizmo,religinių nesantaikų).<br><br>

        Kartais yra daromos išimtys, nuostabiems kūrėjams, su nuostabia bendruomene<br><br>

       	Jei manote, kad atitinkate reikalavimus, spauskyte migtuką ir tapkite „Mistines Būtybe”</p></center>
      </div>
      <center><a href="https://goo.gl/forms/RvhbTX3tHGVbG5S32"><button class="btn2">Pildyti</button></a></center>
    </div>
  </section>

  <section id="contacts" style="margin-top: 80px; margin-bottom: 25px;">
    <div class="container-fluid" style="margin-left: 150px;">
      <h1>Kontaktai</h1>

      <h4 style="margin-bottom: 10px;">Koordinatoriai:</h4>

      <h5>Dovile Pakutinskaitė</h5>
      <a href="mailto:dovile@tryskubai.lt?Subject=Misitnės%Būtybės-Klausimas" target="_top"><h5>Dovile@tryskubai.lt</h5></a>
      <h5>Lukas Šalna</h5>
      <a href="mailto:lukas@tryskubai.lt?Subject=Misitnės%Būtybės-Klausimas" target="_top"><h5>Lukas@tryskubai.lt</h5></a>
      <br>
      <h4>Teisejai:</h4>

      <h5>Arnas(ArnasSTB) ir Andrius(Gandras)</h5>

      <!-- <a href="mailto:info@mistinesbutybes.lt?Subject=Misitnės%Būtybės-Skundas" target="_top"><h5>Info@mistinesbutybes.lt</h5></a> -->


    </div>

  </section>
  </div>
</template>

<script>
  function Crud({ id, color, name}) {
    this.id = id;
    this.color = color;
    this.name = name;
  }
  import Stream from './Stream.vue';
  import CrudComponent from './Crud.vue';
  
  

  export default {
    data() {
      return {
        cruds: [],
        working: false
      }
    },
    methods: {
      create() {
        this.mute = true;
        window.axios.get('/api/cruds/create').then(({ data }) => {
          this.cruds.push(new Crud(data));
          this.mute = false;
        });
      },
      read() {
        this.mute = true;
        window.axios.get('/api/cruds').then(({ data }) => {
          data.forEach(crud => {
            this.cruds.push(new Crud(crud));
          });
          this.mute = false;
        });
      },
      update(id, color) {
        this.mute = true;
        window.axios.put(`/api/cruds/${id}`, { color }).then(() => {
          this.cruds.find(crud => crud.id === id).color = color;
          this.mute = false;
        });
      },
      del(id) {
        this.mute = true;
        window.axios.delete(`/api/cruds/${id}`).then(() => {
          let index = this.cruds.findIndex(crud => crud.id === id);
          this.cruds.splice(index, 1);
          this.mute = false;
        });
      }
    },
    watch: {
      mute(val) {
        document.getElementById('mute').className = val ? "on" : "";
      }
    },
    components: {
      Stream,
      CrudComponent
      
    },
    created() {
      this.read();
    }
  };
</script>
