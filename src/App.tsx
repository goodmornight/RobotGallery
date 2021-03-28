import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
// import './App.css';
import styles from './App.module.css';
// import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import RobotDiscount from './components/RobotDiscount';
import ShoppingCart from './components/ShoppingCart';

interface Props {

}

interface State {
  robotGallery: any[]
  count: number
}

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(()=>{
    document.title = `点击${count}次`
  },[count]);

  useEffect(()=>{
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setRobotGallery(data);
      } catch(e) {
        setError(e.message);
      }
        setLoading(false);
    }
    fetchData();
  },[]);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo"/>
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <button onClick={()=>{
        setCount(count+1)
      }}>
        count: {count}
      </button>
      <ShoppingCart />
      { error && <div>网站出错：{error}</div> }
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map( (r, index) => 
            index % 2 === 0 ? (
              <RobotDiscount id={r.id} email={r.email} name={r.name}/>
            ):(
              <Robot id={r.id} email={r.email} name={r.name}/>
            ) )}
        </div>
      ) : (
        <h1>正在加载...</h1>
      )
      }
    </div>
  );
  
}

export default App;
