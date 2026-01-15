<template>
  <v-card tag="section" elevation="2" role="search" aria-label="Task filters">
    <v-card-text>
      <v-text-field
        v-model="store.filters.searchText"
        :label="t.taskFilter.searchPlaceholder"
        prepend-inner-icon="mdi-magnify"
        :clearable="true"
        variant="outlined"
        density="comfortable"
        hide-details
        class="mb-4"
      ></v-text-field>
      
      <v-chip-group
        v-model="store.filters.status"
        mandatory
      >
        <v-chip
          v-for="option in statusOptions"
          :key="option.value"
          :value="option.value"
          filter
          variant="tonal"
        >
          {{ option.label }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { taskStore, statusOptions } from '@stores/taskStore';
import { useTranslations } from '@/i18n';

const store = taskStore();
const { t } = useTranslations();

</script>
