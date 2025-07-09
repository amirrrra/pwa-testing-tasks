const User = require('../lab2'); 

describe('User.addToCart', () => {
  it('should add a product object to the cart', () => {
    const user = new User('Ali', '1234');
    const product = { name: 'Laptop', price: 3000 };

    user.addToCart(product);

    expect(user.cart.length).toBe(1);
    expect(user.cart[0]).toEqual(product);
  });
});

describe('User.calculateTotalCartPrice', () => {
  it('should return total price of all products in the cart', () => {
    const user = new User('Amira', '4321');
    user.cart = [
      { name: 'Phone', price: 2000 },
      { name: 'Watch', price: 500 }
    ];

    const total = user.calculateTotalCartPrice();

    expect(total).toBe(2500);
  });

  it('should return 0 for empty cart', () => {
    const user = new User('Test', 'pass');
    expect(user.calculateTotalCartPrice()).toBe(0);
  });
});

describe('User.checkout', () => {
  let user;
  let mockPaymentModel;

  beforeEach(() => {
    user = new User('Sara', 'abcd');
    mockPaymentModel = {
      goToVerifyPage: jasmine.createSpy('goToVerifyPage'),
      returnBack: jasmine.createSpy('returnBack'),
      isVerify: jasmine.createSpy('isVerify')
    };
  });

  it('should call paymentModel methods', () => {
    mockPaymentModel.isVerify.and.returnValue(true);

    user.checkout(mockPaymentModel);

    expect(mockPaymentModel.goToVerifyPage).toHaveBeenCalled();
    expect(mockPaymentModel.returnBack).toHaveBeenCalled();
    expect(mockPaymentModel.isVerify).toHaveBeenCalled();
  });

  it('should return true if payment is verified', () => {
    mockPaymentModel.isVerify.and.returnValue(true);
    const result = user.checkout(mockPaymentModel);
    expect(result).toBe(true);
  });

  it('should return false if payment is not verified', () => {
    mockPaymentModel.isVerify.and.returnValue(false);
    const result = user.checkout(mockPaymentModel);
    expect(result).toBe(false);
  });
});
