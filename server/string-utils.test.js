const toTitleCase = require('./string-utils');

test('convert to title case', () => {
    const phrase = toTitleCase('the qUICK brown fOX jumps over the lazy dog')
    expect(phrase).toBe('The Quick Brown Fox Jumps Over The Lazy Dog')
});

