import React from 'react';
import m from "./TableTitle.module.css";

const TableTitle = () => {
    return (
        <div className={m.tableTitle}>
            <div className={m.columnNames} style={{width: "175px"}}>Name</div>
            <div className={m.columnNames} style={{justifyContent: "center", width: "80px"}}>Cards</div>
            <div className={m.columnNames} style={{justifyContent: "center"}}>Last Updated</div>
            <div className={m.columnNames} style={{justifyContent: "center"}}>Created</div>
            <div className={m.columnNames}>Actions</div>
        </div>
    );
};

export default TableTitle;