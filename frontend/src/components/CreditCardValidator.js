import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreditCardValidator() {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleValidation = async () => {
        try {
            const response = await fetch('http://localhost:4000/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ creditCardNumber }),
            });

            if (response.ok) {
                const data = await response.json();
                setValidationResult(data.isValid ? 'Valid' : 'Invalid');
                setErrorMessage('');
            } else {
                setValidationResult(null);
                setErrorMessage('Error: Failed to validate credit card');
            }
        } catch (error) {
            console.error('Error:', error);
            setValidationResult(null);
            setErrorMessage('Error: Network issue, please try again');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{textAlign:'center', color:'#1976D2'}}>Credit Card Validator</h1>
            <TextField
                id="outlined-basic"
                label="Credit Card"
                variant="outlined"
                type="text"
                placeholder="Enter credit card number"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
            />
            <Button variant="outlined" onClick={handleValidation} style={{width:"5rem", height:"3.5rem", marginTop: '1rem'}}>
                Validate
            </Button>

            {validationResult && <p>Validation Result: {validationResult}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default CreditCardValidator;