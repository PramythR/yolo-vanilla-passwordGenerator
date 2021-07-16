const characterAmountRange = document.querySelector("#characterAmountRange");
const characterAmountNumber = document.querySelector("#characterAmountNumber");
const form = document.querySelector("#passwordGeneratorForm");
const includeUpperCaseElement = document.querySelector("#includeUppercase");
const includeNumbersElement = document.querySelector("#includeNumbers");
const includeSymbolsElement = document.querySelector("#includeSymbols");

const passwordDisplay = document.querySelector("#passwordDisplay");

const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUpperCase = includeUpperCaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    includeNumbers,
    includeSymbols,
  );
  passwordDisplay.textContent = password;
});

function generatePassword(
  characterAmount,
  includeUpperCase,
  includeNumbers,
  includeSymbols,
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUpperCase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i < high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}
