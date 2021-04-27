import styles from './index.less';
import Content from './content';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function IndexPage() {

  const [query, setQuery] = useState('0');
  const [number, setNumber] = useState(0)

  useEffect(() => {
    let ignore = false; // 处理无序的响应
    async function fetchData() {
      const result = await axios({
        method: 'post',
        url: '/create',
        headers: { 'content-type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          name: 'axios',
          deadline: '2022-02-02',
          content: `内容新建${number}`
        })
      });
      if (!ignore) setQuery('0');
    }
    if (query !== '0') {
      fetchData();
      let count = number + 1
      setNumber(count)
    }
    return () => { ignore = true; } 
  }, [query]);

  return (
    <div>
      <h1 className={styles.title}>nodejs全栈</h1>
      <button onClick={() => setQuery('1')}>新增</button>
      <Content query={query}/>
    </div>
  );
}
