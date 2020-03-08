const deserialize = require('./index');

test('Should get same result as expected on ennunciate', function () {
  var query = 'person.first_name=John&person.last_name=Smith&preferences.ui.night_mode=auto';
  var expectedObject = {
    person: {
      firstName: 'John',
      lastName: 'Smith'
    },
    preferences: {
      ui: {
        nightMode: 'auto'
      }
    }
  }
  
  expect(deserialize(query)).toStrictEqual(expectedObject);
});

test('Should give a way to escape &, =, -, _ or . chars', function () {
  var query = 'character-symbols.\\&\\&=\\&\\&&character_symbols.\\=\\====&character-symbols.\\.\\.\\.=...&character-symbols.\\-\\_=-_';
  var expectedObject = { characterSymbols: {} };
  expectedObject.characterSymbols['&&'] = '&&';
  expectedObject.characterSymbols['=='] = '==';
  expectedObject.characterSymbols['...'] = '...';
  expectedObject.characterSymbols['-_'] = '-_';

  expect(deserialize(query)).toStrictEqual(expectedObject);
});
test('Should only work with strings', function () {
  var thrownErrorIncorrectType = 'Can only deserialize strings';

  expect(function () {
    deserialize(1)
  }).toThrow(thrownErrorIncorrectType);
  expect(function () {
    deserialize([1, 2])
  }).toThrow(thrownErrorIncorrectType);
  expect(function () {
    deserialize({a: 'b'})
  }).toThrow(thrownErrorIncorrectType);
});