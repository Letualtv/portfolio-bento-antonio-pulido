<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="text-center">
    <h1 class="display-5 text-primary mb-4">{{ msg }}</h1>

    <div class="card mx-auto mb-4" style="max-width: 400px;">
      <div class="card-body">
        <h5 class="card-title">
          <i class="bi bi-hand-index-thumb"></i>
          Contador Interactivo
        </h5>
        <p class="card-text">Haz clic en el botón para incrementar el contador</p>
        <button 
          type="button" 
          class="btn btn-success btn-lg" 
          @click="count++"
        >
          <i class="bi bi-plus-circle"></i>
          El contador es {{ count }}
        </button>
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <i class="bi bi-info-circle"></i>
      <strong>¡Bootstrap funciona!</strong> 
      Edita <code>components/HelloWorld.vue</code> para probar HMR
    </div>

    <div class="row text-center mt-4">
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <i class="bi bi-lightning-charge fs-1 text-warning"></i>
            <h5 class="card-title">Vite</h5>
            <p class="card-text">
              Revisa la documentación oficial de 
              <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="btn btn-outline-primary btn-sm">
                create-vue
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <i class="bi bi-code-square fs-1 text-success"></i>
            <h5 class="card-title">IDE Support</h5>
            <p class="card-text">
              Aprende más sobre soporte de IDE en la 
              <a
                href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
                target="_blank"
                class="btn btn-outline-success btn-sm"
              >
                Guía de Vue
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <p class="text-muted mt-4">
      <i class="bi bi-cursor"></i>
      Haz clic en los logos de Vite y Vue para aprender más
    </p>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
