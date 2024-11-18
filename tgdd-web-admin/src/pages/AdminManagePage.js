import { useEffect, useState } from 'react';
import { Image, Table } from 'antd';
import ActiveToggle from '~/components/Buttons/ActiveToggle';
import ActionURDButton from '~/components/Buttons/ActionURDButton';
import RoleCard from '~/components/Cards/RoleCard';
import { useDispatch } from 'react-redux';
import { getAllaAdminAPI } from '~/services/adminManageService';

const AdminManagerPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllaAdminAPI({ currentPage,limit })).then((res) => {
      const { data, pagination } = res.payload;
      setData(data);
      setTotalRecord(pagination.totalRecords);
    });
  }, [currentPage]);

  const handleTableChange = (pagination) => {
    console.log('pagination', pagination);

    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      width: 70,
      render: (text, record, index) => `${10 * (currentPage - 1) + index + 1}`,
      // showSorterTooltip: {
      //   target: 'full-header',
      // },
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      //   {
      //     text: 'Submenu',
      //     value: 'Submenu',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //onFilter: (value, record) => record.name.indexOf(value) === 0,
      //sorter: (a, b) => a.name.length - b.name.length,
      //sortDirections: ['descend'],
    },
    {
      title: 'Họ Tên',
      dataIndex: 'username',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'image',
      render: (text, record) => <Image width={50} src={text} />,
      // filters: [
      //   {
      //     text: 'London',
      //     value: 'London',
      //   },
      //   {
      //     text: 'New York',
      //     value: 'New York',
      //   },
      // ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Quyền',
      dataIndex: 'roles',
      render: (roles) => (
        <div style={{ display: 'flex', maxWidth: 200, flexWrap: 'wrap' }}>
          {roles.map((role) => (
            <RoleCard role={role} />
          ))}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      render: (isActive) => <ActiveToggle isActive={isActive} />,
      filters: [
        {
          text: 'Hoaạt động',
          value: true,
        },
        {
          text: 'Khóa',
          value: false,
        },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (text, record) => (
        <div>
          <ActionURDButton type={'r'} /> <ActionURDButton type={'u'} /> <ActionURDButton type={'d'} />{' '}
        </div>
      ),
    },
  ];
  return (
    <Table
      scroll={{ y: 'calc(100vh - 200px)' }}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: limit, total: totalRecord, pageSizeOptions: [10, 20, 30] }}
      sortDirections={['descend']}
      onChange={handleTableChange}
    />
  );
};

export default AdminManagerPage;
