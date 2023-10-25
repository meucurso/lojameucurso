import { Button } from "@mui/material";
import { useState } from "react";

interface ReadMoreProps {
  children: string | any;
}

export function ReadMore({ children }: ReadMoreProps) {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const maxLength = 150;
  const shouldShowButton = children.length > maxLength;

  const truncatedText = isReadMore
    ? children.slice(0, maxLength)
    : children;

  return (
    <>
      <div>
        <div
          style={{ display: "grid" }}
          dangerouslySetInnerHTML={{
            __html:
              truncatedText +
              (isReadMore && shouldShowButton ? "..." : ""),
          }}
        />
        {shouldShowButton && (
          <Button onClick={toggleReadMore}>
            {isReadMore ? "ver mais" : "ver menos"}
          </Button>
        )}
      </div>
    </>
  );
}
