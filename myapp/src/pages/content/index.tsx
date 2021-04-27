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
  
let dataBase: User[] = [];

export default function Content(props: {query: string}) {

    const [data, setData] = useState(dataBase);
    const [del, setDel] = useState(false);
    const [query, setQuery] = useState(-1);
    const [status, setStatus] = useState(-1);
    const [axiosQuery, setAxiosQuery] = useState(false);
    const [update, setUpdate] = useState(0);

    const queryFunc = (record: {id : number, status: number}) => {
        setQuery(record.id)
        setStatus(record.status !== 1 ? 1 : 0)
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
                    {record.status === 1 ? <button onClick={() => queryFunc(record)}>代办</button> : <button onClick={() => queryFunc(record)}>完成</button>}
                    <button onClick={() => {
                        setQuery(record.id);
                        setUpdate(update + 1);
                    }}>编辑</button>
                    <button 
                        onClick={() => {
                            setQuery(record.id)
                            setDel(!del)
                        }}
                    >
                        删除
                    </button>
                </>
                )
            }
        },
    ];

    useEffect(() => {
        if (status !== -1) {
            axios({
                method: 'post',
                url: `/listupdatestatus`,
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                data: JSON.stringify({
                    id: query,
                    status
                })
            }).then(() => {
                setAxiosQuery(!axiosQuery)
                setStatus(-1)
            })
        }
    },[status])

    useEffect(() => {
        axios({
            method: 'post',
            url: '/listupdate',
            headers: { 'content-type': 'application/json;charset=UTF-8' },
            data: JSON.stringify({
              id: query,
              name: 'axios',
              deadline: '2022-02-02',
              content: `内容修改${update}`
            })
        }).then(() => {
            setAxiosQuery(!axiosQuery)
        })
      }, [update]);

    useEffect(() => {
        if (query !== -1) {
            axios({
                method: 'post',
                url: '/book', //`/listDelete`,
                headers: { 'content-type': 'application/json;charset=UTF-8' },
                data: JSON.stringify({
                  id: query
                })
            }).then(() => {
                setAxiosQuery(!axiosQuery)
            })
        }
    },[del])

    useEffect(() => {
        axios.get('/list/2/1').then((res: Res) => {
            setData(res.data.list.rows)
        })
    },[props.query, axiosQuery]);
    
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
  