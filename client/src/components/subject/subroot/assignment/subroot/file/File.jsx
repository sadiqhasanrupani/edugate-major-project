import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./File.module.scss";

//^ components
import PrimaryCard from "../../../../../UI/Card/TeacherCard";
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

const File = ({ fileName, filePath, fileOriginalName }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const fileExtension = fileName.split(".").pop().toLowerCase();

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

  const formattedName = stringShrinker(fileOriginalNameName, 13);

  return (
    <div className={`${styles["file"]} ${themeMode && styles["dark"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        {icon}
        <a href={`${filePath}`} target="_blank">
          {formattedName}.{fileExtension}
        </a>
        <button onClick={fileDownloadHandler}>
          {themeMode ? <DarkDownloadingIcon /> : <DownloadingIcon />}
        </button>
      </SecondaryCard>
    </div>
  );
};

export default File;
