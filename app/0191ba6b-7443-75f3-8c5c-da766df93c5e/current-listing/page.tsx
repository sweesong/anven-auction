'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Table, Input, Dropdown, Menu, Button, Space, MenuProps, message, Popover, DatePicker } from 'antd';
import { Tabs, Tab } from "@nextui-org/tabs";
import type { ColumnsType } from 'antd/es/table';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { CalendarIcon, CircleIcon, RefreshCwIcon, ShieldAlertIcon, TriangleAlertIcon, TriangleIcon, Undo } from 'lucide-react';
import { formatDateToStr2, parseDate } from '@/lib/utils';
import { Button as NextButton } from '@nextui-org/button';
import WithAuth from "@/components/withauth";
import { Dayjs } from 'dayjs';

// Define the data structure for the table
interface Listing {
    id: number;
    auction_date: string | null;
    unitno: string;
    address: string;
    city: string;
    priority: number; // Now priority is a number
}

const items: MenuProps['items'] = [
    {
        label: 'View',
        key: '1',
        //icon: <UserOutlined />,
    },
    {
        label: 'Publish',
        key: '2',
        //icon: <UserOutlined />,
    },
    {
        label: 'Close',
        key: '3',
        //icon: <UserOutlined />,
        danger: true,
    },
];

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const menuProps = {
    items,
    onClick: handleMenuClick,
};

// Define the columns for the table
const columns: ColumnsType<Listing> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: "80px",
        fixed: 'left',
    },
    {
        title: 'Auction Date',
        dataIndex: 'auction_date',
        key: 'auction_date',
        width: "120px",
    },
    {
        title: 'Unit No',
        dataIndex: 'unitno',
        key: 'unitno',
        width: "100px",
        ellipsis: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: "400px",
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        width: "200px",
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: "100px",
        sorter: (a, b) => {
            const priorityOrder: any = { 'High': 1, 'Medium': 2, 'Normal': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        },
        render: (priority) => {
            switch (priority) {
                case 1:
                    return (
                        <>
                            <ShieldAlertIcon style={{ color: 'darkred', marginRight: 5 }} />
                            Urgent
                        </>
                    );
                case 2:
                    return (
                        <>
                            <ArrowUpOutlined style={{ color: 'red', marginRight: 5 }} />
                            High
                        </>
                    );
                case 0:
                case 3:
                    return (
                        <>
                            <ArrowDownOutlined style={{ color: 'green', marginRight: 5 }} />
                            Normal
                        </>
                    );
                default:
                    return 'Unknown';
            }
        },
    },
    {
        title: 'Action',
        key: 'action',
        width: "80px",
        fixed: 'right',
        render: (_, record) => (
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        ...
                    </Space>
                </Button>
            </Dropdown>
        )
    }
];


const CurrentListing = () => {

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    //Toggle Button State
    const [isUrgentToggle, setIsUrgentToggle] = useState(false);
    const [isHighToggle, setIsHighToggle] = useState(false);
    const [isMediumToggle, setIsMediumToggle] = useState(false);
    const [isNormalToggle, setIsNormalToggle] = useState(false);
    const [isExpiredToggle, setIsExpiredToggle] = useState(true);
    const [isNonExpiredToggle, setIsNonExpiredToggle] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // New state for selected date
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // State for date picker visibility


    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] = useState('');

    const [fullListing, setFullListing] = useState<Listing[]>();
    const [filteredData, setFilteredData] = useState<Listing[]>();
    const [resultData, setResultData] = useState<Listing[]>();

    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/get-current-listing');
            const data: Listing[] = await response.json();

            // Filter data to include only those where auction_date <= today
            const today = new Date();
            const filteredData = data.filter(item => {
                if (item.auction_date) {
                    const auctionDate = parseDate(item.auction_date);
                    return auctionDate && auctionDate <= today;
                }
                return false;
            });

            setFullListing(data);
            setFilteredData(filteredData);
            setResultData(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters(); // Re-apply filters when toggles change
    }, [isUrgentToggle, isHighToggle, isMediumToggle, isNormalToggle, isExpiredToggle, isNonExpiredToggle, selectedDate]);

    const handleRefreshListing = () => {
        fetchData();
        applyFilters();
    }

    const applyFilters = () => {

        let filtered = fullListing

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (!isExpiredToggle && !isNonExpiredToggle) {
            filtered = undefined;
        }

        if (isExpiredToggle && !isNonExpiredToggle) {
            filtered = filtered?.filter(item => {
                if (item.auction_date) {
                    const auctionDate = parseDate(item.auction_date);
                    return auctionDate && auctionDate <= today;
                }
                return false;
            });
        }

        if (!isExpiredToggle && isNonExpiredToggle) {
            filtered = filtered?.filter(item => {
                if (item.auction_date) {
                    const auctionDate = parseDate(item.auction_date);
                    return auctionDate && auctionDate > today;
                }
                return false;
            });
        }

        if (selectedDate) {
            filtered = filtered?.filter(item => {
                if (item.auction_date) {
                    const auctionDate = formatDateToStr2(parseDate(item.auction_date));
                    return auctionDate === selectedDate.format("DD-MM-YYYY");
                }
                return false;
            });
        }

        // Apply priority filters
        if (isUrgentToggle) {
            filtered = filtered?.filter(item => item.priority === 1);
        }

        if (isHighToggle) {
            filtered = filtered?.filter(item => item.priority === 2);
        }

        if (isMediumToggle) {
            filtered = filtered?.filter(item => item.priority === 3);
        }

        if (isNormalToggle) {
            filtered = filtered?.filter(item => item.priority === 4);
        }

        setFilteredData(filtered);
        setResultData(filtered);
        resetToFirstPage();
    };


    const handlePriorityFilter = (priority: number) => {

        if (priority == 1)
            setIsUrgentToggle(prevState => !prevState);

        if (priority == 2)
            setIsHighToggle(prevState => !prevState);

        if (priority == 3)
            setIsMediumToggle(prevState => !prevState);

        if (priority == 4)
            setIsNormalToggle(prevState => !prevState);
    };

    const handleExpiredFilter = (expired: number) => {

        if (expired == 1)
            setIsExpiredToggle(prevState => !prevState);

        if (expired == 2)
            setIsNonExpiredToggle(prevState => !prevState);
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current); // Track current page changes
    };

    const resetToFirstPage = () => {
        setCurrentPage(1); // Reset to page 1
    };


    /* const handleDayFilter = (day: number) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let filtered;

        if (day === 1) {
            // Toggle today filter
            setIsTodayToggle(prevState => !prevState);
            if (!isTodayToggle) {
                filtered = fullListing?.filter(item => {
                    if (item.auction_date) {
                        const auctionDate = parseDate(item.auction_date);
                        return auctionDate?.toDateString() === today.toDateString();
                    }
                    return false;
                });
            } else {
                filtered = fullListing;
            }
        }

        if (day === 2) {
            // Toggle yesterday filter
            setIsYdayToggle(prevState => !prevState);
            if (!isYdayToggle) {
                filtered = fullListing?.filter(item => {
                    if (item.auction_date) {
                        const auctionDate = parseDate(item.auction_date);
                        return auctionDate?.toDateString() === yesterday.toDateString();
                    }
                    return false;
                });
            } else {
                filtered = fullListing;
            }
        }

        setSelectedDate(null);
        setFilteredData(filtered);
    }; */

    const handleDatePickerChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        setIsDatePickerVisible(false); // Hide date picker after selection
    };

    const handleResetFilter = () => {

        // Filter data to include only those where auction_date <= today
        const today = new Date();
        const filteredData = fullListing?.filter(item => {
            if (item.auction_date) {
                const auctionDate = parseDate(item.auction_date);
                return auctionDate && auctionDate <= today;
            }
            return false;
        });

        setFilteredData(filteredData); // Reset to expired list
        setIsUrgentToggle(false);
        setIsHighToggle(false);
        setIsMediumToggle(false);
        setIsNormalToggle(false);
        setIsExpiredToggle(true);
        setIsNonExpiredToggle(false);
        setSelectedDate(null);
    };

    // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        // Clear any existing timeout to avoid instant search
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout to delay the filtering action
        debounceTimeout.current = setTimeout(() => {
            const data = filteredData;

            const filtered = data?.filter((item) =>
                item.address.toLowerCase().includes(value)
            );
            setResultData(filtered);
        }, 500); // 500ms delay before search action
    };

    return (
        <div className='flex flex-col gap-2'>
            <span className="text-2xl mb-5">Manage Current Listing</span>
            <div className='flex flex-row gap-2 mb-3'>
                <NextButton
                    color="primary"
                    variant={isExpiredToggle ? "solid" : "faded"}
                    onPress={() => handleExpiredFilter(1)}
                >
                    Expired Listing
                </NextButton>
                <NextButton
                    color="primary"
                    variant={isNonExpiredToggle ? "solid" : "faded"}
                    onPress={() => handleExpiredFilter(2)}
                >
                    Non-Expired Listing
                </NextButton>
            </div>
            <div className='flex flex-row justify-between'>
                {/* Search input */}
                <div className='flex flex-row gap-2'>
                    <Input
                        placeholder="Filter address by text ..."
                        value={searchText}
                        onChange={handleSearch}
                        style={{ marginBottom: 16, width: 300 }}
                    />
                    {/* Priority Filter Buttons */}
                    <NextButton
                        size='sm'
                        color="danger"
                        variant={isUrgentToggle ? "solid" : "faded"}
                        endContent={<ShieldAlertIcon />}
                        title="Urgent Priority"
                        onPress={() => handlePriorityFilter(1)}
                        isIconOnly />
                    <NextButton
                        size='sm'
                        color="primary"
                        variant={isHighToggle ? "solid" : "faded"}
                        endContent={<TriangleAlertIcon />}
                        title="High Priority"
                        onPress={() => handlePriorityFilter(2)}
                        isIconOnly />
                    <NextButton
                        size='sm'
                        color="primary"
                        variant={isMediumToggle ? "solid" : "faded"}
                        endContent={<TriangleIcon />}
                        title="Medium Priority"
                        onPress={() => handlePriorityFilter(3)}
                        isIconOnly />
                    <NextButton
                        size='sm'
                        color="primary"
                        variant={isNormalToggle ? "solid" : "faded"}
                        endContent={<CircleIcon />}
                        title="Normal Priority"
                        onPress={() => handlePriorityFilter(4)}
                        isIconOnly />
                    <Popover
                        content={
                            <DatePicker
                                //value={selectedDate ? selectedDate.format("YYYY-MM-DD") : null}
                                onChange={handleDatePickerChange}
                            />
                        }
                        trigger="click"
                        open={isDatePickerVisible}
                        onOpenChange={() => setIsDatePickerVisible(!isDatePickerVisible)}
                        placement="bottom"
                    >
                        <Button
                            icon={<CalendarIcon />}
                            type={selectedDate ? 'primary' : 'default'}
                        >
                            {selectedDate ? selectedDate.format("YYYY-MM-DD") : 'Select Date'}
                        </Button>
                    </Popover>
                    <NextButton
                        size='sm'
                        variant="solid"
                        endContent={<Undo />}
                        onPress={() => handleResetFilter()}
                        isIconOnly
                        title="Reset"
                    />
                </div>
                <div>
                    <NextButton
                        size='sm'
                        variant='bordered'
                        isIconOnly
                        endContent={<RefreshCwIcon />}
                        disabled={isLoading ? false : true}
                        title="Refresh Listing"
                        onPress={handleRefreshListing}
                    />
                </div>
            </div>

            {/* Table */}
            <Table
                dataSource={resultData}
                columns={columns}
                rowKey="id"
                pagination={{ position: ['bottomRight'], pageSize: 100, current: currentPage }}
                size='small'
                loading={isLoading}
                scroll={{ y: 400, x: 1300 }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default WithAuth(CurrentListing);