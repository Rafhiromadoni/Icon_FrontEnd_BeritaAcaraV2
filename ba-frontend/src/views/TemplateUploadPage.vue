<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1>Upload Template Berita Acara</h1>
    <input type="file" @change="onFileChange" accept=".docx" />
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { uploadTemplate } from '@/services/api';

const router = useRouter();
const error = ref('');

async function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const res = await uploadTemplate(file);
    const { placeholders, templatePath } = res.data;
    router.push({
      name: 'generator',           // ← pakai nama yang sesuai index.js
      query: {
        placeholders: JSON.stringify(placeholders),
        templatePath,
      },
    });
  } catch (err) {
    console.error(err);
    error.value = 'Gagal upload template. Coba lagi.';
  }
}
</script>
