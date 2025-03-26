import { defineStore } from 'pinia';
import type {Product, ProductsState} from "~/types/product";
import {ProductService} from "~/utils/ProductService";

export const useProductsStore = defineStore('products', {
    state: (): ProductsState => ({
        products: [],
        filteredProducts: [],
        selectedNames: [],
        dateFrom: null,
        dateTo: null,
        isLoading: true,
    }),

    actions: {
        async getProducts() {
            this.isLoading = true;
            const productService = new ProductService();
            await productService.getProducts()
                .then(products => {
                    this.products = products as Product[];
                    this.filteredProducts = products as Product[];
                })
                .catch(err => {
                    return err;
                })
                .finally(() => this.isLoading = false);
        },

        setDateFrom(date: string | null) {
            this.dateFrom = date;
            this.applyFilters();
        },

        setDateTo(date: string | null) {
            this.dateTo = date;
            this.applyFilters();
        },

        toggleNameSelection(name: string) {
            const index = this.selectedNames.indexOf(name);
            if (index === -1) {
                this.selectedNames.push(name);
            } else {
                this.selectedNames.splice(index, 1);
            }
            this.applyFilters();
        },

        clearFilters() {
            this.selectedNames = [];
            this.dateFrom = null;
            this.dateTo = null;
            this.applyFilters();
        },

        applyFilters() {
            let result = [...this.products];

            // Фильтрация по дате
            if (this.dateFrom) {
                result = result.filter(product =>
                    new Date(product.date_created) >= new Date(this.dateFrom as string)
                );
            }

            if (this.dateTo) {
                result = result.filter(product =>
                    new Date(product.date_created) <= new Date(this.dateTo as string)
                );
            }

            // Фильтрация по выбранным именам
            if (this.selectedNames.length > 0) {
                result = result.filter(product =>
                    this.selectedNames.includes(product.name)
                );
            }

            this.filteredProducts = result;
        }
    },

    getters: {
        uniqueProductNames: (state): string[] => {
            return [...new Set(state.products.map(product => product.name))];
        },
        isNameSelected: (state) => (name: string): boolean => {
            return state.selectedNames.includes(name);
        }
    }
});