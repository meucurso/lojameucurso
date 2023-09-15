import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function ChildrenTree({
  familyTree,
  selectedChild,
  setSelectedChild,
  setUpdatedFamilyTree,
  updatedFamilyTree,
}) {
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const handleButtonClick = (child) => {
    setSelectedButtonId(child.ProductId);
    setSelectedChild(child);

    const updatedFamilyTree = cloneFamilyTree(familyTree);

    setUpdatedFamilyTree(updatedFamilyTree);

    const updateSelectedInTree = (node) => {
      if (node.ProductId === child.ProductId) {
        node.Selected = true;
      } else if (node.ProductChildren && node.ProductChildren.length > 0) {
        node.ProductChildren.forEach(updateSelectedInTree);
      }
    };

    updateSelectedInTree(updatedFamilyTree);
  };

  const cloneFamilyTree = (node) => {
    return JSON.parse(JSON.stringify(node));
  };

  const renderChildButton = (child) => {
    const isSelected = selectedButtonId === child.ProductId;

    if (child.ProductGroupId === 1 && !child.Selected) {
      return (
        <Button
          onClick={() => handleButtonClick(child)}
          style={{
            marginBottom: "10px",
            backgroundColor: isSelected ? "#D23F57" : "transparent",
            color: isSelected ? "white" : "black",
          }}
        >
          {child.Name}
        </Button>
      );
    }
    return null;
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      {familyTree.ProductChildren?.map((child) => (
        <div key={child.ProductId}>
          {renderChildButton(child)}
          {child.ProductChildren && child.ProductChildren.length > 0 && (
            <div style={{ paddingLeft: 10 }}>
              <ChildrenTree
                selectedChild={selectedChild}
                setSelectedChild={setSelectedChild}
                familyTree={child}
                setUpdatedFamilyTree={setUpdatedFamilyTree}
                updatedFamilyTree={updatedFamilyTree}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
