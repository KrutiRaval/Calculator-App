import '@testing-library/jest-dom';
import calculate from './calculate';

//Testing of the app component
describe('App', () => {
  let expression;
  it ('evaluates the expression correctly', () => {
    expression = '2+3+4-4*3'
    expect(calculate(expression)).toBe(-3);

    expression = '0+3+4'
    expect(calculate(expression)).toBe(7);

    expression = '0-9'
    expect(calculate(expression)).toBe(-9);

    expression = '0.5+2.3'
    expect(calculate(expression)).toBe(2.8);
  })

  it ('evaluates expressions starting with a "-" operator', () => {
    expression = '-30'
    expect(calculate(expression)).toBe(-30);
  })

  it ('evaluates expressions with a "." operator', () => {
    expression = '5.5-9'
    expect(calculate(expression)).toBe(-3.5);
  })

  it ('evaluates longer expressions starting with a "-" operator', () => {
    expression = '-30-6'
    expect(calculate(expression)).toBe(-36);

    expression = '-0.5+5.3'
    expect(calculate(expression)).toBe(4.8)
  })

  it ('should throw an error for expressions starting with any other operator apart from "-" ', () => {

    expression = '*30-6'
    expect(calculate(expression)).toThrow();

    expression = '*3'
    expect(calculate(expression)).toThrow();

    expression = '+4-6'
    expect(calculate(expression)).toThrow();

    expression = '/4-6'
    expect(calculate(expression)).toThrow();
  })

})
