<template>
  <div id="app">
    <canvas
      ref="babylonCanvas"
      :width="canvasSize.width"
      :height="canvasSize.height"
    />
  </div>
</template>

<script>
import BabylonApp from "@b";
import handleResize from "./methods/resize";

export default {
  name: "App",
  components: {},
  data() {
    return {
      showSpinner: false,
      babylonCanvas: null,
      canvasSize: {
        width: 800,
        height: 800,
      },
    };
  },
  mounted() {
    this.babylonCanvas = this.$refs.babylonCanvas;

    window.addEventListener("resize", () => {
      this.canvasSize = handleResize();
    });

    this.canvasSize = handleResize();

    if (this.babylonCanvas) {
      this.bApp = new BabylonApp(this.babylonCanvas);
    }
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  color: white;
  overflow: hidden;
  background-color: black;
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
