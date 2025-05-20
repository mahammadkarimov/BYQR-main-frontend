import React from 'react'
import styles from '../AdminCategoryTable/admincategorytable.module.css'

const AdminCategoryItem = ({ categoryData }) => {
    return (
        <tr className={styles["table-row"]}>
            <td>
                <span>12392</span>
            </td>
            <td className="flex justify-center mx-auto w-1/2">
                test
            </td>
            <td>test</td>
            <td>test</td>
            <td>
                <button
                    className="mr-4"
                >
                    edit
                </button>
                <button>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default AdminCategoryItem