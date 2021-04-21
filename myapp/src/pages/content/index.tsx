import { Table, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    deadline: string;
    content: string;
    status: number;
}

interface ResInfo {
    count: number;
    rows: User[];
}

interface Res {
    data: {
        list: ResInfo;
        message: string;
    }
}

const columns: ColumnsType<User> = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
    },
    {
        key: 'name',
        title: '名称',
        dataIndex: 'name',
    },
    {
        key: 'deadline',
        title: '截止日期',
        dataIndex: 'deadline',
    },
    {
        key: 'content',
        title: '内容',
        dataIndex: 'content',
    },
    {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        render: (text) => {
            if (text === 1) {
                return '完成'
            } else {
                return '代办'
            }
        }
    },
    {
        title: '操作',
        render: (text, record) => {
            return (
            <>
                {record.status === 1 ? <button>代办</button> : <button>完成</button>}
                <button>编辑</button>
                <button>删除</button>
            </>
            )
        }
    },
];
  
let dataBase: User[] = [];

export default function Content(props: {query: string}) {
    
    const [data, setData] = useState(dataBase);
    
    useEffect(() => {
        axios.get('/list/1/1').then((res: Res) => {
            setData(res.data.list.rows)
        })
    },[props.query]);
      
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
  