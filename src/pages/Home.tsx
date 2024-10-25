import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Select, Button, Notification } from '@mantine/core';

const Home = () => {
    const [number, setNumber] = useState<string>('');
    const [type, setType] = useState<string>('trivia');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (number && isNaN(Number(number))) {
            setError('Число должно быть в виде цифры');
            return;
        }

        setError(null);
        navigate(`/results?number=${number}&type=${type}`);
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto' }}>
            <h1>Узнайте интересный факт о числе!</h1>

            {error && (
                <Notification color="red" onClose={() => setError(null)}>
                    {error}
                </Notification>
            )}

            <TextInput
                label="Enter number"
                placeholder="Enter number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />

            <Select
                label="Select"
                value={type}
                onChange={() => setType}
                data={[
                    { value: 'trivia', label: 'Trivia' },
                    { value: 'math', label: 'Math' },
                    { value: 'date', label: 'Date' },
                ]}
            />

            <Button onClick={handleSubmit} fullWidth style={{ marginTop: 20 }}>
                Try { number || 'random'}
            </Button>
        </div>
    );
};

export default Home;
