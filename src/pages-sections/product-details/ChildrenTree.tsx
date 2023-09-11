import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

export default function ChildrenTree({ familyTree }) {
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    // Verifique se o filho tem ProductGroupId === 3
    const childWithGroup3 = familyTree?.ProductChildren.find(
      (child) => child.ProductGroupId === 3
    );

    // Se existir um filho com ProductGroupId === 3 e um filho com ProductGroupId === 1
    if (childWithGroup3) {
      const hasChildWithGroup1 = childWithGroup3.ProductChildren.some(
        (child) => child.ProductGroupId === 1
      );

      if (hasChildWithGroup1) {
        // Defina o valor inicial como o ProductId do filho com ProductGroupId === 1
        setSelectedChild(
          childWithGroup3.ProductChildren.find(
            (child) => child.ProductGroupId === 1
          ).ProductId.toString()
        );
      }
    }
  }, [familyTree]);

  const handleRadioChange = (event) => {
    setSelectedChild(event.target.value);
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      <RadioGroup
        aria-label="children"
        name="children"
        value={selectedChild}
        onChange={handleRadioChange}
      >
        {familyTree?.ProductChildren?.map((child) => (
          <FormControlLabel
            key={child.ProductId}
            value={child.ProductId.toString()}
            control={<Radio />}
            label={child.Name}
          />
        ))}
      </RadioGroup>

      <div style={{ paddingLeft: 20 }}>
        {selectedChild && (
          <ChildrenTree
            familyTree={familyTree?.ProductChildren.find(
              (child) => child.ProductId.toString() === selectedChild
            )}
          />
        )}
      </div>
    </div>
  );
}
