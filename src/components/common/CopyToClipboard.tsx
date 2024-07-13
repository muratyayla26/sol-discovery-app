import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";

const CopyIconButton = ({ textToCopy }: { textToCopy: string | number }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy?.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const tooltipText = copied ? "Copied!" : "Copy to Clipboard";

  return (
    <Tooltip title={tooltipText} placement="top">
      <IconButton onClick={handleClick} size="small">
        {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default CopyIconButton;
