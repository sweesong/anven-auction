'use client'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'upload',
        label: (
            <a href="/0191ba6b-7443-75f3-8c5c-da766df93c5e/upload">
                Upload Listing File
            </a>
        ),
    },
    {
        key: 'check',
        label: (
            <a href="/0191ba6b-7443-75f3-8c5c-da766df93c5e/check">
                Check Import Data
            </a>
        ),
    },
];

export default function MenuDashboard({ menu }: { menu: string }) {

    const router = useRouter();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return (
        <Menu onClick={onClick} selectedKeys={[menu]} mode="horizontal" items={items} />
    );
}