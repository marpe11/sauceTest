// utils/constants.js
export const validPassword = 'secret_sauce';

export const userScenarios = [
  { 
    username: 'standard_user', 
    expectedResult: 'success',
    description: 'Valid login for standard user'
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