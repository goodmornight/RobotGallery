import React from 'react';
import styles from './Robot.module.css';

interface Robotprops {
    id: number,
    name: string,
    email: string
}

const Robot: React.FC<Robotprops> = ({ id, name, email }) => {
    return (
        <div className={styles.cardContainer}>
            <img src={`https://robohash.org/${id}`} alt="robot"/>
            <h2>{ name }</h2>
            <p>{ email }</p>
        </div>
    );
}

export default Robot;