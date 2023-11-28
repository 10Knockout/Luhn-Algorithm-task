const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the credit card validation server');
});

app.post('/validate', (req, res) => {
  const { creditCardNumber } = req.body;
  const isValid = validateCreditCardNumber(creditCardNumber);
  res.json({ isValid });
});

function validateCreditCardNumber(cardNumber) {
  if (typeof cardNumber !== 'string') {
    return false; // Return false if cardNumber is not a string
  }

  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  let sum = 0;
  let isEven = false;

  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber[i], 10);

    if (isEven && (digit *= 2) > 9) {
      digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
