export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    date_created: string;
    count: number;
    status: string
}

export interface ProductsState {
    products: Product[];
    filteredProducts: Product[];
    selectedNames: string[];
    dateFrom: string | null;
    dateTo: string | null;
    isLoading: boolean;
}
