<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useProductsStore} from '~/store/product-store';

definePageMeta({
  middleware: 'auth'
})
const productsStore = useProductsStore();

const dateFrom = ref<string | null>(null);
const dateTo = ref<string | null>(null);

// Получаем данные из хранилища
const {filteredProducts, uniqueProductNames, isLoading} = storeToRefs(useProductsStore()); // make authenticated state reactive with storeToRefs

// Методы для работы с фильтрами
const isNameSelected = (name: string): boolean => {
  return productsStore.isNameSelected(name);
};

const toggleName = (name: string): void => {
  productsStore.toggleNameSelection(name);
};

const updateDateFrom = (): void => {
  productsStore.setDateFrom(dateFrom.value);
};

const updateDateTo = (): void => {
  productsStore.setDateTo(dateTo.value);
};

const clearAllFilters = (): void => {
  dateFrom.value = null;
  dateTo.value = null;
  productsStore.clearFilters();
};

// Форматирование даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
};


onMounted(() => {
  productsStore.getProducts();
});
</script>

<template>
  <div class="products-table-container">
    <div class="filters">
      <div class="date-filters">
        <div class="filter-group">
          <label for="date-from">Дата от:</label>
          <input
              id="date-from"
              v-model="dateFrom"
              type="date"
              @change="updateDateFrom"
          >
        </div>

        <div class="filter-group">
          <label for="date-to">Дата до:</label>
          <input
              id="date-to"
              v-model="dateTo"
              type="date"
              @change="updateDateTo"
          >
        </div>
      </div>

      <div class="name-filters">
        <h4>Фильтр по названию:</h4>
        <div class="name-checkboxes">
          <div
              v-for="name in uniqueProductNames"
              :key="name"
              class="name-checkbox"
          >
            <input
                :id="`name-${name}`"
                type="checkbox"
                :checked="isNameSelected(name)"
                @change="toggleName(name)"
            >
            <label :for="`name-${name}`">{{ name }}</label>
          </div>
        </div>
      </div>

      <button class="clear-filters" @click="clearAllFilters">
        Сбросить фильтры
      </button>
    </div>

    <div class="table-wrapper">
      <div v-if="isLoading" class="loading">
        Загрузка данных...
      </div>

      <table v-else class="products-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Категория</th>
          <th>Дата создания</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="filteredProducts.length === 0">
          <td colspan="5" class="no-data">Нет данных для отображения</td>
        </tr>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }} ₽</td>
          <td>{{ product.category }}</td>
          <td>{{ formatDate(product.date_created) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style lang="scss">
@use '@/assets/scss/profile.scss';
</style>