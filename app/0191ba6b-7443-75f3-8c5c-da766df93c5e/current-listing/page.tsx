'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Table, Input, Dropdown, Button, Space, MenuProps, message, Popover, DatePicker, Modal, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { CalendarIcon, CircleIcon, RefreshCwIcon, ShieldAlertIcon, TriangleAlertIcon, TriangleIcon, Undo } from 'lucide-react';
import { formatDateToStr2, parseDate } from '@/lib/utils';
import { Button as NextButton } from '@nextui-org/button';
import WithAuth from "@/components/withauth";
import dayjs, { Dayjs } from 'dayjs';
import { Link } from '@nextui-org/link';

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

function filterExpiredListing(data: any) {
    //get only today and before listing
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredData = data.filter((item: { auction_date: string; }) => {
        if (item.auction_date) {
            const auctionDate = parseDate(item.auction_date);

            auctionDate.setHours(0, 0, 0, 0);

            return auctionDate && auctionDate <= today;
        }
        return false;
    });

    return filteredData;
}


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

    const [selectedListing, setSelectedListing] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

            const filteredData = filterExpiredListing(data);

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
        resetToggleState();
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
            if (filtered)
                filtered = filterExpiredListing(filtered);
        }

        if (!isExpiredToggle && isNonExpiredToggle) {
            if (filtered)
                filtered = filterExpiredListing(filtered);
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

        let mergedList: any[] = [];
        let urgentList = null;
        let highList = null;
        let mediumList = null;
        let normalList = null;

        // Apply priority filters
        let priorityValues: number[] = [];

        if (isUrgentToggle) {
            priorityValues.push(1);
        }

        if (isHighToggle) {
            priorityValues.push(2);
        }

        if (isMediumToggle) {
            priorityValues.push(3);
        }

        if (isNormalToggle) {
            priorityValues.push(4);
        }

        if (priorityValues.length > 0)
            filtered = filtered?.filter(item => priorityValues.includes(item.priority));

        if(searchText)
            filtered = filtered?.filter(item => item.address.toLowerCase().includes(searchText));

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

    const resetToggleState = () => {
        setFilteredData(filteredData); // Reset to expired list
        setIsUrgentToggle(false);
        setIsHighToggle(false);
        setIsMediumToggle(false);
        setIsNormalToggle(false);
        setIsExpiredToggle(true);
        setIsNonExpiredToggle(false);
        setSelectedDate(null);
    }

    const handleResetFilter = () => {
        const filteredData = filterExpiredListing(fullListing);
        resetToggleState();
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

    const handleViewOk = () => {
        setIsModalVisible(false);
      };

    const handleViewOpen = (record: any) => {
        setSelectedListing(record);  // Set the selected record
        setIsModalVisible(true);     // Open the modal
    };
    
    const handleViewClose = () => {
        setIsModalVisible(false);
        setSelectedListing(null);    // Reset the selected record
    };

    const getMenuItems = (record: any): MenuProps['items'] => [
        {
            key: 'view',
            label: 'View',
            onClick: () => handleViewOpen(record),  // When clicked, it will open the modal
        },
        {
            key: 'publish',
            label: 'Publish',
            //onClick: () => handleView(record),  // When clicked, it will open the modal
        },
        // Add more items here if needed
    ];

    // Define the columns for the table
    const columns: ColumnsType<Listing> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "80px",
            fixed: 'left',
            sorter: (a, b) => a.id - b.id,
            render: (id: number, record: Listing) => (
                <Tooltip title="click to view details">
                  <Link 
                    isBlock
                    size='sm'
                    color="foreground"
                    underline="always"
                    onClick={() => handleViewOpen(record)}
                  >
                    {id}
                  </Link>
                  </Tooltip>
              ),
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
            title: 'Reserve Price',
            dataIndex: 'reserve_price',
            key: 'reserve_price',
            width: "120px",
            onCell: () => ({
                style: { textAlign: 'right' },  // Align content to the right
              }),
            render: (reserve_price) => {
                return "RM " + reserve_price.toLocaleString('en-US')
            }
        },
        {
            title: 'Estimate Price',
            dataIndex: 'estimate_price',
            key: 'estimate_price',
            width: "120px",
            onCell: () => ({
                style: { textAlign: 'right' },  // Align content to the right
              }),
            render: (estimate_price) => {
                return estimate_price?"RM " + estimate_price.toLocaleString('en-US'):""
            }
        },
        {
            title: 'Size (Sqft)',
            dataIndex: 'size',
            key: 'size',
            width: "100px",
            onCell: () => ({
                style: { textAlign: 'right' },  // Align content to the right
              }),
            render: (size) => {
                return size?size.toLocaleString('en-US'):""
            }
        },
        {
            title: 'Tenure',
            dataIndex: 'tenure',
            key: 'tenure',
            width: "100px",
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: "100px",
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
                    case 3:
                        return (
                            <>
                                <ArrowDownOutlined style={{ color: 'green', marginRight: 5 }} />
                                Medium
                            </>
                        );
                    case 4:
                        return (
                            <>
                                <ArrowDownOutlined style={{ color: 'green', marginRight: 5 }} />
                                Normal
                            </>
                        );
                    default:
                        return 'None';
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: "80px",
            fixed: 'right',
            render: (_, record) => (
                <div>
                <Dropdown menu={{ items: getMenuItems(record) }}>
                    <Button>
                        <Space>
                            ...
                        </Space>
                    </Button>
                </Dropdown>
                </div>
            )
        }
    ];

    return (
        <>
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
            <Modal 
                title="Listing Details"
                open={isModalVisible}
                onCancel={handleViewClose}
                onOk={handleViewOk}
                >
                {selectedListing && (
                    <div>
                    <p><strong>ID:</strong> {selectedListing.id}</p>
                    <p><strong>Legacy ID:</strong> {selectedListing.legacy_id}</p>
                    <p><strong>Priority:</strong> {selectedListing.priority}</p>
                    <p><strong>Title:</strong> {selectedListing.title}</p>
                    <p><strong>Auction Date:</strong> {selectedListing.auction_date ? selectedListing.auction_date : 'N/A'}</p>
                    <p><strong>Estimated Date:</strong> {selectedListing.is_est_date ? 'Yes' : 'No'}</p>
                    <p><strong>City:</strong> {selectedListing.city}</p>
                    <p><strong>Unit No:</strong> {selectedListing.unitno}</p>
                    <p><strong>Address:</strong> {selectedListing.address}</p>
                    <p><strong>Reserve Price:</strong> {selectedListing.reserve_price ? `RM ${selectedListing.reserve_price.toFixed(0)}` : 'N/A'}</p>
                    <p><strong>Estimate Price:</strong> {selectedListing.estimate_price ? `RM ${selectedListing.estimate_price.toFixed(0)}` : 'N/A'}</p>
                    <p><strong>Size:</strong> {selectedListing.size ? `${selectedListing.size} sqft` : 'N/A'}</p>
                    <p><strong>Type:</strong> {selectedListing.type}</p>
                    <p><strong>Tenure:</strong> {selectedListing.tenure}</p>
                    <p><strong>Extra Info:</strong> {selectedListing.extra_info}</p>
                    <p><strong>Bank:</strong> {selectedListing.bank}</p>
                    <p><strong>Auction Type:</strong> {selectedListing.auction_type}</p>
                    <p><strong>Owner:</strong> {selectedListing.owner}</p>
                    <p><strong>Auctioneer:</strong> {selectedListing.auctioner}</p>
                    <p><strong>Auctioneer No:</strong> {selectedListing.auctioner_no}</p>
                    <p><strong>Remarks:</strong> {selectedListing.remarks}</p>
                    <p><strong>IPRO:</strong> {selectedListing.ipro ? 'Yes' : 'No'}</p>
                    <p><strong>EP:</strong> {selectedListing.ep ? 'Yes' : 'No'}</p>
                    <p><strong>PG:</strong> {selectedListing.pg}</p>
                    <p><strong>Created At:</strong> {dayjs(selectedListing.createdAt).format('DD-MM-YYYY')}</p>
                    <p><strong>Updated At:</strong> {selectedListing.updatedAt ? dayjs(selectedListing.updatedAt).format('DD-MM-YYYY') : 'N/A'}</p>
                  </div>
                )}
            </Modal>
        </>
    );
};

export default WithAuth(CurrentListing);