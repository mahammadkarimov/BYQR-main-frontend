'use client'

import React, { useState } from 'react'
import styles from './style.module.css'
import Image from 'next/image'

const CustomerTable = () => {
  const [pageSize, setPageSize] = useState(25)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [openDropdowns, setOpenDropdowns] = useState({
    customers: true,
    cards: false,
    analytics: false,
    segmentation: false,
    integration: false
  })

  // Function to handle dropdown toggling
  const toggleDropdown = (menuName) => {
    setOpenDropdowns(prev => {
      const newState = {
        ...prev,
        [menuName]: !prev[menuName]
      }
      return newState
    })
  }

  // Sample customer data
  const customers = [
    {
      id: '1234567',
      device: 'apple',
      test: 'Test',
      cardNumber: '0000001',
      ownerFirstName: 'Abdullayev',
      ownerLastName: 'Sinan',
      phoneNumber: '+994 50 602 80 41',
      discount: '%5',
      bonuses: '0',
      orderInvoice: null,
      orderDate: '15.51 / 08.03.2025'
    },
    {
      id: '1234567',
      device: 'apple',
      test: 'Test',
      cardNumber: '0000001',
      ownerFirstName: 'Abdullayev',
      ownerLastName: 'Sinan',
      phoneNumber: '+994 50 602 80 41',
      discount: '%5',
      bonuses: '0',
      orderInvoice: null,
      orderDate: '15.51 / 08.03.2025'
    },
    {
      id: '1234567',
      device: 'android',
      test: 'Test',
      cardNumber: '0000001',
      ownerFirstName: 'Abdullayev',
      ownerLastName: 'Sinan',
      phoneNumber: '+994 50 602 80 41',
      discount: '%5',
      bonuses: '0',
      orderInvoice: null,
      orderDate: '15.51 / 08.03.2025'
    }
  ]

  return (
    <div className={styles.container}>
      {/* Top menu */}
      <header className={styles.header}>
        <div
          className={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className={styles.hamburger}></span>
        </div>
        <div className={styles.logo}>
          <Image
            src='/byok-logo.svg'
            alt='BYOK Logo'
            width={40}
            height={40}
            priority
          />
        </div>
        <div className={styles.userProfile}>
          <Image
            src='/user-profile.svg'
            alt='Profile'
            width={40}
            height={40}
            className={styles.userAvatar}
          />
        </div>
      </header>

      {/* Main content */}
      <div
        className={`${styles.content} ${
          sidebarOpen ? '' : styles.contentExpanded
        }`}
      >
        {/* Sidebar */}
        <nav
          className={`${styles.sidebar} ${
            sidebarOpen ? '' : styles.sidebarClosed
          }`}
        >
          <ul className={styles.sidebarMenu}>
            <li className={styles.sidebarHeader}>
              <span className={styles.dashboardIcon}></span>
              Dashboard
            </li>

            <li
              className={styles.sidebarItem}
              onClick={() => toggleDropdown('customers')}
            >
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/user-icon.svg'
                  alt='Customers'
                  width={20}
                  height={20}
                />
                <span>Customers</span>
              </div>
              <span
                className={`${styles.dropdownArrow} ${
                  openDropdowns.customers ? styles.open : ''
                }`}
              >
                &#9662;
              </span>
            </li>

            {openDropdowns.customers && (
              <>
                <li className={`${styles.subMenuItem} ${styles.active}`}>
                  <span>Customers and posts</span>
                </li>

                <li className={styles.subMenuItem}>
                  <span>Team</span>
                </li>
              </>
            )}

            <li
              className={styles.sidebarItem}
              onClick={() => toggleDropdown('cards')}
            >
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/card-icon.svg'
                  alt='Card Distribution'
                  width={20}
                  height={20}
                />
                <span>Card Distribution</span>
              </div>
              <span
                className={`${styles.dropdownArrow} ${
                  openDropdowns.cards ? styles.open : ''
                }`}
              >
                &#9662;
              </span>
            </li>

            {openDropdowns.cards && (
              <>
                <li className={styles.subMenuItem}>
                  <span>Bonus</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Coupons</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Telegram</span>
                </li>
              </>
            )}

            <li
              className={styles.sidebarItem}
              onClick={() => toggleDropdown('analytics')}
            >
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/analytics-icon.svg'
                  alt='Analytics'
                  width={20}
                  height={20}
                />
                <span>Analytics</span>
              </div>
              <span
                className={`${styles.dropdownArrow} ${
                  openDropdowns.analytics ? styles.open : ''
                }`}
              >
                &#9662;
              </span>
            </li>

            {openDropdowns.analytics && (
              <>
                <li className={styles.subMenuItem}>
                  <span>Reports</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Statistics</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Operations</span>
                </li>
              </>
            )}

            <li
              className={styles.sidebarItem}
              onClick={() => toggleDropdown('segmentation')}
            >
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/segment-icon.svg'
                  alt='Segmentation'
                  width={20}
                  height={20}
                />
                <span>Segmentation</span>
              </div>
              <span
                className={`${styles.dropdownArrow} ${
                  openDropdowns.segmentation ? styles.open : ''
                }`}
              >
                &#9662;
              </span>
            </li>

            {openDropdowns.segmentation && (
              <>
                <li className={styles.subMenuItem}>
                  <span>RFM analysis</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Manual segments</span>
                </li>
              </>
            )}

            <li className={styles.sidebarItem}>
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/notification-icon.svg'
                  alt='Triggers'
                  width={20}
                  height={20}
                />
                <span>Triggers</span>
              </div>
            </li>

            <li
              className={styles.sidebarItem}
              onClick={() => toggleDropdown('integration')}
            >
              <div className={styles.menuItemWithIcon}>
                <Image
                  src='/integration-icon.svg'
                  alt='Integration'
                  width={20}
                  height={20}
                />
                <span>Integration</span>
              </div>
              <span
                className={`${styles.dropdownArrow} ${
                  openDropdowns.integration ? styles.open : ''
                }`}
              >
                &#9662;
              </span>
            </li>

            {openDropdowns.integration && (
              <>
                <li className={styles.subMenuItem}>
                  <span>API Integration</span>
                </li>
                <li className={styles.subMenuItem}>
                  <span>Other Services</span>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Main content area */}
        <main className={styles.mainContent}>
          {/* Tab menu */}
          <div className={styles.tabMenu}>
            <div className={`${styles.tab} ${styles.activeTab}`}>
              Customers and posts
            </div>
            <div className={styles.tab}>Post list settings</div>
            <div className={styles.tab}>Post team</div>
          </div>

          {/* Search and filters */}
          <div className={styles.searchArea}>
            <div className={styles.searchInput}>
              <input type='text' placeholder='Search' />
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.filterButton}>
                <Image
                  src='/filter-icon.svg'
                  alt='Filters'
                  width={20}
                  height={20}
                />
                <span>Customer filters</span>
              </button>

              <button className={styles.actionButton}>
                <Image
                  src='/announcement-icon.svg'
                  alt='News Bulletin'
                  width={20}
                  height={20}
                />
                <span>News Bulletin</span>
              </button>

              <button className={styles.actionButton}>
                <Image
                  src='/activity-icon.svg'
                  alt='Actions'
                  width={20}
                  height={20}
                />
                <span>Actions</span>
              </button>

              <button className={styles.settingsButton}>
                <Image
                  src='/settings-icon.svg'
                  alt='Settings'
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>
                    <input type='checkbox' className={styles.checkbox} />
                  </th>
                  <th>ID</th>
                  <th>Device</th>
                  <th>Card number</th>
                  <th>Owner's last name</th>
                  <th>Owner's first name</th>
                  <th>Phone number</th>
                  <th>Discount</th>
                  <th>Bonuses</th>
                  <th>Average invoice</th>
                  <th>Purchase date</th>
                  <th>Link to everything</th>
                  <th>Creation date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>
                      <input type='checkbox' className={styles.checkbox} />
                    </td>
                    <td>{customer.id}</td>
                    <td>
                      {customer.device === 'apple' ? (
                        <Image
                          src='/apple-icon.png'
                          alt='Apple'
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Image
                          src='/android-icon.png'
                          alt='Android'
                          width={20}
                          height={20}
                        />
                      )}
                    </td>
                    <td>{customer.cardNumber}</td>
                    <td>{customer.ownerFirstName}</td>
                    <td>{customer.ownerLastName}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.discount}</td>
                    <td>{customer.bonuses}</td>
                    <td>0</td>
                    <td>
                      <button className={styles.downloadButton}>
                        <Image
                          src='/download-icon.svg'
                          alt='Download'
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                    <td>{customer.orderDate}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='8'>Total:</td>
                  <td>0</td>
                  <td>0</td>
                  <td colSpan='3'></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              <span>Items per page:</span>
              <select
                value={pageSize}
                onChange={e => setPageSize(parseInt(e.target.value))}
                className={styles.pageSize}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
              <span>0/0</span>
            </div>
            <div className={styles.paginationControls}>
              <button className={styles.pageButton} disabled>
                <span>&lt;</span>
              </button>
              <button className={styles.pageButton} disabled>
                <span>&gt;</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CustomerTable