import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import {Button, LoadingOverlay, Notification} from '@mantine/core';

const fetchNumberInfo = async (number: string, type: string) => {
    const url = number ? `http://numbersapi.com/${number}/${type}` : `http://numbersapi.com/random/${type}`;
    const { data } = await axios.get(url);
    return data;
};

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const number = params.get('number') || '';
    const type = params.get('type') || 'trivia';

    const { data, error, isLoading } = useQuery(
        ['numberInfo', number, type],
        () => fetchNumberInfo(number, type)
    );

    if (isLoading) return <LoadingOverlay visible={true} />;
    if (error)
        return (
            <Notification color="red" >
                Произошла ошибка при загрузке данных
            </Notification>
        );

    return (
        <div style={{ maxWidth: 600, margin: '50px auto' }}>
            <h1>Интересный факт о числе</h1>
            <p>
                <strong>Число:</strong> {number || 'Рандомное'}
            </p>
            <p>
                <strong>Тип информации:</strong> {type}
            </p>
            <p>{data}</p>

            <Button onClick={() => navigate('/')} style={{ marginTop: 20 }}>
                Вернуться назад
            </Button>
        </div>
    );
};

export default Results;
