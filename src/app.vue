<template>
  <v-app>
    <v-app-bar color="primary" elevation="4">
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-clipboard-text</v-icon>
        {{ t.app.title }}
      </v-app-bar-title>
      <v-btn 
        @click="openAddModal" 
        color="white" 
        variant="elevated" 
        class="mr-4"
      >
        <v-icon class="mr-2">mdi-plus</v-icon>
        {{ t.app.addTask }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-4" tag="main">
        <v-row>
          <v-col cols="12" md="8" offset-md="2" tag="section">
            <taskFilter />
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" md="8" offset-md="2" tag="section">
            <v-row>
              <v-col 
                v-for="status in statuses" 
                :key="status"
                cols="12" 
                md="4"
              >
                <taskSection
                  :status="status"
                  @edit="openEditModal"
                  @delete="deleteTask"
                  @move-task="moveTask"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <taskForm
      v-if="isModalOpen"
      :task="editingTask"
      @close="closeModal"
    />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { taskStore } from '@stores/taskStore';
import { TaskStatus, type Task } from '@models/task';
import taskSection from '@components/taskSection/taskSection.vue';
import taskForm from '@components/taskForm.vue';
import taskFilter from '@components/taskFilter.vue';
import { useTranslations } from '@/i18n';

const store = taskStore();
const { t } = useTranslations();

const statuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

const isModalOpen = ref(false);
const editingTask = ref<Task | undefined>(undefined);

const openAddModal = (): void => {
  editingTask.value = undefined;
  isModalOpen.value = true;
};

const openEditModal = (task: Task): void => {
  editingTask.value = task;
  isModalOpen.value = true;
};

const closeModal = (): void => {
  isModalOpen.value = false;
  editingTask.value = undefined;
};

const deleteTask = (id: string): void => {
  store.deleteTask(id);
};

const moveTask = (taskId: string, newStatus: TaskStatus): void => {
  store.moveTask(taskId, newStatus);
};
</script>
