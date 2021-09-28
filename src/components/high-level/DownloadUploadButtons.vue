<template>
  <div>
    <button
      @click="this.emitter.emit('save-state-to-local-machine')"
      class="download"
    >
      Download data
    </button>
    <label for="upload">Upload data</label>
    <input
      type="file"
      id="upload"
      class="upload"
      @change="emitUploadStateFromLocalMachineEvent"
    />
    <div class="output"></div>
  </div>
</template>

<script>
export default {
  name: "DownloadUploadButtons",
  methods: {
    emitUploadStateFromLocalMachineEvent: function(event) {
      this.emitter.emit(
        "upload-state-from-local-machine",
        event.target.files[0]
      );
    }
  }
};
</script>

<style></style>
