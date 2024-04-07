import CreateItemTypeForm from "@/components/form/CreateItemTypeForm";
import { DeleteItemType } from "@/components/form/DeleteItemType";
import { EditItemType } from "@/components/form/EditItemType";
import React from "react";

function itemType() {
  return (
    <div>
      <CreateItemTypeForm />
      <EditItemType />
      <DeleteItemType />
    </div>
  );
}

export default itemType;
