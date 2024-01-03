<template>
  <div id="app">
    <div class="np-btn" @click="generatePDF()">
      Generate PDF
    </div>

    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="InvoicePDF"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="10"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
    >
      <section slot="pdf-content">
        <BrokerInvoicePdf />
      </section>
    </vue-html2pdf>

    <div>
      <BrokerInvoicePdf />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BrokerInvoicePdf from '../components/BrokerInvoicePdf.vue'
export default Vue.extend({
  name: 'Demo',
  components: {
    BrokerInvoicePdf
  },
  methods: {
    onProgress (event: any) {
      console.log(`Processed: ${event} / 100`)
    },
    hasGenerated () {
      alert('PDF generated successfully!')
    },
    generatePDF () {
      this.$refs.html2Pdf.generatePdf()
    }
  }
})
</script>

<style scoped>
#app {
  font-family: 'Euclid Circular A', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.np-btn {
  padding: 2px 8px;
  margin: 12px 8px;
  border: 1px solid #da1010;
  width: 110px;
  background: #da1010;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
}
</style>
