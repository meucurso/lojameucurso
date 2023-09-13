import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function ChildrenTree({
  familyTree,
  selectedChild,
  setSelectedChild,
}) {
  const [isProductGroup1Selected, setIsProductGroup1Selected] =
    useState(false);

  useEffect(() => {
    if (familyTree && familyTree.ProductGroupId === 2) {
      setIsProductGroup1Selected(true);
    }
  }, [familyTree]);

  const handleButtonClick = (child) => {
    setSelectedChild(child);
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      {familyTree?.ProductChildren?.map((child) => (
        <div key={child.ProductId}>
          {!isProductGroup1Selected && child.ProductGroupId !== 3 && (
            <Button
              onClick={() => handleButtonClick(child)}
              disabled={
                child.ProductGroupId === 1 && isProductGroup1Selected
              }
              style={{
                backgroundColor:
                  selectedChild === child ? "#D23F57" : "#e1e1e1e1",
                color: selectedChild === child ? "#ffffff" : "",
                marginBottom: "10px",
              }}
            >
              {child.Name}
            </Button>
          )}
          {child.ProductChildren && child.ProductChildren.length > 0 && (
            <div style={{ paddingLeft: 10 }}>
              <ChildrenTree
                selectedChild={selectedChild}
                setSelectedChild={setSelectedChild}
                familyTree={child}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
