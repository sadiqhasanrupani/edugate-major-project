import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./File.module.scss";

//^ components
import SecondaryCard from "../../../../../UI/Card/CardSecondary";

//^ Icons
import PdfIcon from "../../../../../UI/fileIcons/PdfIcon";
import CsvIcon from "../../../../../UI/fileIcons/CsvIcon";
import DocIcon from "../../../../../UI/fileIcons/DocIcon";
import DocxIcon from "../../../../../UI/fileIcons/DocxIcon";
import XslIcon from "../../../../../UI/fileIcons/XslIcon";
import JpgIcon from "../../../../../UI/fileIcons/JpgIcon";
import PptIcon from "../../../../../UI/fileIcons/PptIcon";
import PngIcon from "../../../../../UI/fileIcons/PngIcon";
import UndefinedFile from "../../../../../UI/fileIcons/UndefinedFile";
import DownloadingIcon from "../../../../../UI/fileIcons/DownloadingIcon";

//^ dark icons
import DarkDownloadingIcon from "../../../../../UI/fileIcons/DarkDownloadingIcon";

//^ utils
import stringShrinker from "../../../../../../utils/string-shrinker";

const File = ({ fileName, filePath, fileOriginalName, enableDownload }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const fileExtension = fileOriginalName.split(".").pop().toLowerCase();

  const fileOriginalNameName = fileOriginalName.split(".")[0];

  let icon = <UndefinedFile />;

  if (fileExtension === "pdf") {
    icon = <PdfIcon />;
  }

  if (fileExtension === "csv") {
    icon = <CsvIcon />;
  }

  if (fileExtension === "doc") {
    icon = <DocIcon />;
  }

  if (fileExtension === "docx") {
    icon = <DocxIcon />;
  }

  if (fileExtension === "xsl" || fileExtension === "xlsx") {
    icon = <XslIcon />;
  }

  if (fileExtension === "ppt" || fileExtension === "pptx") {
    icon = <PptIcon />;
  }

  if (fileExtension === "png") {
    icon = <PngIcon />;
  }

  if (fileExtension === "jpg" || fileExtension === "jpeg") {
    icon = <JpgIcon />;
  }

  const formattedName = stringShrinker(fileOriginalNameName, 13);

  if (!filePath) {
    return (
      <div className={`${styles["file"]} ${themeMode && styles["dark"]}`}>
        <SecondaryCard
          className={`${styles["secondary-card"]} ${styles["secondary-card-1"]}`}
        >
          {icon}
          <p href={`${filePath}`} target="_blank">
            {formattedName}.{fileExtension}
          </p>
        </SecondaryCard>
      </div>
    );
  }

  const fileDownloadHandler = async (e) => {
    const response = await fetch(`${filePath}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileOriginalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${styles["file"]} ${themeMode && styles["dark"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        {icon}
        <a href={`${filePath}`} target="blank">
          {formattedName}.{fileExtension}
        </a>
        <button onClick={fileDownloadHandler}>
          {enableDownload ? (
            themeMode ? (
              <DarkDownloadingIcon />
            ) : (
              <DownloadingIcon />
            )
          ) : undefined}
        </button>
      </SecondaryCard>
    </div>
  );
};

export default File;
