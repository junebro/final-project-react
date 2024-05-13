import { makeAutoObservable } from "mobx";

class ProductStore {
    products = [];
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setProducts(data) {
        this.products = data;
    }

    setError(error) {
        this.error = error;
    }

    fetchProducts() {
        fetch('http://localhost:8989/products/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => this.setProducts(data))
            .catch(error => {
                console.error('Error fetching product data:', error);
                this.setError("상품 데이터를 불러오는데 실패했습니다.");
            });
    }
}

const productStore = new ProductStore();
export default productStore;