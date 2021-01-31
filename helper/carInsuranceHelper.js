module.exports = {
    updatePrice(carInsurance) {
        carInsurance.products.map((product) => {
            switch(product.name) {
                case 'Full Coverage':
                    this.setFullCoveragePrice(product);
                    this.checkMaxPrice(product);
                    this.checkMinPrice(product);
                    product.sellIn--;
                    break;
                case 'Special Full Coverage':
                    this.setSpecialFullCoveragePrice(product);
                    this.checkMaxPrice(product);
                    this.checkMinPrice(product);
                    product.sellIn--;
                    break;
                case 'Super Sale':
                    this.setSupersalePrice(product);
                    this.checkMaxPrice(product);
                    this.checkMinPrice(product);
                    product.sellIn--;
                    break;
                case 'Mega Coverage':
                    this.checkMinPrice(product);
                    break;
                default:
                    this.setDefaultPrice(product);
                    this.checkMaxPrice(product);
                    this.checkMinPrice(product);
                    product.sellIn--;
                    break;
            }
        });
        return carInsurance;
    },

    setFullCoveragePrice(product) {
        let increase = 1;
        if (product.sellIn <= 0) {
            increase = 2;
        }
        product.price += increase;
    },

    setSpecialFullCoveragePrice(product) {
        let increase = 1;
        if (product.sellIn <= 10) {
            increase = 2;
        }
        if (product.sellIn <= 5) {
            increase = 3;
        }
        product.price += increase;
        if (product.sellIn <= 0) {
            product.price = 0;
        }
    },

    setSupersalePrice(product) {
        let decrease = 2;
        if (product.sellIn <= 0) {
            decrease = 4;
        }
        product.price -= decrease;
    },

    setDefaultPrice(product) {
        let decrease = 1;
        if (product.sellIn <= 0) {
            decrease = 2;
        }
        product.price -= decrease;
    },

    checkMaxPrice(product) {
        if (product.price > 50) {
            product.price = 50;
        }
    },

    checkMinPrice(product) {
        if (product.price < 0) {
            product.price = 0;
        }
    }
}
