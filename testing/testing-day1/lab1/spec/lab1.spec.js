const { capitalizeTextFirstChar, createArray, random } = require('../lab1');

describe('capitalizeTextFirstChar', () => {
    it('should return a string', () => {
        const result = capitalizeTextFirstChar("hello world");
        expect(typeof result).toBe("string");
    });

    it('should capitalize words correctly', () => {
        const result = capitalizeTextFirstChar("i'm ahmed ali");
        expect(result).toBe("I'm Ahmed Ali");
    });

    it('should throw an error for non-string input', () => {
        expect(() => capitalizeTextFirstChar(12)).toThrowError("Parameter should be string");
    });
});

describe('createArray', () => {
    it('should return an array', () => {
        expect(Array.isArray(createArray(2))).toBe(true);
    });

    it('should return array of length 2 and include 1', () => {
        const result = createArray(2);
        expect(result.length).toBe(2);
        expect(result.includes(1)).toBe(true);
    });

    it('should return array of length 3 and not include 3', () => {
        const result = createArray(3);
        expect(result.length).toBe(3);
        expect(result.includes(3)).toBe(false);
    });
});
