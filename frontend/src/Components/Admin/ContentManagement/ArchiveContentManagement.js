import React from "react";
import ArchiveContentManagementSection from "./ArchiveContentManagementSection";

const ArchiveContentManagement = ({csrfToken}) => {
    return (
        <ArchiveContentManagementSection csrfToken={csrfToken}/>
    )
}
export default ArchiveContentManagement;