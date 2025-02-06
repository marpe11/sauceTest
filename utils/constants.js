// utils/constants.js
export const validPassword = 'secret_sauce';

export const userScenarios = [
  { 
    username: 'standard_user', 
    expectedResult: 'success',
    description: 'Valid login for standard user1'
  },
  { 
    username: 'locked_out_user', 
    expectedResult: 'locked',
    description: 'Locked out user login attempt'
  },
  { 
    username: 'problem_user', 
    expectedResult: 'success',
    description: 'Login for problem user'
  },
  { 
    username: 'performance_glitch_user', 
    expectedResult: 'success',
    description: 'Login for performance glitch user'
  },
  { 
    username: 'error_user', 
    expectedResult: 'success',
    description: 'Login for error user'
  },
  { 
    username: 'visual_user', 
    expectedResult: 'success',
    description: 'Login for visual user'
  }
];
export const productDetails = {
  name: 'Sauce Labs Bolt T-Shirt',
  description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
  price: '$15.99',
};

export const shippingInfo = {
  firstName: 'Marcus',
  lastName: 'Novo QA da Auvo',
  postalCode: '88040001',
};