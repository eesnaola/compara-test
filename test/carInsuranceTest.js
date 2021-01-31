const expect = require('chai').expect;

const Product = require('../models/product');
const CarInsurance = require('../models/carInsurance');
const carInsuranceHelper = require('../helper/carInsuranceHelper');

describe("Car Insuranse Tests", () => {
    it("The price of the Super Sale product must decrease in 4 once the sell by date has passed.", () => {
        var carInsurance = new CarInsurance([new Product("Super Sale", -2, 8)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(4);
        expect(carInsurance.products[0].sellIn).equal(-3);
    });
    it("The price of the Full Coverage product must increase in 2 once the sell by date has passed.", () => {
        var carInsurance = new CarInsurance([new Product("Full Coverage", -2, 8)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(10);
        expect(carInsurance.products[0].sellIn).equal(-3);
    });
    it("The price of a product is never negative.", () => {
        var carInsurance = new CarInsurance([new Product("Full Coverage", -5, -10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(0);
        expect(carInsurance.products[0].sellIn).equal(-6);
    });
    it("The price of the Full Coverage product is never more than 50.", () => {
        var carInsurance = new CarInsurance([new Product("Full Coverage", 2, 50)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(50);
        expect(carInsurance.products[0].sellIn).equal(1);
        var carInsurance = new CarInsurance([new Product("Full Coverage", 2, 60)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(50);
        expect(carInsurance.products[0].sellIn).equal(1);
    });
    it("The price of the Special Full Coverage product is never more than 50.", () => {
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 2, 50)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(50);
        expect(carInsurance.products[0].sellIn).equal(1);
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 2, 60)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(50);
        expect(carInsurance.products[0].sellIn).equal(1);
    });
    it("The price of the Full Coverage product increases the older it gets.", () => {
        var carInsurance = new CarInsurance([new Product("Full Coverage", 6, 10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(11);
        expect(carInsurance.products[0].sellIn).equal(5);
    });
    it("The price of the Mega Coverage product never decreases in price.", () => {
        var carInsurance = new CarInsurance([new Product("Mega Coverage", 5, 80)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(80);
        expect(carInsurance.products[0].sellIn).equal(5);
    });
    it("The price of the Special Full Coverage product increases as older it gets when there are 11 days or more.", () => {
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 15, 10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(11);
        expect(carInsurance.products[0].sellIn).equal(14);
    });
    it("The price of the Special Full Coverage product increases by 2 when there are 10 days or less.", () => {
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 6, 10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(12);
        expect(carInsurance.products[0].sellIn).equal(5);
    });
    it("The price of the Special Full Coverage product increases by 3 when there are 5 days or less.", () => {
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 3, 10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(13);
        expect(carInsurance.products[0].sellIn).equal(2);
    });
    it("The price of the Special Full Coverage product drops to 0 when no more days left.", () => {
        var carInsurance = new CarInsurance([new Product("Special Full Coverage", 0, 10)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(0);
        expect(carInsurance.products[0].sellIn).equal(-1);
    });
    it("The price of the Super Sale product degrade twice as fast as normal products.", () => {
        var carInsurance = new CarInsurance([new Product("Super Sale", 5, 8)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(6);
        expect(carInsurance.products[0].sellIn).equal(4);
    });
    it("The price of the Normal product must decrease in 1.", () => {
        var carInsurance = new CarInsurance([new Product("Normal", 5, 8)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(7);
        expect(carInsurance.products[0].sellIn).equal(4);
    });
    it("The price of the Normal product must decrease in 2 once the sell by date has passed.", () => {
        var carInsurance = new CarInsurance([new Product("Normal", -2, 8)]);
        carInsuranceHelper.updatePrice(carInsurance);
        expect(carInsurance.products[0].price).equal(6);
        expect(carInsurance.products[0].sellIn).equal(-3);
    });
});
